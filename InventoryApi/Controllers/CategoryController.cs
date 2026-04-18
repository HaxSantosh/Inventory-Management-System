using InventoryApi.Data;
using InventoryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoryController(AppDbContext context)
        {
            _context = context;    
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Categories.ToListAsync());
        }
        
        [HttpPost]
        public async Task<IActionResult> Post(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Category updatedCategory)
        {
            var data = await _context.Categories.FindAsync(id);
            if(data == null) return NotFound();
            data.Name = updatedCategory.Name;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var data = await _context.Categories.FindAsync(id);
            if(data == null) return NotFound();
            _context.Categories.Remove(data);
            await _context.SaveChangesAsync();
            return NoContent(); 
        }
        [HttpGet("count")]
        public async Task<IActionResult> Count()
        {
            var count = await _context.Categories.CountAsync();
            return Ok(count);
        }
    }
}