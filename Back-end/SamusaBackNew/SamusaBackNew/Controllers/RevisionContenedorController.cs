using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using Microsoft.Data.SqlClient;
using Dapper;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class RevisionContenedorController(IConfiguration _configuration) : Controller
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarRevisionContenedor(RevisionContenedor revisionContenedor)
        {
            RevisionContenedorRespuesta respuesta = new RevisionContenedorRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarRevisionContenedor",
                        new
                        {
                            revisionContenedor.PuertoOrigen,
                            revisionContenedor.PuertoDestino,
                            revisionContenedor.Naviera,
                            revisionContenedor.Transportista,
                            revisionContenedor.DniDuenno,
                            revisionContenedor.Estado
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Revision de Contenedor agregada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo agregar la Revision de Contenedor";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar la revision de Contenedor: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerRevisionContenedores()
        {
            RevisionContenedorRespuesta respuesta = new RevisionContenedorRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var revisiones = await db.QueryAsync<RevisionContenedor>("ObtenerRevisionContenedores", commandType: System.Data.CommandType.StoredProcedure);

                    if (revisiones != null && revisiones.Any())
                    {
                        return Ok(revisiones);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron revisiones de contenedor";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar revisiones de contenedor: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerRevisionContenedor(int id)
        {
            RevisionContenedorRespuesta respuesta = new RevisionContenedorRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var revision = await db.QueryFirstOrDefaultAsync<RevisionContenedor>("ObtenerRevisionContenedor",
                        new { id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (revision != null)
                    {
                        return Ok(revision);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron revisiones de contenedor";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al listar las revisiones de contenedor: " + ex.Message;
                return StatusCode(500, respuesta);
            }


        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarRevisionContenedor(RevisionContenedor revisionContenedor)
        {
            RevisionContenedorRespuesta respuesta = new RevisionContenedorRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("ModificarRevisionContenedor",
                        new
                        {
                            revisionContenedor.Id,
                            revisionContenedor.PuertoOrigen,
                            revisionContenedor.PuertoDestino,
                            revisionContenedor.Naviera,
                            revisionContenedor.Transportista,
                            revisionContenedor.DniDuenno,
                            revisionContenedor.Estado
                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Revision de contenedor actualizada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo actualizar la revision de contenedor";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al actualizar la revision de contenedor: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarRevisionContenedor(int id)
        {
            RevisionContenedorRespuesta respuesta = new RevisionContenedorRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("EliminarRevisionContenedor",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Revision de contenedor eliminada correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar la revision de contenedor";
                        return BadRequest(respuesta);
                    }
                }
            }

            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar la revision de contenedor: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }
    }
}
