using BlogApplication.Interfaces;
using BlogApplication.Models;
using Firebase.Auth;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "LocalOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        }
));
builder.Services.Configure<FirebaseConfig>(builder.Configuration.GetSection("Firebase"));
//builder.Services.AddScoped<IFirebaseAuthService, FirebaseAuthService>();
//builder.Services.AddSingleton<FirebaseAuthClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("LocalOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
