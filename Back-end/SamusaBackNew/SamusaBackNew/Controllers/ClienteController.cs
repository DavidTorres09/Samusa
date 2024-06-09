using Dapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data.SqlClient;

using SamusaBackNew.Entities;
using System.Data;
using SamusaBackNew.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using SamusaBackNew.Models;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/cliente")]
    public class ClienteController(IConfiguration _configuration, IUtilitariosModel _utilitariosModel, IHostEnvironment _hostEnvironment) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarCliente([FromBody] Cliente cliente)
        {
            ClienteRespuesta respuesta = new ClienteRespuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    

                    var resultado = await db.ExecuteAsync("AgregarCliente",
                        new
                        {
                            cliente.Direccion,
                            cliente.Dni,
                            cliente.Nombre,
                            cliente.Telefono,
                            cliente.Email,
                            cliente.EsNacional,
                            cliente.Usuario,
                            cliente.Contrasenna,
                            cliente.Foto
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Cliente agregado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "Su correo, email o DNI ya se encuentran registrados";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al agregar cliente: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerClientes()
        {
            ClienteRespuesta respuesta = new ClienteRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var clientes = await db.QueryAsync<Cliente>("ObtenerClientes", commandType: System.Data.CommandType.StoredProcedure);

                    if (clientes != null && clientes.Any())
                    {
                        return Ok(clientes);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron clientes.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener clientes: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerCliente(int id)
        {
            ClienteRespuesta respuesta = new ClienteRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var cliente = await db.QueryFirstOrDefaultAsync<Cliente>("ObtenerCliente",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (cliente != null)
                    {
                        return Ok(cliente);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontró el cliente.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener cliente: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarCliente(Cliente cliente)
        {
            ClienteRespuesta respuesta = new ClienteRespuesta();
            
            
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("ModificarCliente",
                        new
                        {
                            cliente.Id,
                            cliente.Direccion,
                            cliente.Dni,
                            cliente.Nombre,
                            cliente.Telefono,
                            cliente.Email,
                            cliente.EsNacional,
                            cliente.Usuario,
                            cliente.Contrasenna,
                            cliente.RolId,
                            cliente.Foto


                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Cliente modificado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo modificar el cliente.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al modificar cliente: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarCliente(int id)
        {
            ClienteRespuesta respuesta = new ClienteRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("EliminarCliente",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Cliente eliminado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar el cliente.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar cliente: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("autenticar")]
        public async Task<IActionResult> IniciarSesionCliente([FromBody] Cliente cliente)
        {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    ClienteRespuesta respuesta = new ClienteRespuesta();
                    await db.OpenAsync();


                    var resultado = await Task.Run(() =>
                           db.Query<Cliente>("IniciarSesionCliente",
                        new 
                        { 
                            usuario = cliente.Usuario,
                            contrasenna = cliente.Contrasenna
                        }
                        , commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault());

                   
                    if (resultado != null)
                    {
                        respuesta.Dato = resultado;
                        respuesta.Dato.Token = _utilitariosModel.GenerarToken(resultado.Dni ?? string.Empty);
                        respuesta.Codigo = "0";
                        respuesta.Mensaje = "Inicio de sesion exitoso";
                        return Ok(respuesta);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "Usuario o contrasena incorrectos";
                        return Unauthorized(respuesta);
                    }
                }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("RecuperarAccesoCliente")]
        public IActionResult RecuperarAcceso(Cliente entidad)
        {
            using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                ClienteRespuesta respuesta = new ClienteRespuesta();
                string NuevaContrasenna = _utilitariosModel.GenerarNuevaContrasenna();
                string Contrasenna = _utilitariosModel.Encriptar(NuevaContrasenna);
                bool EsTemporal = true;

                var resultado = db.Query<Cliente>("RecuperarAccesoCliente",
                    new { entidad.Email, Contrasenna, EsTemporal },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (resultado == null)
                {
                    respuesta.Codigo = "-1";
                    respuesta.Mensaje = "Verfique su correo y vuelva a intentar";
                }
                else
                {
                    string ruta = Path.Combine(_hostEnvironment.ContentRootPath, "RecuperarAcceso.html");
                    string htmlBody = System.IO.File.ReadAllText(ruta);
                    htmlBody = htmlBody.Replace("@Usuario@", resultado.Usuario);
                    htmlBody = htmlBody.Replace("@Contrasenna@", NuevaContrasenna);

                    _utilitariosModel.EnviarCorreo(resultado.Email!, "SAMUSA - Restablecimiento de contraseña", htmlBody);
                    respuesta.Dato = resultado;
                }

                return Ok(respuesta);
            }
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("CambiarContrasennaCliente")]
        public IActionResult CambiarContrasennaCliente(Cliente cliente)
        {
            using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                ClienteRespuesta respuesta = new ClienteRespuesta();
                bool EsTemporal = false;

                var resultado = db.Query<Cliente>("CambiarContrasennaCliente",
                    new { cliente.Email, cliente.Contrasenna, cliente.ContrasennaTemporal, EsTemporal },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (resultado == null)
                {
                    respuesta.Codigo = "-1";
                    respuesta.Mensaje = "Sus datos no son correctos";
                }
                else
                {
                    respuesta.Dato = resultado;
                }

                return Ok(respuesta);
            }
        }
    }
}

