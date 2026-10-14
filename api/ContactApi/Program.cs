var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// The contact endpoint arrives in build step 8. Until then the API only reports that it is up.
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();

// Exposes the entry point to WebApplicationFactory in the test project.
public partial class Program;
