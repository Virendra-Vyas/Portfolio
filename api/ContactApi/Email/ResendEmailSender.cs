using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace ContactApi.Email;

/// <summary>Sends through Resend's HTTP API (https://resend.com/docs/api-reference/emails/send-email).</summary>
public sealed class ResendEmailSender(HttpClient http, ILogger<ResendEmailSender> logger) : IEmailSender
{
    public async Task SendAsync(EmailMessage message, CancellationToken cancellationToken)
    {
        var payload = new ResendEmail(message.From, [message.To], message.ReplyTo, message.Subject, message.Text);

        HttpResponseMessage response;
        try
        {
            response = await http.PostAsJsonAsync("emails", payload, cancellationToken);
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
        {
            throw new EmailDeliveryException("Email provider unreachable.", ex);
        }

        if (!response.IsSuccessStatusCode)
        {
            // The provider's body can echo request content, so log the status only.
            logger.LogWarning("Email provider returned {StatusCode}", (int)response.StatusCode);
            throw new EmailDeliveryException($"Email provider returned {(int)response.StatusCode}.");
        }
    }

    private sealed record ResendEmail(
        [property: JsonPropertyName("from")] string From,
        [property: JsonPropertyName("to")] string[] To,
        [property: JsonPropertyName("reply_to")] string ReplyTo,
        [property: JsonPropertyName("subject")] string Subject,
        [property: JsonPropertyName("text")] string Text);
}
