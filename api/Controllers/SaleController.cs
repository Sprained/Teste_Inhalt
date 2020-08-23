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
    [Route("/sale")]
    public class SaleController : ControllerBase
    {
        [HttpPost]
        [Route("{productId:int}")]
        [Authorize]
        public async Task<ActionResult<dynamic>> Post(
            [FromServices] DataContext context,
            [FromBody] Sale model,
            int productId
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await context.Products.Where(x => x.id == productId).SingleOrDefaultAsync();
            if (product == null)
            {
                return NotFound(new { message = "Produto solicitado não encontrado!" });
            }

            if(product.amount == 0){
                return NotFound(new { message = "Não é possivel vender um produto que não tenha estoque!" });
            }

            product.amount -= model.amount;

            Sale info = new Sale()
            {
                productId = productId,
                amount = model.amount,
                userId = User.Identity.Name
            };

            context.Sales.Add(info);
            await context.SaveChangesAsync();
            return info;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Sale>>> Get([FromServices] DataContext context)
        {
            var sale = await context.Sales.Where(x => x.userId == User.Identity.Name).ToListAsync();
            return sale;
        }
    }
}