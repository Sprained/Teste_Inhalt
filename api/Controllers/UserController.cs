using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using api.Data;
using api.Models;

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
            var users = await context.Users.ToListAsync();
            return users;
        }

        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<User>> Post(
            [FromServices] DataContext context,
            [FromBody] User model
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Users.Add(model);
            await context.SaveChangesAsync();
            return model;
        }
    }
}