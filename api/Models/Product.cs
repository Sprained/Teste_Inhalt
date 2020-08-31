using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Product
    {
        [Key]
        public int id { get; set; }

        [Required(ErrorMessage = "Campo de nome do produto é obrigatorio!")]
        public string name { get; set; }

        public float value { get; set; }

        public int amount { get; set; }

        [Required(ErrorMessage = "ID da marca é obrigatorio!")]
        public int brandId { get; set; }

        public Brand brand { get; set; }
    }
}