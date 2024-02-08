using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;
using System.Data.SqlTypes;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/cliente")]
    public class ClienteController : ControllerBase
    {

        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewClientes()
        {
            var clientes = await ClienteData.Read();

            if (clientes != null)
            {
                return Ok( clientes );
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de clientes." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> viewClienteById(int dni)
        {
            var cliente =  await ClienteData.ReadOne(dni);

            if (cliente != null)
            {
                return Ok(cliente);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener el cliente." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> saveCliente([FromBody]ClientePersona persona)
        {
        
            var confirmation =  await ClienteData.Create(persona);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar el cliente." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> deleteCliente(int dni)
        {
            var confirmation =  await ClienteData.Delete(dni);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al borrar el cliente." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> modifyCliente([FromBody]ClientePersona cliente)
        {

            var confirmation = await ClienteData.Update(cliente);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar el cliente." });
            }
        }
    }
}
