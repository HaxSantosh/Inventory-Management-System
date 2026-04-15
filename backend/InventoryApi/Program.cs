using InventoryApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers(); // Register Controllers (required for API endpoints)

var app = builder.Build();


app.MapGet("/", () => Results.Ok(new { status = "API is running", time = DateTime.UtcNow })); // Health Check Endpoint

app.UseHttpsRedirection();
app.MapControllers(); //Map controller routes

app.Run();
