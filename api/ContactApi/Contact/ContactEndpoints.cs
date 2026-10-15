using ContactApi.Email;
using Microsoft.Extensions.Options;

namespace ContactApi.Contact;

public static class ContactEndpoints
{
    public const string RateLimitPolicy = "contact";

    public static void MapContact(this IEndpointRouteBuilder app)
    {
        app.MapPost("/contact", SendAsync)
            .RequireRateLimiting(RateLimitPolicy)
            .RequireCors(CorsPolicy)
            .DisableAntiforgery();
    }

    public const string CorsPolicy = "site";

    private static async Task<IResult> SendAsync(
        ContactRequest request,
        IEmailSender sender,
        IOptions<ContactOptions> options,
        ILogger<ContactRequest> logger,
        CancellationToken cancellationToken)
    {
        // Answer bots exactly as people are answered, so the honeypot doesn't reveal itself.
        if (request.IsLikelyBot)
        {
            logger.LogInformation("Contact form: honeypot filled, message dropped");
            return Accepted();
        }

        var errors = request.Validate();
        if (errors.Count > 0)
            return Results.ValidationProblem(errors, title: "Some fields need attention.");

        var (name, email, message) = request.Normalised();
        var settings = options.Value;
        var outgoing = new EmailMessage(
            From: settings.FromEmail,
            To: settings.RecipientEmail,
            ReplyTo: email,
            Subject: $"Portfolio contact from {name}",
            Text: $"From: {name} <{email}>\n\n{message}\n\nSent from the contact form on the portfolio.");

        try
        {
            await sender.SendAsync(outgoing, cancellationToken);
        }
        catch (EmailDeliveryException ex)
        {
            logger.LogError(ex, "Contact form: delivery failed");
            return Results.Problem(
                title: "The message couldn't be delivered.",
                detail: "Please email directly instead.",
                statusCode: StatusCodes.Status502BadGateway,
                extensions: new Dictionary<string, object?> { ["code"] = "delivery_failed" });
        }

        // No personal data in logs: the outcome is enough.
        logger.LogInformation("Contact form: message delivered");
        return Accepted();
    }

    private static IResult Accepted() => Results.Accepted(value: new { status = "sent" });
}
