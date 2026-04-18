using InventoryApi.Data;
using InventoryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController (AppDbContext context): ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> CountAll()
        {
            var productCount = await _context.Products.CountAsync();
            var categoryCount = await _context.Categories.CountAsync();
            return Ok(new
            {
                productCount,
                categoryCount
                
            });
        }
        
    }
}