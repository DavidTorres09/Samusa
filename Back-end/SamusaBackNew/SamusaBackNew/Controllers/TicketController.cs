using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using Dapper;
using Microsoft.Data.SqlClient;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class TicketController(IConfiguration _configuration) : Controller
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarTicket(Ticket ticket)
        {
            TicketRespuesta respuesta = new TicketRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarTicket",
                        new
                        {
                            ticket.Estado,
                            ticket.Prioridad,
                            ticket.Descripcion,
                            ticket.Respuesta,
                            ticket.ClienteId,
                            ticket.ColaboradorId
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Ticket agregado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo agregar el ticket";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar ticket: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerTickets()
        {
        TicketRespuesta respuesta = new TicketRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var tickets = await db.QueryAsync<Ticket>("ObtenerTickets", commandType: System.Data.CommandType.StoredProcedure);

                    if (tickets != null && tickets.Any())
                    {
                        return Ok(tickets);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron tickets";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar tickets: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerTicket(int id)
        {
            TicketRespuesta respuesta = new TicketRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var ticket = await db.QueryFirstOrDefaultAsync<Ticket>("ObtenerTicket",
                        new { id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (ticket != null)
                    {
                        return Ok(ticket);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron ticketes de vehiculo";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar los tickets: " + ex.Message;
                return StatusCode(500, respuesta);
            }


        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarTicket(Ticket ticket)
        {
            TicketRespuesta respuesta = new TicketRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("ModificarTicket",
                        new
                        {
                            ticket.Id,
                            ticket.Estado,
                            ticket.Prioridad,
                            ticket.Descripcion,
                            ticket.Respuesta,
                            ticket.ClienteId,
                            ticket.ColaboradorId
                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Ticket actualizado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo actualizarel ticket";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al actualizar el ticket: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarTicket(int id)
        {
            TicketRespuesta respuesta = new TicketRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("EliminarTicket",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Ticket eliminado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar el ticket";
                        return BadRequest(respuesta);
                    }
                }
            }

            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar el ticket: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

    }
}
