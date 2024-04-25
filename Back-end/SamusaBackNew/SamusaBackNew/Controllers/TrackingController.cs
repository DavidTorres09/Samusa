using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SamusaBackNew.Entities;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/[controller]")]
    public class trackingController(IConfiguration _configuration) : Controller
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ConsultarTrackingDetallado(int id)
        {
            TrackingRespuesta respuesta = new TrackingRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var tracking = await db.QueryFirstOrDefaultAsync<Tracking>("ConsultarTrackingDetallado",
                        new { NumSeguimiento = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (tracking != null)
                    {
                        return Ok(tracking);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontró ningun elemento de Tracking.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener elementos en Tracking: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }
    }
}
