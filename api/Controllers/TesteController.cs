using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using api.Data;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("/teste")]
    public class TesteController : ControllerBase
    {
        //rota para preenchimento de dados de teste no banco de dados em memoria
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<dynamic>> Get(
            [FromServices] DataContext context
            )
        {
            User user = new User()
            {
                name = "Teste",
                password = "teste@123"
            };
            context.Users.Add(user);

            Product info = new Product()
            {
                name = "teste",
                value = "66,44",
                amount = 77,
                userId = "1"
            };
            context.Products.Add(info);

            await context.SaveChangesAsync();
            return new
            {
                user,
                info
            };
        }
    }
}