using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/formularioAtencion")]
    public class FormularioAtencionController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewFormulariosAtencion()
        {
            var formulariosAtencion = await FormularioAtencionesData.Read();

            if (formulariosAtencion != null)
            {
                return Ok(formulariosAtencion);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de formularios de atención." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewFormularioAtencionById(int idformularioAtencion)
        {
            var formulario = await FormularioAtencionesData.ReadOne(idformularioAtencion);

            if (formulario != null)
            {
                return Ok(formulario);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener el formulario de atención." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveFormularioAtencion([FromBody] FormularioAtencion formulario)
        {
            var confirmation = await FormularioAtencionesData.Create(formulario);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Formulario de atención guardado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar el formulario de atención." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteFormularioAtencion(int idformularioAtencion)
        {
            var confirmation = await FormularioAtencionesData.Delete(idformularioAtencion);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Formulario de atención eliminado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar el formulario de atención." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyFormularioAtencion([FromBody] FormularioAtencion formulario)
        {
            var confirmation = await FormularioAtencionesData.Update(formulario);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Formulario de atención modificado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar el formulario de atención." });
            }
        }
    }
}
