using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/paqueteria")]
    public class PaqueteriaController(IRepository<Paqueteria> _repositoryPaqueteria, IRepository<PaqueteriaVista> _repositoryPaqueteriaVista ) : Controller
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerPaqueterias()
        {
            return await _repositoryPaqueteriaVista.ObtenerTodos("ObtenerPaqueterias");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerPaqueteria(int id)
        {
            return await _repositoryPaqueteriaVista.ObtenerUno("ObtenerPaqueteria", id);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarPaqueteria(Paqueteria paqueteria)
        {
            return await _repositoryPaqueteria.Insertar("AgregarPaqueteria", paqueteria);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarPaqueteria(Paqueteria paqueteria)
        {
            return await _repositoryPaqueteria.Actualizar("ModificarPaqueteria", paqueteria);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarPaqueteria(int id)
        {
            return await _repositoryPaqueteria.Eliminar("EliminarPaqueteria", id);
        }
        
    }
}
