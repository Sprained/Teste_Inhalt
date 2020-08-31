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
            //Verificação se os dados seguem o modelo
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Add informações no banco de dados
            context.product.Add(model);
            await context.SaveChangesAsync();
            return model;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Product>>> Get([FromServices] DataContext context)
        {
            //listar todos os produtos
            var products = await context.product.ToListAsync();
            return products;
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public async Task<ActionResult<List<Product>>> Item([FromServices] DataContext context, int id)
        {
            //Listar um unico produto pelo id
            var product = await context.product.Where(x => x.id == id).ToListAsync();
            return product;
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<ActionResult<dynamic>> Put(
            [FromServices] DataContext context,
            [FromBody] Product model,
            int id
        )
        {
            //Verificar se dados seguem model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await context.product.Where(x => x.id == id).SingleOrDefaultAsync();

            //verificar se produto ta cadastrado
            if (product == null)
            {
                return BadRequest(new { messsage = "Produto não cadastrado!" });
            }

            //atualizar dados do produto
            product.name = model.name;
            product.value = model.value;
            product.amount = model.amount;

            await context.SaveChangesAsync();
            return model;
        }
    }
}