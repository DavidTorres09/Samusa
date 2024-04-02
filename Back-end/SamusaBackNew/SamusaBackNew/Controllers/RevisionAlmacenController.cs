using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/revisionalmacen")]
    public class RevisionAlmacenController(IRepository<RevisionAlmacen> _repositoryRevisionAlmacen) : Controller
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
            public async Task<IActionResult> ObtenerRevisionAlmacenes()
        {
                return await _repositoryRevisionAlmacen.ObtenerTodos("ObtenerRevisionAlmacenes");
            }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
            public async Task<IActionResult> ObtenerRevisionAlmacen(int id)
        {
                return await _repositoryRevisionAlmacen.ObtenerUno("ObtenerRevisionAlmacen", id);
            }

        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
            public async Task<IActionResult> AgregarRevisionAlmacen(RevisionAlmacen revisionAlmacen)
        {
                return await _repositoryRevisionAlmacen.Insertar("AgregarRevisionAlmacen", revisionAlmacen);
            }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
            public async Task<IActionResult> ModificarRevisionAlmacen(RevisionAlmacen revisionAlmacen)
        {
                return await _repositoryRevisionAlmacen.Actualizar("ModificarRevisionAlmacen", revisionAlmacen);
            }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
            public async Task<IActionResult> EliminarRevisionAlmacen(int id)
        {
                return await _repositoryRevisionAlmacen.Eliminar("EliminarRevisionAlmacen", id);
            }
       
    }
}
