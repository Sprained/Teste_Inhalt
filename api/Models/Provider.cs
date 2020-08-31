using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Provider
    {
        [Key]
        public int id { get; set; }

        [Required(ErrorMessage = "Campo de nome do fornecedor é obrigatorio!")]
        public string name { get; set; }

        [Required(ErrorMessage = "Campo de telefone do fornecedor é obrigatorio!")]
        public long phone { get; set; }

        [Required(ErrorMessage = "Campo de email do fornecedor é obrigatorio!")]
        [EmailAddress(ErrorMessage = "Email informado com error")]
        public string email { get; set; }
    }
}