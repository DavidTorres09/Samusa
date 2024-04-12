using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SamusaBackNew.Entities;


namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/cotizacion")]
    public class CotizacionController(IConfiguration _configuration) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarCotizacion(Cotizacion cotizacion)
        {
            CotizacionRespuesta respuesta = new CotizacionRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarCotizacion",
                        new
                        {
                            cotizacion.ColaboradorId,
                            cotizacion.DniCliente,
                            cotizacion.TipoProducto,
                            cotizacion.Producto,
                            cotizacion.PorcentajeIMP,
                            cotizacion.EnlaceRef,
                            cotizacion.FechaCreacion,
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Cotizacion agregada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo agregar la cotizacion";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar cotizacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerCotizaciones()
        {
            CotizacionRespuesta respuesta = new CotizacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var cotizaciones = await db.QueryAsync<Exportacion>("Obtenercotizaciones", commandType: System.Data.CommandType.StoredProcedure);

                    if (cotizaciones != null && cotizaciones.Any())
                    {
                        return Ok(cotizaciones);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron cotizaciones.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener cotizaciones: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerCotizacion(int id)
        {
            CotizacionRespuesta respuesta = new CotizacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var cotizacion = await db.QueryFirstOrDefaultAsync<Exportacion>("ObtenerCotizacion",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (cotizacion != null)
                    {
                        return Ok(cotizacion);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontró la cotizacion.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener cotizacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarCotizacion(Cotizacion cotizacion)
        {
            CotizacionRespuesta respuesta = new CotizacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("ModificarCotizacion",
                        new
                        {
                            cotizacion.Id,
                            cotizacion.ColaboradorId,
                            cotizacion.DniCliente,
                            cotizacion.TipoProducto,
                            cotizacion.Producto,
                            cotizacion.PorcentajeIMP,
                            cotizacion.EnlaceRef,
                            cotizacion.FechaCreacion,

                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Cotizacion modificada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo modificar la cotizacion.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al modificar cotizacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarCotizacion(int id)
        {
            CotizacionRespuesta respuesta = new CotizacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("EliminarCotizacion",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Cotizacion eliminada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar la cotizacion.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar cotizacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }
    }
}
