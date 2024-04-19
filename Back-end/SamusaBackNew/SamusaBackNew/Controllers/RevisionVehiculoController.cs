using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;
using Dapper;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class RevisionVehiculoController(IConfiguration _configuration) : Controller
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarRevisionVehiculo(RevisionVehiculo revisionVehiculo)
        {
            RevisionVehiculoRespuesta respuesta = new RevisionVehiculoRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarRevisionVehiculo",
                        new
                        {
                            revisionVehiculo.VIN,
                            revisionVehiculo.Marca,
                            revisionVehiculo.Modelo,
                            revisionVehiculo.Extras,
                            revisionVehiculo.Color,
                            revisionVehiculo.CostoVehiculo,
                            revisionVehiculo.AnnoVehiculo,
                            revisionVehiculo.DniDuenno,
                            revisionVehiculo.Placa,
                            revisionVehiculo.EstadoOP
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Revision de Vehiculo agregada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo agregar la Revision de vehiculo";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar la revision de vehiculo: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerRevisionVehiculos()
        {
            RevisionVehiculoRespuesta respuesta = new RevisionVehiculoRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var revisiones = await db.QueryAsync<RevisionVehiculo>("ObtenerRevisionVehiculos", commandType: System.Data.CommandType.StoredProcedure);

                    if (revisiones != null && revisiones.Any())
                    {
                        return Ok(revisiones);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron revisiones de vehiculo";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar revisiones de vehiculo: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerRevisionVehiculo(int id)
        {
            RevisionVehiculoRespuesta respuesta = new RevisionVehiculoRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var revision = await db.QueryFirstOrDefaultAsync<RevisionVehiculo>("ObtenerRevisionVehiculo",
                        new { id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (revision != null)
                    {
                        return Ok(revision);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron revisiones de vehiculo";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar las revisiones de vehiculo: " + ex.Message;
                return StatusCode(500, respuesta);
            }


        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarRevisionVehiculo(RevisionVehiculo revisionVehiculo)
        {
            RevisionVehiculoRespuesta respuesta = new RevisionVehiculoRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("ModificarRevisionVehiculo",
                        new
                        {
                            revisionVehiculo.Id,
                            revisionVehiculo.VIN,
                            revisionVehiculo.Marca,
                            revisionVehiculo.Modelo,
                            revisionVehiculo.Extras,
                            revisionVehiculo.Color,
                            revisionVehiculo.CostoVehiculo,
                            revisionVehiculo.AnnoVehiculo,
                            revisionVehiculo.DniDuenno,
                            revisionVehiculo.Placa,
                            revisionVehiculo.EstadoOP
                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Revision de vehiculo actualizada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo actualizar la revision de vehiculo";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al actualizar la revision de vehiculo: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarRevisionVehiculo(int id)
        {
            RevisionVehiculoRespuesta respuesta = new RevisionVehiculoRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("EliminarRevisionVehiculo",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Revision de vehiculo eliminada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar la revision de vehiculo";
                        return BadRequest(respuesta);
                    }
                }
            }

            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar la revision de vehiculo: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }
    }
}
