using ContactApi.Email;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ContactApi.Tests;

/// <summary>Runs the real app with a recording email sender and small, predictable rate limits.</summary>
public sealed class ContactApiFactory : WebApplicationFactory<Program>
{
    public const string AllowedOrigin = "https://site.test";

    public RecordingEmailSender Sender { get; } = new();
    public int PermitsPerClient { get; init; } = 100;
    public int PermitsGlobal { get; init; } = 1000;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("Contact:AllowedOrigins:0", AllowedOrigin);
        builder.UseSetting("Contact:RecipientEmail", "owner@site.test");
        builder.UseSetting("Contact:FromEmail", "Form <form@site.test>");
        builder.UseSetting("Contact:PermitsPerClient", PermitsPerClient.ToString());
        builder.UseSetting("Contact:PermitsGlobal", PermitsGlobal.ToString());
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<IEmailSender>();
            services.AddSingleton<IEmailSender>(Sender);
        });
    }
}

public sealed class RecordingEmailSender : IEmailSender
{
    private readonly List<EmailMessage> _sent = [];
    public IReadOnlyList<EmailMessage> Sent => _sent;
    public bool Fail { get; set; }

    public Task SendAsync(EmailMessage message, CancellationToken cancellationToken)
    {
        if (Fail) throw new EmailDeliveryException("Simulated provider failure.");
        _sent.Add(message);
        return Task.CompletedTask;
    }
}
