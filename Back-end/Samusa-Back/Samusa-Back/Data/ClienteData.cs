using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class ClienteData
    {
        public static async Task<bool> Create(ClientePersona cliente)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_addClient", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dni", cliente.DNI);
                cmd.Parameters.AddWithValue("@nombre", cliente.Nombre);
                cmd.Parameters.AddWithValue("@primerApellido", cliente.PrimerApellido);
                cmd.Parameters.AddWithValue("@segundoApellido", cliente.SegundoApellido);
                cmd.Parameters.AddWithValue("@telefono", cliente.Telefono);
                cmd.Parameters.AddWithValue("@email", cliente.Email);
                cmd.Parameters.AddWithValue("@esNacional", cliente.EsNacional);
                cmd.Parameters.AddWithValue("@usuario", cliente.Usuario);
                cmd.Parameters.AddWithValue("@password", cliente.Password);
                cmd.Parameters.AddWithValue("@direccion", cliente.Direccion);
                cmd.Parameters.AddWithValue("@rol", cliente.Rol);

                try
                {
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    return false;
                }
            }
        }

        public static async Task<bool> Update(ClientePersona cliente)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_modifyClient", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dni", cliente.DNI);
                cmd.Parameters.AddWithValue("@newDireccion", cliente.Direccion) ;
                cmd.Parameters.AddWithValue("@newNombre", cliente.Nombre);
                cmd.Parameters.AddWithValue("@newPrimerApellido", cliente.PrimerApellido);
                cmd.Parameters.AddWithValue("@newSegundoApellido", cliente.SegundoApellido);
                cmd.Parameters.AddWithValue("@newTelefono", cliente.Telefono);
                cmd.Parameters.AddWithValue("@newEmail", cliente.Email);
                cmd.Parameters.AddWithValue("@newEsNacional", cliente.EsNacional);
                cmd.Parameters.AddWithValue("@newUsuario", cliente.Usuario);
                cmd.Parameters.AddWithValue("@newPassword", cliente.Password);
                cmd.Parameters.AddWithValue("@newRol", cliente.Rol);

                try
                {
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    return false;
                }
            }
        }

        public static async Task<List<ClientePersona>> Read()
        {
            List<ClientePersona> clients = new List<ClientePersona>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getClients", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            clients.Add(new ClientePersona()
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
                                Direccion = dr["Direccion"].ToString(),
                                Rol = dr["Rol"].ToString()
                            });
                        }
                    }
                    return clients;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    throw;
                }
            }
        }

        public static async Task<ClientePersona> ReadOne(int dni)
        {
            ClientePersona client = null; // Inicializamos como null
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getSingleClient", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dni", dni);

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            client = new ClientePersona()
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
                                Direccion = dr["Direccion"].ToString(),
                                Rol = dr["Rol"].ToString()
                            };
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error al leer cliente: " + e.Message);
                }
            }
            return client;
        }

        public static async Task<bool> Delete(int dni)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_deleteClients", connection);
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


        public static async Task<bool> Login(string username, string password)
        {
            //usuario.IdRol = 0;
            
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_Login", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@usuario", username);
                cmd.Parameters.AddWithValue("@password", password);

                try
                {   connection.Open();
                    cmd.ExecuteScalar();
                    //usuario.IdRol = Convert.ToInt32(cmd.ExecuteScalar().ToString());
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    return false;
                }
            }
        }

    }
}
