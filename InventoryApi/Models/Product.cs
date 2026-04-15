using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace InventoryApi.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product name is required")]
        [MaxLength(100)]
        public string Name { get; set; } = "";

        [Required]
        [Range(0, 10000, ErrorMessage = "Quantity must be between 0 and 10000")]
        public int Quantity { get; set; }

        [Required]
        [Range(1, 1000000, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

         public string ImagesJson { get; set; } = "[]";

        // Not mapped (helper property)
        [NotMapped]
        public List<string> Images
        {
            get => string.IsNullOrEmpty(ImagesJson) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(ImagesJson)!;
            set => ImagesJson = JsonSerializer.Serialize(value);
        }

        [Required(ErrorMessage = "Category is required")]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}