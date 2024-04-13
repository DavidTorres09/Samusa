using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;


namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class TicketController(IRepository<Ticket> _repositoryTicket) : Controller
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerTickets()
        {
            return await _repositoryTicket.ObtenerTodos("ObtenerTickets");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerTicket(int id)
        {
            return await _repositoryTicket.ObtenerUno("ObtenerTicket", id);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarTicket(Ticket ticket)
        {
            return await _repositoryTicket.Insertar("AgregarTicket", ticket);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarTicket(Ticket ticket)
        {
            return await _repositoryTicket.Actualizar("ModificarTicket", ticket);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarTicket(int id)
        {
            return await _repositoryTicket.Eliminar("EliminarTicket", id);
        }
    }
}
