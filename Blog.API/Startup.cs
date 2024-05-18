using BlogApplication.Interfaces;
using BlogApplication.Models;
using Firebase.Auth;

public class Startup(IConfiguration configuration)
{
    public IConfiguration Configuration { get; } = configuration;

    public void ConfigureServices(IServiceCollection services)
    {
        Console.WriteLine("Configuring services...");
        services.Configure<FirebaseConfig>(Configuration.GetSection("Firebase"));
        services.AddScoped<IFirebaseAuthService, FirebaseAuthService>();
    }

    public void Configure(IApplicationBuilder app)
    {
        // Middleware configuration...
    }
}