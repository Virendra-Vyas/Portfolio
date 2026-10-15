namespace ContactApi.Email;

/// <summary>Development stand-in used when no email API key is configured. Never registered in production.</summary>
public sealed class LogOnlyEmailSender(ILogger<LogOnlyEmailSender> logger) : IEmailSender
{
    public Task SendAsync(EmailMessage message, CancellationToken cancellationToken)
    {
        logger.LogInformation("Development: would send \"{Subject}\" ({Length} characters)", message.Subject, message.Text.Length);
        return Task.CompletedTask;
    }
}
