using System.ComponentModel.DataAnnotations;

namespace ContactApi.Contact;

public sealed class ContactOptions
{
    public const string Section = "Contact";

    /// <summary>Browser origins allowed to post the form, e.g. https://virendravyas.dev.</summary>
    [Required, MinLength(1)]
    public string[] AllowedOrigins { get; init; } = [];

    /// <summary>Where messages are delivered.</summary>
    [Required, EmailAddress]
    public string RecipientEmail { get; init; } = "";

    /// <summary>Sender shown on delivered messages; must be on a domain verified with the email provider.</summary>
    [Required]
    public string FromEmail { get; init; } = "";

    /// <summary>Requests allowed per client IP per window.</summary>
    [Range(1, 1000)]
    public int PermitsPerClient { get; init; } = 5;

    /// <summary>Requests allowed across all clients per window, to protect the email quota.</summary>
    [Range(1, 10000)]
    public int PermitsGlobal { get; init; } = 50;

    [Range(1, 1440)]
    public int WindowMinutes { get; init; } = 60;
}
