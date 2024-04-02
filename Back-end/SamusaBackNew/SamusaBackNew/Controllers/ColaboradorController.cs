using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/colaborador")]
    public class ColaboradorController(IRepository<ColaboradorPersona> _repositoryColaboradorPersona, IRepository<VistaColaboradorPersona> _repositoryVistaColaboradorPersona) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarColaborador(ColaboradorPersona colaborador)
        {
            return await _repositoryColaboradorPersona.Insertar("AgregarColaborador", colaborador);
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerColaboradores()
        {
            return await _repositoryVistaColaboradorPersona.ObtenerTodos("ObtenerColaboradores");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerColaborador(int id)
        {
            return await _repositoryVistaColaboradorPersona.ObtenerUno("ObtenerColaborador", id);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarColaborador(ColaboradorPersona colaborador)
        {
            return await _repositoryColaboradorPersona.Actualizar("ModificarColaborador", colaborador);
        }

        //[AllowAnonymous]
        //[HttpPut]
        //[Route("actualizarFoto")]
        //public async Task<IActionResult> ModificarClienteFoto(ColaboradorPersona colaborador)
        //{
        //    return await _repositoryColaboradorPersona.Actualizar("ModificarClienteFoto", colaborador);
        //}

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarColaborador(int id)
        {
            return await _repositoryColaboradorPersona.Eliminar("EliminarColaborador", id);
        }
    }
}
