using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Drawing;

namespace Samusa_Back.Data
{
    public class ColaboradoresData
    {

        public static async Task<bool> Create(ColaboradorPersona colaborador)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_addColaborador", connection);
                cmd.CommandType = CommandType.StoredProcedure;

               
                cmd.Parameters.AddWithValue("@dni", colaborador.DNI);
                cmd.Parameters.AddWithValue("@nombre", colaborador.Nombre);
                cmd.Parameters.AddWithValue("@primerApellido", colaborador.PrimerApellido);
                cmd.Parameters.AddWithValue("@segundoApellido", colaborador.SegundoApellido); 
                cmd.Parameters.AddWithValue("@telefono", colaborador.Telefono);
                cmd.Parameters.AddWithValue("@email", colaborador.Email); 
                cmd.Parameters.AddWithValue("@esNacional", colaborador.EsNacional);
                cmd.Parameters.AddWithValue("@usuario", colaborador.Usuario);
                cmd.Parameters.AddWithValue("@password", colaborador.Password); 
                cmd.Parameters.AddWithValue("@fechaIng", colaborador.FechaIngreso);
                cmd.Parameters.AddWithValue("@rol", colaborador.Rol);

                try
                {
                    await connection.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    return false;
                }
            }
        }

        public static async Task<bool> Update(ColaboradorPersona colaborador)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_modifyColaborador", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@dni", colaborador.DNI);
                cmd.Parameters.AddWithValue("@newfechaIng", colaborador.FechaIngreso);
                cmd.Parameters.AddWithValue("@newNombre", colaborador.Nombre); 
                cmd.Parameters.AddWithValue("@newPrimerApellido", colaborador.PrimerApellido); 
                cmd.Parameters.AddWithValue("@newSegundoApellido", colaborador.SegundoApellido); 
                cmd.Parameters.AddWithValue("@newTelefono", colaborador.Telefono); 
                cmd.Parameters.AddWithValue("@newEmail", colaborador.Email);
                cmd.Parameters.AddWithValue("@newEsNacional", colaborador.EsNacional); 
                cmd.Parameters.AddWithValue("@newUsuario", colaborador.Usuario); 
                cmd.Parameters.AddWithValue("@newPassword", colaborador.Password); 
                cmd.Parameters.AddWithValue("@newRol", colaborador.Rol);

                try
                {
                    await connection.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    return false;
                }
            }
        }

        public static async Task<List<ColaboradorPersona>> Read()
        {
            List<ColaboradorPersona> employees = new List<ColaboradorPersona>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getColaborador", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            employees.Add(new ColaboradorPersona()
                            {
                                DNI = Convert.ToInt32(dr["DNI"]),
                                Nombre = dr["Nombre"].ToString(),
                                PrimerApellido = dr["PrimerApellido"].ToString(),
                                SegundoApellido = dr["SegundoApellido"].ToString(),
                                Telefono = dr["Telefono"].ToString(),
                                Email = dr["Email"].ToString(),
                                EsNacional = Convert.ToBoolean(dr["EsNacional"]),
                                Usuario = dr["Usuario"].ToString(),
                                Password = dr["Password"].ToString(),
                                FechaIngreso = dr["FechaIngreso"].ToString(),
                                Rol = dr["Rol"].ToString()
                            });
                        }
                    }
                    return employees;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    throw;
                }
            }
        }

        public static async Task<ColaboradorPersona> ReadOne(int dni)
        {
            ColaboradorPersona employee = new ColaboradorPersona();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getSingleColaborador", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dni", dni);

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            employee = new ColaboradorPersona()
                            {
                                DNI = Convert.ToInt32(dr["DNI"]),
                                Nombre = dr["Nombre"].ToString(),
                                PrimerApellido = dr["PrimerApellido"].ToString(),
                                SegundoApellido = dr["SegundoApellido"].ToString(),
                                Telefono = dr["Telefono"].ToString(),
                                Email = dr["Email"].ToString(),
                                EsNacional = Convert.ToBoolean(dr["EsNacional"]),
                                Usuario = dr["Usuario"].ToString(),
                                Password = dr["Password"].ToString(),
                                FechaIngreso = dr["FechaIngreso"].ToString(),
                                Rol = dr["Rol"].ToString()
                            };
                        }
                    }
                    return employee;
                }
                catch (Exception e)
                {
                    return employee;
                }
            }
        }

        public static async Task<bool> Delete(int dni)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_deleteColaborador", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dni", dni);

                try
                {
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    return true; // Devuelve true si la eliminación tiene éxito
                }
                catch (SqlException sqlEx)
                {
                    // Captura excepciones específicas de SQL y registra el mensaje de error
                    Console.WriteLine("Error de SQL al intentar eliminar el cliente: " + sqlEx.Message);
                    return false; // Devuelve false en caso de error
                }
                catch (Exception ex)
                {
                    // Captura cualquier otra excepción y registra el mensaje de error
                    Console.WriteLine("Error al intentar eliminar el cliente: " + ex.Message);
                    return false; // Devuelve false en caso de error
                }
            }
        }

    }
}
