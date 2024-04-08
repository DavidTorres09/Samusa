using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/importacion")]
    public class ImportacionController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewImportaciones()
        {
            var importaciones = await ImportacionesData.Read();

            if (importaciones != null)
            {
                return Ok(importaciones);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de importaciones." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewImportacionById(int idimpSeguimiento)
        {
            var importacion = await ImportacionesData.ReadOne(idimpSeguimiento);

            if (importacion != null)
            {
                return Ok(importacion);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la importación." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveImportacion([FromBody] ImportacionesPersonaREVS importacion)
        {
            var confirmation = await ImportacionesData.Create(importacion);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Importación guardada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar la importación." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteImportacion(int idimpSeguimiento)
        {
            var confirmation = await ImportacionesData.Delete(idimpSeguimiento);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Importación eliminada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar la importación." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyImportacion([FromBody] ImportacionesPersonaREVS importacion)
        {
            var confirmation = await ImportacionesData.Update(importacion);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Importación modificada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar la importación." });
            }
        }
    }
}
