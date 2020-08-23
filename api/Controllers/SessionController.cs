using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using api.Data;
using api.Models;
using api.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("/session")]
    public class SessionController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Session(
            [FromServices] DataContext context,
            [FromBody] User model
            )
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.name == model.name);

            if (user == null)
            {
                return NotFound(new { message = "Usuário ou senha invalidos!" });
            }

            if (model.password != user.password)
            {
                return new { message = "Usuário ou senha invalidos!" };
            }

            var token = Token.GenerateToken(user);
            return new
            {
                user = user,
                token = token
            };
        }
    }
}