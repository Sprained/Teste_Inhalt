using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Product
    {
        [Key]
        public int id { get; set; }

        [Required(ErrorMessage = "Campo de nome do produto é obrigatorio!")]
        public string name { get; set; }

        public string value { get; set; }

        public int amount { get; set; }

        public string userId { get; set; }

        public User user { get; set; }
    }
}