using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using api.Data;
using api.Models;
using BC = BCrypt.Net.BCrypt;

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

            User user = new User(){
                name = model.name,
                password = BC.HashPassword(model.password)
            };

            context.user.Add(user);
            await context.SaveChangesAsync();
            return model;
        }
    }
}