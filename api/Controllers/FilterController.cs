using System.Linq;
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
    [Route("/filter")]
    public class FilterController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Product>>> GetFilter(
            [FromServices] DataContext context,
            [FromBody] Product model
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var products = await context.Products.Where(x => x.userId == User.Identity.Name && x.name.Contains(model.name)).ToListAsync();
            return products;
        }
    }
}