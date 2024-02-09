using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/soporte")]
    public class SoporteController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewSoportes()
        {
            var soportes = await SoportesData.Read();

            if (soportes != null)
            {
                return Ok(soportes);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de soportes." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewSoporteById(int idformulario)
        {
            var soporte = await SoportesData.ReadOne(idformulario);

            if (soporte != null)
            {
                return Ok(soporte);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener el soporte." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveSoporte([FromBody] Soporte soporte)
        {
            var confirmation = await SoportesData.Create(soporte);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Soporte guardado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar el soporte." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteSoporte(int idformulario)
        {
            var confirmation = await SoportesData.Delete(idformulario);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Soporte eliminado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar el soporte." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifySoporte([FromBody] Soporte soporte)
        {
            var confirmation = await SoportesData.Update(soporte);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Soporte modificado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar el soporte." });
            }
        }
    }
}
