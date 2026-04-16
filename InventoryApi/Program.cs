using InventoryApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


// builder.Services.AddControllers(); // Register Controllers (required for API endpoints)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
var app = builder.Build();

app.UseCors(policy =>
    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    
app.MapGet("/", () => Results.Ok(new { status = "API is running", time = DateTime.UtcNow })); // Health Check Endpoint
app.UseStaticFiles();
app.UseHttpsRedirection();
app.MapControllers(); //Map controller routes

app.Run();
