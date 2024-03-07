using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class RevisionContenedorData
    {

        public static async Task<bool> Create(RevisionContenedor revisionC)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_addRevisionContenedor", connection);
                cmd.CommandType = CommandType.StoredProcedure;


                cmd.Parameters.AddWithValue("@PuertoOrigen", revisionC.PuertoOrigen);
                cmd.Parameters.AddWithValue("@PuertoDestino", revisionC.PuertoDestino);
                cmd.Parameters.AddWithValue("@Naviera", revisionC.Naviera);
                cmd.Parameters.AddWithValue("@Transportista", revisionC.Transportista);
                cmd.Parameters.AddWithValue("@DniDueno", revisionC.DniDueno);
                cmd.Parameters.AddWithValue("@Estado", revisionC.Estado);

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


        public static async Task<bool> Update(RevisionContenedor revisionC)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_modifyRevisionContenedor", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@IdrevCont", revisionC.IdrevCont);
                cmd.Parameters.AddWithValue("@newPuertoOrigen", revisionC.PuertoOrigen);
                cmd.Parameters.AddWithValue("@newPuertoDestino", revisionC.PuertoDestino);
                cmd.Parameters.AddWithValue("@newNaviera", revisionC.Naviera);
                cmd.Parameters.AddWithValue("@newTransportista", revisionC.Transportista);
                cmd.Parameters.AddWithValue("@newDniDueno", revisionC.DniDueno);
                cmd.Parameters.AddWithValue("@newEstado", revisionC.Estado);

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

        public static async Task<List<RevisionContenedor>> Read()
        {
            List<RevisionContenedor> RevsCont = new List<RevisionContenedor>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getRevisionContenedor", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            RevsCont.Add(new RevisionContenedor()
                            {
                                IdrevCont = Convert.ToInt32(dr["IdrevCont"]),
                                PuertoOrigen = dr["PuertoOrigen"].ToString(),
                                PuertoDestino = dr["PuertoDestino"].ToString(),
                                Naviera = dr["Naviera"].ToString(),
                                Transportista = dr["Transportista"].ToString(),
                                DniDueno = Convert.ToInt32(dr["Dni_Dueno"]),
                                Estado = dr["Estado"].ToString(),
                            });
                        }
                    }
                    return RevsCont;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    throw;
                }
            }
        }

        public static async Task<RevisionContenedor> ReadOne(int IdrevCont)
        {
            RevisionContenedor RevCont = new RevisionContenedor();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getSingleRevisionContenedor", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdrevCont", IdrevCont);

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            RevCont = new RevisionContenedor()
                            {
                                IdrevCont = Convert.ToInt32(dr["IdrevCont"]),
                                PuertoOrigen = dr["PuertoOrigen"].ToString(),
                                PuertoDestino = dr["PuertoDestino"].ToString(),
                                Naviera = dr["Naviera"].ToString(),
                                Transportista = dr["Transportista"].ToString(),
                                DniDueno = Convert.ToInt32(dr["Dni_Dueno"]),
                                Estado = dr["Estado"].ToString(),
                            };
                        }
                    }
                    return RevCont;
                }
                catch (Exception e)
                {
                    return RevCont;
                }
            }
        }

        public static async Task<bool> Delete(int IdrevCont)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_deleteRevisionContenedor", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdrevCont", IdrevCont);

                try
                {
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    return true; // Devuelve true si la eliminación tiene éxito
                }
                catch (SqlException sqlEx)
                {
                    // Captura excepciones específicas de SQL y registra el mensaje de error
                    Console.WriteLine("Error de SQL al intentar eliminar el contenedor: " + sqlEx.Message);
                    return false; // Devuelve false en caso de error
                }
                catch (Exception ex)
                {
                    // Captura cualquier otra excepción y registra el mensaje de error
                    Console.WriteLine("Error al intentar eliminar el contenedor: " + ex.Message);
                    return false; // Devuelve false en caso de error
                }
            }
        }

    }
}
