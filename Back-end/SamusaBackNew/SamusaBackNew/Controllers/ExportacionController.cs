using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SamusaBackNew.Entities;


namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class ExportacionController(IConfiguration _configuration) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarExportacion(Exportacion exportacion)
        {
            ExportacionRespuesta respuesta = new ExportacionRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarExportacion",
                        new
                        {
                            exportacion.ExpSeguimientoId,
                            exportacion.ClienteId,
                            exportacion.RevVehiculoId,
                            exportacion.RevContenedorId,
                            exportacion.FechaInicio,
                            exportacion.FechaFinalizacion,
                            exportacion.FechaEsperada,
                            exportacion.Prioridad,
                            exportacion.Descripcion
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Exportacion agregada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo agregar la exportacion";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar exportacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerExportaciones()
        {
            ExportacionRespuesta respuesta = new ExportacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var exportaciones = await db.QueryAsync<Exportacion>("ObtenerExportaciones", commandType: System.Data.CommandType.StoredProcedure);

                    if (exportaciones != null && exportaciones.Any())
                    {
                        return Ok(exportaciones);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron exportaciones.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener exportaciones: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerExportacion(int id)
        {
            ExportacionRespuesta respuesta = new ExportacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var exportacion = await db.QueryFirstOrDefaultAsync<Exportacion>("ObtenerExportacion",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (exportacion != null)
                    {
                        return Ok(exportacion);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontró la exportacion.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener exportacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarExportacion(Exportacion exportacion)
        {
            ExportacionRespuesta respuesta = new ExportacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("ModificarExportacion",
                        new
                        {
                            exportacion.Id,
                            exportacion.ExpSeguimientoId,
                            exportacion.ClienteId,
                            exportacion.RevVehiculoId,
                            exportacion.RevContenedorId,
                            exportacion.FechaInicio,
                            exportacion.FechaFinalizacion,
                            exportacion.FechaEsperada,
                            exportacion.Prioridad,
                            exportacion.Descripcion
                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Exportacion modificada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo modificar la exportacion.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al modificar exportacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarExportacion(int id)
        {
            ExportacionRespuesta respuesta = new ExportacionRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("EliminarExportacion",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Exportacion eliminada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar la exportacion.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar exportacion: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }
    }
}
