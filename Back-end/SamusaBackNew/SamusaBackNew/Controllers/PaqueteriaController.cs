using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using Microsoft.Data.SqlClient;
using Dapper;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class PaqueteriaController(IConfiguration _configuration) : Controller
    {
        [Authorize]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarPaqueteria(Paqueteria paqueteria)
        {
            PaqueteriaRespuesta respuesta = new PaqueteriaRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarPaqueteria",
                        new
                        {
                            paqueteria.ClienteId,
                            paqueteria.NumCasillero,
                            paqueteria.NumTracking,
                            paqueteria.TipoProducto,
                            paqueteria.DirectOrigen,
                            paqueteria.DirectDestino,
                            paqueteria.FechaRegistro,
                            paqueteria.FechaEsperada,
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Paqueteria agregada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo agregar la paqueteria";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar paqueteria: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerPaqueterias()
        {
            PaqueteriaRespuesta respuesta = new PaqueteriaRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var paquetes = await db.QueryAsync<Paqueteria>("ObtenerPaqueterias", commandType: System.Data.CommandType.StoredProcedure);

                    if (paquetes != null && paquetes.Any())
                    {
                        return Ok(paquetes);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron paqueterias";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar paqueterias: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerPaqueteria(int id)
        {
            PaqueteriaRespuesta respuesta = new PaqueteriaRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var paquete = await db.QueryFirstOrDefaultAsync<Paqueteria>("ObtenerPaqueteria",
                        new { id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (paquete != null)
                    {
                        return Ok(paquete);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron paqueterias";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar paqueterias: " + ex.Message;
                return StatusCode(500, respuesta);
            }


        }

        [Authorize]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarPaqueteria(Paqueteria paqueteria)
        {
            PaqueteriaRespuesta respuesta = new PaqueteriaRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("ModificarPaqueteria",
                        new
                        {
                            paqueteria.Id,
                            paqueteria.ClienteId,
                            paqueteria.NumCasillero,
                            paqueteria.NumTracking,
                            paqueteria.TipoProducto,
                            paqueteria.DirectOrigen,
                            paqueteria.DirectDestino,
                            paqueteria.FechaEsperada,
                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Paqueteria actualizada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo actualizar la paqueteria";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al actualizar paqueteria: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarPaqueteria(int id)
        {
            PaqueteriaRespuesta respuesta = new PaqueteriaRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("EliminarPaqueteria",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Paqueteria eliminada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar la paqueteria";
                        return BadRequest(respuesta);
                    }
                }
            }

            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar paqueteria: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }
        
    }
}
