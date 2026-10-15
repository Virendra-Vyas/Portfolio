using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace ContactApi.Tests;

public class ContactEndpointTests
{
    private static object ValidForm(string? website = null) => new
    {
        name = "Ada Lovelace",
        email = "ada@example.com",
        message = "I'd like to talk about a contract role.",
        website,
    };

    [Fact]
    public async Task Health_returns_ok()
    {
        using var factory = new ContactApiFactory();
        var response = await factory.CreateClient().GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Valid_message_is_accepted_and_sent_with_reply_to_set()
    {
        using var factory = new ContactApiFactory();

        var response = await factory.CreateClient().PostAsJsonAsync("/contact", ValidForm());

        Assert.Equal(HttpStatusCode.Accepted, response.StatusCode);
        var sent = Assert.Single(factory.Sender.Sent);
        Assert.Equal("owner@site.test", sent.To);
        Assert.Equal("ada@example.com", sent.ReplyTo);
        Assert.Equal("Portfolio contact from Ada Lovelace", sent.Subject);
        Assert.Contains("I'd like to talk about a contract role.", sent.Text);
    }

    [Fact]
    public async Task Honeypot_is_answered_like_success_but_nothing_is_sent()
    {
        using var factory = new ContactApiFactory();

        var response = await factory.CreateClient().PostAsJsonAsync("/contact", ValidForm(website: "http://spam.test"));

        Assert.Equal(HttpStatusCode.Accepted, response.StatusCode);
        Assert.Empty(factory.Sender.Sent);
    }

    [Theory]
    [InlineData("", "ada@example.com", "A long enough message.", "name")]
    [InlineData("Ada\r\nBcc: victim@example.com", "ada@example.com", "A long enough message.", "name")]
    [InlineData("Ada", "not-an-email", "A long enough message.", "email")]
    [InlineData("Ada", "Ada <ada@example.com>", "A long enough message.", "email")]
    [InlineData("Ada", "ada@example.com\nBcc: x@example.com", "A long enough message.", "email")]
    [InlineData("Ada", "ada@example.com", "too short", "message")]
    public async Task Invalid_fields_return_problem_details_naming_the_field(
        string name, string email, string message, string field)
    {
        using var factory = new ContactApiFactory();

        var response = await factory.CreateClient().PostAsJsonAsync("/contact", new { name, email, message });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);
        using var body = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        Assert.True(body.RootElement.GetProperty("errors").TryGetProperty(field, out _));
        Assert.Empty(factory.Sender.Sent);
    }

    [Fact]
    public async Task Provider_failure_returns_502_with_a_code_the_site_can_act_on()
    {
        using var factory = new ContactApiFactory();
        factory.Sender.Fail = true;

        var response = await factory.CreateClient().PostAsJsonAsync("/contact", ValidForm());

        Assert.Equal(HttpStatusCode.BadGateway, response.StatusCode);
        using var body = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        Assert.Equal("delivery_failed", body.RootElement.GetProperty("code").GetString());
    }

    [Fact]
    public async Task Requests_over_the_per_client_limit_get_429_with_retry_after()
    {
        using var factory = new ContactApiFactory { PermitsPerClient = 2 };
        var client = factory.CreateClient();

        Assert.Equal(HttpStatusCode.Accepted, (await client.PostAsJsonAsync("/contact", ValidForm())).StatusCode);
        Assert.Equal(HttpStatusCode.Accepted, (await client.PostAsJsonAsync("/contact", ValidForm())).StatusCode);
        var third = await client.PostAsJsonAsync("/contact", ValidForm());

        Assert.Equal(HttpStatusCode.TooManyRequests, third.StatusCode);
        Assert.True(third.Headers.Contains("Retry-After"));
        Assert.Equal(2, factory.Sender.Sent.Count);
    }

    [Fact]
    public async Task Global_limit_applies_across_clients()
    {
        using var factory = new ContactApiFactory { PermitsGlobal = 1 };
        var client = factory.CreateClient();

        await client.PostAsJsonAsync("/contact", ValidForm());
        var second = await client.PostAsJsonAsync("/contact", ValidForm());

        Assert.Equal(HttpStatusCode.TooManyRequests, second.StatusCode);
    }

    [Fact]
    public async Task Body_over_16_KB_is_rejected()
    {
        using var factory = new ContactApiFactory();
        var json = JsonSerializer.Serialize(new { name = "Ada", email = "ada@example.com", message = new string('x', 20_000) });

        var response = await factory.CreateClient().PostAsync("/contact", new StringContent(json, Encoding.UTF8, "application/json"));

        Assert.Equal(HttpStatusCode.RequestEntityTooLarge, response.StatusCode);
        Assert.Empty(factory.Sender.Sent);
    }

    [Fact]
    public async Task Preflight_from_the_site_is_allowed()
    {
        using var factory = new ContactApiFactory();
        var request = new HttpRequestMessage(HttpMethod.Options, "/contact");
        request.Headers.Add("Origin", ContactApiFactory.AllowedOrigin);
        request.Headers.Add("Access-Control-Request-Method", "POST");
        request.Headers.Add("Access-Control-Request-Headers", "content-type");

        var response = await factory.CreateClient().SendAsync(request);

        Assert.Equal(ContactApiFactory.AllowedOrigin, response.Headers.GetValues("Access-Control-Allow-Origin").Single());
    }

    [Fact]
    public async Task Health_is_readable_from_the_site_so_it_can_wake_the_service()
    {
        using var factory = new ContactApiFactory();
        var request = new HttpRequestMessage(HttpMethod.Get, "/health");
        request.Headers.Add("Origin", ContactApiFactory.AllowedOrigin);

        var response = await factory.CreateClient().SendAsync(request);

        Assert.Equal(ContactApiFactory.AllowedOrigin, response.Headers.GetValues("Access-Control-Allow-Origin").Single());
    }

    [Fact]
    public async Task Other_origins_get_no_cors_permission()
    {
        using var factory = new ContactApiFactory();
        var request = new HttpRequestMessage(HttpMethod.Post, "/contact") { Content = JsonContent.Create(ValidForm()) };
        request.Headers.Add("Origin", "https://evil.test");

        var response = await factory.CreateClient().SendAsync(request);

        Assert.False(response.Headers.Contains("Access-Control-Allow-Origin"));
    }

    [Fact]
    public async Task Responses_carry_security_headers()
    {
        using var factory = new ContactApiFactory();
        var response = await factory.CreateClient().GetAsync("/health");

        Assert.Equal("nosniff", response.Headers.GetValues("X-Content-Type-Options").Single());
        Assert.Equal("DENY", response.Headers.GetValues("X-Frame-Options").Single());
    }
}
