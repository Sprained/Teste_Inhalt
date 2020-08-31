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
    [Route("/brand")]
    public class BrandController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<Brand>> Post(
            [FromServices] DataContext context,
            [FromBody] Brand model
        )
        {
            //Verifiação se os dados seguem o model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Add informações ao banco
            context.brand.Add(model);
            await context.SaveChangesAsync();
            return model;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<ActionResult<List<Brand>>> Get([FromServices] DataContext context)
        {
            //lista todas as marcas
            var brands = await context.brand.ToListAsync();
            return brands;
        }
    }
}