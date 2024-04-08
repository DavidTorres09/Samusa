using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;


namespace Samusa_Back.Controllers
{

    [ApiController]
    [Route("api/samusa/revisionContenedor")]
    public class RevisionContenedorController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewRevisionesCont()
        {
            var revisionesC = await RevisionContenedorData.Read();

            if (revisionesC != null)
            {
                return Ok(revisionesC);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de revisiones del contenedor" });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewRevisionContById(int IdrevCont)
        {
            var revisionC = await RevisionContenedorData.ReadOne(IdrevCont);

            if (revisionC != null)
            {
                return Ok(revisionC);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la revisión del contenedor." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveRevisionCont([FromBody] RevisionContenedor revisionC)
        {
            var confirmation = await RevisionContenedorData.Create(revisionC);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Revisión del contenedor guardada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar la revisión del contenedor." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteRevisionCont(int IdrevCont)
        {
            var confirmation = await RevisionContenedorData.Delete(IdrevCont);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Revisión del contenedor eliminada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar la revisión del contenedor." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyRevisionAlmacen([FromBody] RevisionContenedor revisionC)
        {
            var confirmation = await RevisionContenedorData.Update(revisionC);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Revisión del contenedor modificada con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar la revisión del contenedor." });
            }
        }
    }
}
