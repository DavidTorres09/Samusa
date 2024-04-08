using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/revisioncontenedor")]
    public class RevisionContenedorController(IRepository<RevisionContenedor> _repositoryRevisionContenedor) : Controller
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerRevisionContenedores()
        {
            return await _repositoryRevisionContenedor.ObtenerTodos("ObtenerRevisionContenedores");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerRevisionContenedor(int id)
        {
            return await _repositoryRevisionContenedor.ObtenerUno("ObtenerRevisionContenedor", id);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarRevisionContenedor(RevisionContenedor revisionContenedor)
        {
            return await _repositoryRevisionContenedor.Insertar("AgregarRevisionContenedor", revisionContenedor);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarRevisionContenedor(RevisionContenedor revisionContenedor)
        {
            return await _repositoryRevisionContenedor.Actualizar("ModificarRevisionContenedor", revisionContenedor);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarRevisionContenedor(int id)
        {
            return await _repositoryRevisionContenedor.Eliminar("EliminarRevisionContenedor", id);
        }
    }
}
