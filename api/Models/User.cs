using System.ComponentModel.DataAnnotations;

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
    }
}