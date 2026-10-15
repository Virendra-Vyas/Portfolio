using System.Net;
using System.Threading.RateLimiting;
using ContactApi.Contact;
using ContactApi.Email;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Render tells the app which port to listen on.
if (Environment.GetEnvironmentVariable("PORT") is { Length: > 0 } port)
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Requests arrive through the host's proxy; take the client IP from the last hop it appended.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.ForwardLimit = 1;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

builder.Services
    .AddOptions<ContactOptions>()
    .Bind(builder.Configuration.GetSection(ContactOptions.Section))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddProblemDetails();

// Nothing larger than this is a contact message. Kestrel enforces it for streamed bodies;
// the middleware below rejects a declared oversize body before anything reads it.
const long MaxBodyBytes = 16 * 1024;
builder.WebHost.ConfigureKestrel(kestrel => kestrel.Limits.MaxRequestBodySize = MaxBodyBytes);

// Only the site's own origins may post; the list comes from validated configuration.
builder.Services.AddCors();
builder.Services.AddOptions<CorsOptions>()
    .Configure<IOptions<ContactOptions>>((cors, contact) =>
        cors.AddPolicy(ContactEndpoints.CorsPolicy, policy => policy
            .WithOrigins(contact.Value.AllowedOrigins)
            .WithMethods("GET", "POST")
            .WithHeaders("Content-Type")
            .SetPreflightMaxAge(TimeSpan.FromHours(1))));

builder.Services.AddRateLimiter(limiter =>
{
    limiter.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    limiter.OnRejected = async (context, cancellationToken) =>
    {
        var window = context.HttpContext.RequestServices.GetRequiredService<IOptions<ContactOptions>>().Value.WindowMinutes;
        context.HttpContext.Response.Headers.RetryAfter = (window * 60).ToString();
        await Results.Problem(
                title: "Too many messages.",
                detail: "Please try again later, or email directly.",
                statusCode: StatusCodes.Status429TooManyRequests,
                extensions: new Dictionary<string, object?> { ["code"] = "rate_limited" })
            .ExecuteAsync(context.HttpContext);
    };

    // Two limits in sequence: one per client IP, and one across everyone to protect the email quota.
    limiter.AddPolicy(ContactEndpoints.RateLimitPolicy, context =>
    {
        var options = context.RequestServices.GetRequiredService<IOptions<ContactOptions>>().Value;
        var client = context.Connection.RemoteIpAddress ?? IPAddress.None;
        return RateLimitPartition.GetFixedWindowLimiter(client.ToString(), _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = options.PermitsPerClient,
            Window = TimeSpan.FromMinutes(options.WindowMinutes),
            QueueLimit = 0,
        });
    });
    limiter.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
    {
        if (!HttpMethods.IsPost(context.Request.Method))
            return RateLimitPartition.GetNoLimiter("reads");
        var options = context.RequestServices.GetRequiredService<IOptions<ContactOptions>>().Value;
        return RateLimitPartition.GetFixedWindowLimiter("all-posts", _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = options.PermitsGlobal,
            Window = TimeSpan.FromMinutes(options.WindowMinutes),
            QueueLimit = 0,
        });
    });
});

// Real delivery needs an API key. Without one, development logs instead and production refuses to start.
var resendKey = builder.Configuration["Resend:ApiKey"];
if (!string.IsNullOrWhiteSpace(resendKey))
{
    builder.Services.AddHttpClient<IEmailSender, ResendEmailSender>(http =>
    {
        http.BaseAddress = new Uri("https://api.resend.com/");
        http.DefaultRequestHeaders.Authorization = new("Bearer", resendKey);
        http.Timeout = TimeSpan.FromSeconds(10);
    });
}
else if (builder.Environment.IsDevelopment() || builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddSingleton<IEmailSender, LogOnlyEmailSender>();
}
else
{
    throw new InvalidOperationException("Resend:ApiKey must be set outside Development.");
}

var app = builder.Build();

app.UseForwardedHeaders();
app.UseExceptionHandler();
app.UseStatusCodePages();

app.Use(async (context, next) =>
{
    var headers = context.Response.Headers;
    headers.XContentTypeOptions = "nosniff";
    headers["Referrer-Policy"] = "no-referrer";
    headers.XFrameOptions = "DENY";
    headers.ContentSecurityPolicy = "default-src 'none'; frame-ancestors 'none'";
    await next();
});

app.Use(async (context, next) =>
{
    if (context.Request.ContentLength > MaxBodyBytes)
    {
        await Results.Problem(title: "Message too large.", statusCode: StatusCodes.Status413PayloadTooLarge)
            .ExecuteAsync(context);
        return;
    }
    await next();
});

app.UseCors();
app.UseRateLimiter();

// The site calls this on page load to wake the service, so it needs the same CORS policy.
app.MapGet("/health", () => Results.Ok(new { status = "ok" })).RequireCors(ContactEndpoints.CorsPolicy);
app.MapContact();

app.Run();

// Exposes the entry point to WebApplicationFactory in the test project.
public partial class Program;
