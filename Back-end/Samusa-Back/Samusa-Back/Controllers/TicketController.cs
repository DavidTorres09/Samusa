using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Models;
using Samusa_Back.Data;

namespace Samusa_Back.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewTickets()
        {
            var tickets = await TicketData.Read();

            if (tickets != null)
                return Ok(tickets);
            else
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de tickets." });
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewTicketsByClient(int clientID)
        {
            var tickets = await TicketData.GetOne(clientID);

            if (tickets != null)
                return Ok(tickets);
            else
                return NotFound(new { Status = 404, Message = "No se encontraron tickets para el cliente especificado." });
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveTicket([FromBody] Ticket ticket)
        {
            var confirmation = await TicketData.Create(ticket);
            if (confirmation)
                return Ok(new { Status = 200 });
            else
                return BadRequest(new { Status = 400, Message = "Error al guardar el ticket." });
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteTicket(int ticketID)
        {
            var confirmation = await TicketData.Delete(ticketID);
            if (confirmation)
                return Ok(new { Status = 200 });
            else
                return BadRequest(new { Status = 400, Message = "Error al eliminar el ticket." });
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyTicket([FromBody] UpdateTicket ticket)
        {
            var confirmation = await TicketData.Update(ticket);
            if (confirmation)
                return Ok(new { Status = 200 });
            else
                return BadRequest(new { Status = 400, Message = "Error al modificar el ticket." });
        }
    }
}
