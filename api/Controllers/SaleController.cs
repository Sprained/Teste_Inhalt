using System;
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
            //Verificação dos dados estão de acordo com o model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await context.product.Where(x => x.id == productId).SingleOrDefaultAsync();

            //verificar se produto existe no banco de dados
            if (product == null)
            {
                return NotFound(new { message = "Produto solicitado não encontrado!" });
            }

            //Não permitir fazer vendo se amount for igual a zero
            if (product.amount == 0)
            {
                return NotFound(new { message = "Não é possivel vender um produto que não tenha estoque!" });
            }

            //atualizar quantidade de amount do produto
            product.amount -= model.amount;

            Sale info = new Sale()
            {
                productId = productId,
                amount = model.amount,
                userId = Int32.Parse(User.Identity.Name)
            };

            context.sale.Add(info);
            await context.SaveChangesAsync();
            return info;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Sale>>> Get([FromServices] DataContext context)
        {
            //Listar todas as compras feitas
            var sale = await context.sale.ToListAsync();
            return sale;
        }
    }
}