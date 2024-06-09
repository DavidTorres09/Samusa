using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class AlarmaController(IConfiguration _configuration) : Controller
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarAlarma(Alarma alarma)
        {
            AlarmaRespuesta respuesta = new AlarmaRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarAlarma",
                        new
                        {
                            alarma.Descripcion
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Alarma agregada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo agregar su alarma";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar alarma: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerAlarmas()
        {
            AlarmaRespuesta respuesta = new AlarmaRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var alarmas = await db.QueryAsync<Alarma>("ObtenerAlarmas", commandType: System.Data.CommandType.StoredProcedure);

                    if (alarmas != null && alarmas.Any())
                    {
                        return Ok(alarmas);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron alarmas.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener alarmas: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarAlarma(int id)
        {
            AlarmaRespuesta respuesta = new AlarmaRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("EliminarAlarma",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Alarma eliminada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar el alarma.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar alarma: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }
    }
}
