using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/revisionAlmacen")]
    public class RevisionAlmacenController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewRevisionesAlmacen()
        {
            var revisiones = RevisionAlmacenesData.Read();

            if (revisiones != null)
            {
                return Ok(revisiones);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de revisiones de almacen." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewRevisionAlmacenById(int idformAlmacen)
        {
            var revision = RevisionAlmacenesData.ReadOne(idformAlmacen);

            if (revision != null)
            {
                return Ok(revision);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la revisión de almacen." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveRevisionAlmacen([FromBody] RevisionAlmacen revision)
        {
            var confirmation = await RevisionAlmacenesData.Create(revision);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Revisión de almacen guardada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar la revisión de almacen." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteRevisionAlmacen(int idformAlmacen)
        {
            var confirmation = RevisionAlmacenesData.Delete(idformAlmacen);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Revisión de almacen eliminada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar la revisión de almacen." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyRevisionAlmacen([FromBody] RevisionAlmacen revision)
        {
            var confirmation = await RevisionAlmacenesData.Update(revision);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Revisión de almacen modificada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar la revisión de almacen." });
            }
        }
    }
}
