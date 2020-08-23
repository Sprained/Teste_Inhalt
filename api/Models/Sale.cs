using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Sale
    {
        [Key]
        public int id { get; set; }

        public int productId { get; set; }

        public Product product { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantidade de produtos deve ser maior que zero!")]
        public int amount { get; set; }

        public string userId { get; set; }

        public User user { get; set; }
    }
}