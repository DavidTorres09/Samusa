using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/exportacion")]
    public class ExportacionController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewExportaciones()
        {
            var exportaciones = await ExportacionesData.Read();

            if (exportaciones != null)
            {
                return Ok(exportaciones);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de exportaciones." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewExportacionById(int idexpSeguimiento)
        {
            var exportacion = await ExportacionesData.ReadOne(idexpSeguimiento);

            if (exportacion != null)
            {
                return Ok(exportacion);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la exportación." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveExportacion([FromBody] Exportacione exportacion)
        {
            var confirmation = await ExportacionesData.Create(exportacion);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar la exportación." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteExportacion(int idexpSeguimiento)
        {
            var confirmation = await ExportacionesData.Delete(idexpSeguimiento);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar la exportación." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyExportacion([FromBody] Exportacione exportacion)
        {
            var confirmation = await ExportacionesData.Update(exportacion);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar la exportación." });
            }
        }
    }
}
