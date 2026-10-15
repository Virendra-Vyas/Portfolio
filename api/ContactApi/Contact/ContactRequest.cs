using System.Net.Mail;

namespace ContactApi.Contact;

/// <summary>The contact form as posted by the browser. Nothing here is trusted until <see cref="Validate"/> passes.</summary>
public sealed record ContactRequest(string? Name, string? Email, string? Message, string? Website)
{
    public const int NameMax = 100;
    public const int EmailMax = 254;
    public const int MessageMin = 10;
    public const int MessageMax = 5000;

    /// <summary>
    /// The honeypot. The field is hidden from people, so anything in it came from a bot.
    /// </summary>
    public bool IsLikelyBot => !string.IsNullOrEmpty(Website);

    /// <summary>Returns field errors keyed by camelCase field name; empty when valid.</summary>
    public Dictionary<string, string[]> Validate()
    {
        var errors = new Dictionary<string, string[]>();
        var name = Name?.Trim() ?? "";
        var email = Email?.Trim() ?? "";
        var message = Message?.Trim() ?? "";

        if (name.Length == 0)
            errors["name"] = ["Enter your name."];
        else if (name.Length > NameMax)
            errors["name"] = [$"Keep your name to {NameMax} characters or fewer."];
        else if (HasLineBreakOrControl(name))
            errors["name"] = ["Your name can't contain line breaks or control characters."];

        if (email.Length == 0)
            errors["email"] = ["Enter your email address so I can reply."];
        else if (email.Length > EmailMax || HasLineBreakOrControl(email) || !IsEmailAddress(email))
            errors["email"] = ["Enter a valid email address, like name@example.com."];

        if (message.Length < MessageMin)
            errors["message"] = [$"Write a message of at least {MessageMin} characters."];
        else if (message.Length > MessageMax)
            errors["message"] = [$"Keep your message to {MessageMax} characters or fewer."];

        return errors;
    }

    /// <summary>Trimmed values, for use only after <see cref="Validate"/> returned no errors.</summary>
    public (string Name, string Email, string Message) Normalised() =>
        (Name!.Trim(), Email!.Trim(), Message!.Trim().Replace("\r\n", "\n"));

    // Line breaks in a name or address could be used to inject email headers.
    private static bool HasLineBreakOrControl(string value) => value.Any(char.IsControl);

    private static bool IsEmailAddress(string value)
    {
        if (!MailAddress.TryCreate(value, out var parsed)) return false;
        // Reject display-name forms such as "Bob <bob@example.com>": the field must be the bare address.
        return parsed.Address == value && parsed.Host.Contains('.');
    }
}
