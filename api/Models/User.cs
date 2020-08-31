using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }

        [Required(ErrorMessage = "Campo de nome é obrigatorio!")]
        public string name { get; set; }

        [Required(ErrorMessage = "Campo de senha é obrigatorio!")]
        public string password { get; set; }

        [Compare("password", ErrorMessage = "Campos de senhas diferentes")]
        [NotMapped]
        public string confirm_password { get; set; }
    }
}