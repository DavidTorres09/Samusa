using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class RevisionAlmacenesData
    {

        public static async Task<bool> Create(RevisionAlmacen revision)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_addRevisionAlmacen", connection);
                cmd.CommandType = CommandType.StoredProcedure;


                cmd.Parameters.AddWithValue("@Vin", revision.Vin);
                cmd.Parameters.AddWithValue("@Marca", revision.Marca);
                cmd.Parameters.AddWithValue("@Modelo", revision.Modelo);
                cmd.Parameters.AddWithValue("@Color", revision.Color);
                cmd.Parameters.AddWithValue("@CostoVehiculo", revision.CostoVehiculo);
                cmd.Parameters.AddWithValue("@AnioVehiculo", revision.AnioVehiculo);
                cmd.Parameters.AddWithValue("@DniDueno", revision.DniDueno);
                cmd.Parameters.AddWithValue("@Placa", revision.Placa);
                cmd.Parameters.AddWithValue("@EstadoOp", revision.EstadoOp);

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

        public static async Task<bool> Update(RevisionAlmacen revision)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_modifyRevisionAlmacen", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@IdformAlmacen", revision.IdformAlmacen);
                cmd.Parameters.AddWithValue("@newVin", revision.Vin);
                cmd.Parameters.AddWithValue("@newMarca", revision.Marca);
                cmd.Parameters.AddWithValue("@newModelo", revision.Modelo);
                cmd.Parameters.AddWithValue("@newColor", revision.Color);
                cmd.Parameters.AddWithValue("@newCostoVehiculo", revision.CostoVehiculo);
                cmd.Parameters.AddWithValue("@newAnioVehiculo", revision.AnioVehiculo);
                cmd.Parameters.AddWithValue("@newDniDueno", revision.DniDueno);
                cmd.Parameters.AddWithValue("@newPlaca", revision.Placa);
                cmd.Parameters.AddWithValue("@newEstadoOp", revision.EstadoOp);

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

        public static async Task<List<RevisionAlmacen>> Read()
        {
            List<RevisionAlmacen> RevsAlmacen = new List<RevisionAlmacen>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getRevisionAlmacen", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            RevsAlmacen.Add(new RevisionAlmacen()
                            {
                                IdformAlmacen = Convert.ToInt32(dr["IdformAlmacen"]),
                                Vin = dr["Vin"].ToString(),
                                Marca = dr["Marca"].ToString(),
                                Modelo = dr["Modelo"].ToString(),
                                Color = dr["Color"].ToString(),
                                CostoVehiculo = Convert.ToInt32(dr["CostoVehiculo"]),
                                AnioVehiculo = Convert.ToInt32(dr["AnioVehiculo"]),
                                DniDueno = Convert.ToInt32(dr["Dni_Dueno"]),
                                Placa = Convert.ToInt32(dr["Placa"]),
                                EstadoOp = dr["EstadoOp"].ToString(),
                            });
                        }
                    }
                    return RevsAlmacen;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    throw;
                }
            }
        }

        public static async Task<RevisionAlmacen> ReadOne(int IdformAlmacen)
        {
            RevisionAlmacen RevAlmacen = new RevisionAlmacen();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getSingleRevisionAlmacen ", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdformAlmacen", IdformAlmacen);

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            RevAlmacen = new RevisionAlmacen()
                            {
                                IdformAlmacen = Convert.ToInt32(dr["IdformAlmacen"]),
                                Vin = dr["Vin"].ToString(),
                                Marca = dr["Marca"].ToString(),
                                Modelo = dr["Modelo"].ToString(),
                                Color = dr["Color"].ToString(),
                                CostoVehiculo = Convert.ToInt32(dr["CostoVehiculo"]),
                                AnioVehiculo = Convert.ToInt32(dr["AnioVehiculo"]),
                                DniDueno = Convert.ToInt32(dr["Dni_Dueno"]),
                                Placa = Convert.ToInt32(dr["Placa"]),
                                EstadoOp = dr["EstadoOp"].ToString(),
                            };
                        }
                    }
                    return RevAlmacen;
                }
                catch (Exception e)
                {
                    return RevAlmacen;
                }
            }
        }

        public static async Task<bool> Delete(int IdformAlmacen)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_deleteRevisionAlmacen", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdformAlmacen", IdformAlmacen);

                try
                {
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    return true; // Devuelve true si la eliminación tiene éxito
                }
                catch (SqlException sqlEx)
                {
                    // Captura excepciones específicas de SQL y registra el mensaje de error
                    Console.WriteLine("Error de SQL al intentar eliminar la cotizacion: " + sqlEx.Message);
                    return false; // Devuelve false en caso de error
                }
                catch (Exception ex)
                {
                    // Captura cualquier otra excepción y registra el mensaje de error
                    Console.WriteLine("Error al intentar eliminar la cotizacion: " + ex.Message);
                    return false; // Devuelve false en caso de error
                }
            }
        }

    }
}
