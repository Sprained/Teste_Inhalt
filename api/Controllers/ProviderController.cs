using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using api.Models;
using api.Data;

namespace api.Controllers
{
    [ApiController]
    [Route("/provider")]
    public class ProviderController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<Provider>> Post(
            [FromServices] DataContext context,
            [FromBody] Provider model
        )
        {
            //Verificação se os dados seguem de acordo com model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Add informações ao banco
            context.provider.Add(model);
            await context.SaveChangesAsync();
            return model;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Provider>>> Get([FromServices] DataContext context){
            //listar todos os fornecedores
            var providers = await context.provider.ToListAsync();
            return providers;
        }
    }
}