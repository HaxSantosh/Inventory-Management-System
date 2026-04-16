using InventoryApi.Data;
using InventoryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var data = await _context.Products
                .Include(p => p.Category)
                .ToListAsync(); // ✅ FIRST get data from DB

            foreach (var p in data)
            {
                if (p.Images != null && p.Images.Any())
                {
                    p.Images = p.Images.Select(img => $"{baseUrl}{img}").ToList();
                }
            }
            return Ok(data);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var data =  await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
            return data == null ? NotFound() : Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> Post(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new {id = product.Id}, product);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Product updatedProduct)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            product.Name = updatedProduct.Name;
            product.Quantity = updatedProduct.Quantity;
            product.Price = updatedProduct.Price;
            product.Images = updatedProduct.Images;
            product.CategoryId = updatedProduct.CategoryId;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
    }
}