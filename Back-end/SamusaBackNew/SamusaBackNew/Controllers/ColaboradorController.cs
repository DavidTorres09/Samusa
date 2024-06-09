using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SamusaBackNew.Entities;
using System.Data;
using SamusaBackNew.Interfaces;

namespace SamusaBackNew.Controllers
{
    [ApiController]
    [Route("api/samusa/colaborador")]
    public class ColaboradorController(IConfiguration _configuration, IUtilitariosModel _utilitariosModel, IHostEnvironment _hostEnvironment) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("agregar")]
        public async Task<IActionResult> AgregarColaborador(Colaborador colaborador)
        {
            ColaboradorRespuesta respuesta = new ColaboradorRespuesta();

            if (colaborador.RolId < 2)
                return BadRequest(new { Codigo = "-1", Mensaje = "Por favor seleccione un rol perteneciente a Colaborador" });

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();
                    var resultado = await db.ExecuteAsync("AgregarColaborador",
                        new
                        {
                            colaborador.Direccion,
                            colaborador.Dni,
                            colaborador.Nombre,
                            colaborador.Telefono,
                            colaborador.Email,
                            colaborador.EsNacional,
                            colaborador.Usuario,
                            colaborador.Contrasenna,
                            colaborador.RolId,
                            colaborador.Foto
                        },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Colaborador agregado correctamente" });
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
                respuesta.Mensaje = "Error al agregar colaborador: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ObtenerColaboradores()
        {
            ColaboradorRespuesta respuesta = new ColaboradorRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var colaboradores = await db.QueryAsync<Colaborador>("ObtenerColaboradores", commandType: System.Data.CommandType.StoredProcedure);

                    if (colaboradores != null && colaboradores.Any())
                    {
                        return Ok(colaboradores);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontraron colaboradores.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener colaboradores: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("listar/{id}")]
        public async Task<IActionResult> ObtenerColaborador(int id)
        {
            ColaboradorRespuesta respuesta = new ColaboradorRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var colaborador = await db.QueryFirstOrDefaultAsync<Colaborador>("ObtenerColaborador",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (colaborador != null)
                    {
                        return Ok(colaborador);
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se encontró el colaborador.";
                        return NotFound(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al obtener colaborador: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpPut]
        [Route("actualizar")]
        public async Task<IActionResult> ModificarColaborador(Colaborador colaborador)
        {
            ColaboradorRespuesta respuesta = new ColaboradorRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    if (colaborador.RolId < 2)
                        return BadRequest(new { Codigo = "-1", Mensaje = "Por favor seleccione un rol perteneciente a Colaborador" });

                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("ModificarColaborador",
                        new
                        {
                            colaborador.Id,
                            colaborador.Direccion,
                            colaborador.Dni,
                            colaborador.Nombre,
                            colaborador.Telefono,
                            colaborador.Email,
                            colaborador.EsNacional,
                            colaborador.Usuario,
                            colaborador.Contrasenna,
                            colaborador.RolId,
                            colaborador.Foto
                        },
                    commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Colaborador modificado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo modificar el colaborador.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al modificar colaborador: " + ex.Message;
                return StatusCode(500, respuesta);
            }

        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("eliminar/{id}")]
        public async Task<IActionResult> EliminarColaborador(int id)
        {
            ColaboradorRespuesta respuesta = new ColaboradorRespuesta();
            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await db.OpenAsync();

                    var resultado = await db.ExecuteAsync("EliminarColaborador",
                        new { Id = id },
                        commandType: System.Data.CommandType.StoredProcedure);

                    if (resultado > 0)
                    {
                        return Ok(new { Codigo = "0", Mensaje = "Colaborador eliminado correctamente" });
                    }
                    else
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = "No se pudo eliminar el colaborador.";
                        return BadRequest(respuesta);
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = "Error al eliminar colaborador: " + ex.Message;
                return StatusCode(500, respuesta);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("autenticar")]
        public async Task<IActionResult> IniciarSesionColaborador([FromBody] Colaborador colaborador)
        {


            using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                ColaboradorRespuesta respuesta = new ColaboradorRespuesta();
                await db.OpenAsync();


                var resultado = await Task.Run(() =>
                       db.Query<Colaborador>("IniciarSesionColaborador",
                    new
                    {
                        usuario = colaborador.Usuario,
                        contrasenna = colaborador.Contrasenna
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
        [Route("RecuperarAccesoColaborador")]
        public IActionResult RecuperarAcceso(Colaborador entidad)
        {
            using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                ColaboradorRespuesta respuesta = new ColaboradorRespuesta();
                string NuevaContrasenna = _utilitariosModel.GenerarNuevaContrasenna();
                string Contrasenna = _utilitariosModel.Encriptar(NuevaContrasenna);
                bool EsTemporal = true;

                var resultado = db.Query<Colaborador>("RecuperarAccesoColaborador",
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

                    _utilitariosModel.EnviarCorreo(resultado.Email!, "SAMUSA - Restablecimiento de contraseña   ", htmlBody);
                    respuesta.Dato = resultado;
                }

                return Ok(respuesta);
            }
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("CambiarContrasennaColaborador")]
        public IActionResult CambiarContrasenna(Colaborador cliente)
        {
            using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                ColaboradorRespuesta respuesta = new ColaboradorRespuesta();
                bool EsTemporal = false;

                var resultado = db.Query<Colaborador>("CambiarContrasennaColaborador",
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
