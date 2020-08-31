using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using api.Data;
using api.Models;
using BC = BCrypt.Net.BCrypt;
using System.Linq;

namespace api.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<User>>> Get([FromServices] DataContext context)
        {
            var users = await context.user.ToListAsync();
            return users;
        }

        [HttpPost]
        [Route("")]
        // [Authorize]
        public async Task<ActionResult<User>> Post(
            [FromServices] DataContext context,
            [FromBody] User model
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = new User()
            {
                name = model.name,
                password = BC.HashPassword(model.password)
            };

            context.user.Add(user);
            await context.SaveChangesAsync();
            return model;
        }

        [HttpPut]
        [Route("{userId:int}")]
        [Authorize]
        public async Task<ActionResult<dynamic>> Put(
            [FromServices] DataContext context,
            [FromBody] User model,
            int userId
        )
        {
            //Verificar se dados seguem model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await context.user.Where(x => x.id == userId).SingleOrDefaultAsync();

            //verificar se usuario realmente existe
            if (user == null)
            {
                return BadRequest(new { messsage = "Usuario não cadastrado!" });
            }

            //atualizar dados do usuario
            user.name = model.name;
            user.password = BC.HashPassword(model.password);

            await context.SaveChangesAsync();
            return model;
        }
    }
}