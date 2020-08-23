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
    [Route("/product")]
    public class ProductController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<Product>> Post(
            [FromServices] DataContext context,
            [FromBody] Product model
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product info = new Product()
            {
                name = model.name,
                value = model.value,
                amount = model.amount,
                userId = User.Identity.Name
            };
            context.Products.Add(info);
            await context.SaveChangesAsync();
            return info;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Product>>> Get([FromServices] DataContext context)
        {
            var products = await context.Products.Where(x => x.userId == User.Identity.Name).ToListAsync();
            return products;
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public async Task<ActionResult<List<Product>>> Item([FromServices] DataContext context, int id)
        {
            var product = await context.Products.Where(x => x.userId == User.Identity.Name).Where(x => x.id == id).ToListAsync();
            return product;
        }
    }
}