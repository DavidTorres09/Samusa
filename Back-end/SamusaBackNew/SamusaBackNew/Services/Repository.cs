using Dapper;
using System.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

using SamusaBackNew.Entities;
using SamusaBackNew.Interfaces;


namespace API.Models
{
    public class Repository<T>(IConfiguration _configuration): ControllerBase, IRepository<T> where T : class
    {

        public async Task<IActionResult> ObtenerTodos(string procedimientoAlmacenado)
        {
            Respuesta respuesta = new Respuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    var resultado = await Task.Run(() =>
                        db.Query<T>(procedimientoAlmacenado, commandType: CommandType.StoredProcedure).ToList());
                    if (resultado != null)
                    {
                        return Ok(resultado);
                    }
                    else
                    {
                        return NotFound($"No se encontraron registros de tipo {typeof(T).Name}");
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = $"Error al obtener los registros de {typeof(T).Name}: {ex.Message}";
                return StatusCode(500, respuesta);
            }
        }


        public async Task<IActionResult> ObtenerUno(string procedimientoAlmacenado, int id)
        {
            Respuesta respuesta = new Respuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    var resultado = await Task.Run(() =>
                        db.Query<T>(procedimientoAlmacenado, new { id }, commandType: CommandType.StoredProcedure).FirstOrDefault());

                    if (resultado != null)
                    {
                        return Ok(resultado);
                    }
                    else
                    {
                        return NotFound($"No se encontró el registro con el ID {id}");
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = $"Error al obtener el registro de {typeof(T).Name}: {ex.Message}";
                return StatusCode(500, respuesta);
            }
        }


        public async Task<IActionResult> Insertar(string procedimientoalmacenado, T entity)
        {
            Respuesta respuesta = new Respuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    var resultado = await Task.Run(() =>
                        db.Execute(procedimientoalmacenado, entity, commandType: CommandType.StoredProcedure));
                   
                    if (resultado <= 0)
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = $"No se pudo insertar el registro de {typeof(T).Name}";
                    }
                    else
                    {
                        respuesta.Codigo = "0";
                        respuesta.Mensaje = $"Registro de {typeof(T).Name} insertado correctamente";
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = $"Error al insertar el registro de {typeof(T).Name}: {ex.Message}";
            }
            return Ok(respuesta);
        }

        public async Task<IActionResult> Actualizar(string procedimientoAlmacenado, T entity)
        {
            Respuesta respuesta = new Respuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    var resultado = await Task.Run(() =>
                        db.Execute(procedimientoAlmacenado, entity, commandType: CommandType.StoredProcedure));
                    if (resultado <= 0)
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = $"No se pudo actualizar el registro de {typeof(T).Name}";
                    }
                    else
                    {
                        respuesta.Codigo = "0";
                        respuesta.Mensaje = $"Registro de {typeof(T).Name} actualizado correctamente";
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = $"Error al actualizar el registro de {typeof(T).Name}: {ex.Message}";
            }
            return Ok(respuesta);
        }

        public async Task<IActionResult> Eliminar(string procedimientoAlmacenado, int id)
        {
            Respuesta respuesta = new Respuesta();

            try
            {
                using (var db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    var resultado = await Task.Run(() =>
                        db.Execute(procedimientoAlmacenado, new { id }, commandType: CommandType.StoredProcedure));
                    if (resultado <= 0)
                    {
                        respuesta.Codigo = "-1";
                        respuesta.Mensaje = $"No se pudo eliminar el registro de {typeof(T).Name}";
                    }
                    else
                    {
                        respuesta.Codigo = "0";
                        respuesta.Mensaje = $"Registro de {typeof(T).Name} eliminado correctamente";
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Codigo = "-1";
                respuesta.Mensaje = $"Error al eliminar el registro de {typeof(T).Name}: {ex.Message}";
            }
            return Ok(respuesta);
        }
    }
}

