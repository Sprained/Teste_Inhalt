using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Brand
    {
        [Key]
        public int id { get; set; }

        [Required(ErrorMessage = "Campo de nome da marca é obrigatorio!")]
        public string name { get; set; }

        [Required(ErrorMessage = "ID do fornecedor é obrigatorio!")]
        public int providerId { get; set; }

        public Provider provider { get; set; }
    }
}