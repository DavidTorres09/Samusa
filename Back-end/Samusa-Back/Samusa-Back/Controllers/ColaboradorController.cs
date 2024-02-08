using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/colaborador")]
    public class ColaboradorController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewColaboradores()
        {
            var colaboradores = await ColaboradoresData.Read();

            if (colaboradores != null)
            {
                return Ok(colaboradores);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de colaboradores." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewColaboradorById(int dni)
        {
            var colaborador = await ColaboradoresData.ReadOne(dni);

            if (colaborador != null)
            {
                return Ok(colaborador);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener el colaborador." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveColaborador([FromBody] Colaborador colaborador)
        {
            var confirmation = await ColaboradoresData.Create(colaborador);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Colaborador guardado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar el colaborador." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteColaborador(int dni)
        {
            var confirmation = await ColaboradoresData.Delete(dni);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Colaborador eliminado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar el colaborador." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyColaborador([FromBody] Colaborador colaborador)
        {
            var confirmation = await ColaboradoresData.Update(colaborador);
            if (confirmation)
            {
                return Ok(new { Status = 200, Message = "Colaborador modificado con éxito." });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar el colaborador." });
            }
        }
    }
}
