using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/paqueteria")]
    public class PaqueteriaController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewPaquetes()
        {
            var paquetes = await PaqueteriasData.Read();

            if (paquetes != null)
            {
                return Ok(paquetes);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de paquetes." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewPaqueteById(int idpaqSeguimiento)
        {
            var paquete = await PaqueteriasData.ReadOne(idpaqSeguimiento);

            if (paquete != null)
            {
                return Ok(paquete);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener el paquete." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SavePaquete([FromBody] Paqueterium paquete)
        {
            var confirmation = await PaqueteriasData.Create(paquete);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Paquete guardado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar el paquete." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeletePaquete(int idpaqSeguimiento)
        {
            var confirmation = await PaqueteriasData.Delete(idpaqSeguimiento);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Paquete eliminado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar el paquete." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyPaquete([FromBody] Paqueterium paquete)
        {
            var confirmation = await PaqueteriasData.Update(paquete);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Paquete modificado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar el paquete." });
            }
        }
    }
}
