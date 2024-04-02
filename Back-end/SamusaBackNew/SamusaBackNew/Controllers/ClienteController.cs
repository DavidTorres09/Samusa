using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/cliente")]
    public class ClienteController(IRepository<ClientePersona> _repositoryClientePersona, IRepository<VistaClientePersona> _repositoryVistaClientePersona): ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarCliente(ClientePersona cliente)
        {
            return await _repositoryClientePersona.Insertar("AgregarCliente", cliente);
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerClientes()
        {
            return await _repositoryVistaClientePersona.ObtenerTodos("ObtenerClientes");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerCliente(int id)
        {
            return await _repositoryVistaClientePersona.ObtenerUno("ObtenerCliente", id);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarCliente(ClientePersona cliente)
        {
            return await _repositoryClientePersona.Actualizar("ModificarCliente", cliente);
        }

        //[AllowAnonymous]
        //[HttpPut]
        //[Route("actualizarFoto")]
        //public async Task<IActionResult> ModificarClienteFoto(ClientePersona cliente)
        //{
        //    return await _repositoryClientePersona.Actualizar("ModificarClienteFoto", cliente);
        //}

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarCliente(int id)
        {
            return await _repositoryClientePersona.Eliminar("EliminarCliente", id);
        }
    }
}
