using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;
using System.Data.SqlTypes;

namespace Samusa_Back.Controllers
{
    [ApiController]
    [Route("api/samusa/cotizacion")]
    public class CotizacionController : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewCotizaciones()
        {
            var cotizaciones = await CotizacionesData.Read();

            if (cotizaciones != null)
            {
                return Ok(cotizaciones);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de cotizaciones." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> ViewCotizacionById(int idcotizacion)
        {
            var cotizacion = await CotizacionesData.ReadOne(idcotizacion);

            if (cotizacion != null)
            {
                return Ok(cotizacion);
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la cotización." });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> SaveCotizacion([FromBody] Cotizacione cotizacion)
        {
            var confirmation = await CotizacionesData.Create(cotizacion);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al guardar la cotización." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> DeleteCotizacion(int idcotizacion)
        {
            var confirmation = await CotizacionesData.Delete(idcotizacion);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al eliminar la cotización." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> ModifyCotizacion([FromBody] Cotizacione cotizacion)
        {
            var confirmation = await CotizacionesData.Update(cotizacion);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar la cotización." });
            }
        }
    }
}