using System.ComponentModel.DataAnnotations;

namespace InventoryApi.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Category name is required")]
        [MaxLength(200)]
        public string Name { get; set; } = "";

        public List<Product> Products { get; set; } = new();
    }
}