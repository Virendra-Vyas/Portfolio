namespace ContactApi.Email;

public sealed record EmailMessage(string From, string To, string ReplyTo, string Subject, string Text);

public interface IEmailSender
{
    /// <summary>Sends the message. Throws <see cref="EmailDeliveryException"/> if the provider rejects it.</summary>
    Task SendAsync(EmailMessage message, CancellationToken cancellationToken);
}

public sealed class EmailDeliveryException(string message, Exception? inner = null) : Exception(message, inner);
