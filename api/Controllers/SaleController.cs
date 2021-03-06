using System.Text;
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
        // [Authorize]
        public async Task<ActionResult<dynamic>> Get([FromServices] DataContext context)
        {
            //Listar todas as compras feitas
            var sale = await context.sale.ToListAsync();

            //Tratando dados para arqiovo csv
            StringBuilder sb = new StringBuilder();
            sb.Append("Id da Venda,Id do Produto,Valor do produto,Quantidade de produto\r\n");
            float i = 0;
            foreach(Sale s in sale){
                var product = await context.product.Where(x => x.id == s.productId).SingleOrDefaultAsync();
                
                i += (s.amount * product.value);

                sb.Append(
                    s.id + "," + 
                    s.productId + "," + 
                    product.value + "," +
                    s.amount + "\r\n"
                    );
            }
            sb.Append("Valor total: " + i);
            
            return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", "vendas.csv");
        }
    }
}