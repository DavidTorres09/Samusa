using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Interfaces;
using SamusaBackNew.Entities;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/cotizaciones")]
    public class CotizacionesController(IRepository<Cotizaciones> _repositoryCotizaciones, IRepository<VistaCotizaciones> _repositoryVistaCotizaciones) : Controller
    {

        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerCotizaciones()
        {
            return await _repositoryVistaCotizaciones.ObtenerTodos("ObtenerCotizaciones");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerCotizacion(int id)
        {
            return await _repositoryVistaCotizaciones.ObtenerUno("ObtenerCotizacion", id);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarCotizacion(Cotizaciones cotizacion)
        {
            return await _repositoryCotizaciones.Insertar("AgregarCotizacion", cotizacion);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarCotizacion(Cotizaciones cotizacion)
        {
            return await _repositoryCotizaciones.Actualizar("ModificarCotizacion", cotizacion);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarCotizacion(int id)
        {
            return await _repositoryCotizaciones.Eliminar("EliminarCotizacion", id);
        }
        
    }
}
