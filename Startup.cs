using BlogApplication.Interfaces;

public class Startup(IConfiguration configuration)
{
    public IConfiguration Configuration { get; } = configuration;

    public void ConfigureServices(IServiceCollection services)
    {
        Console.WriteLine("Configuring services...");
        services.Configure<FirebaseConfig>(Configuration.GetSection("Firebase"));
    }

    public void Configure(IApplicationBuilder app)
    {
        // Middleware configuration...
    }
}