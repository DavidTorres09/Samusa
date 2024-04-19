using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class ImportacionesData
    {

        public static async Task<bool> Create(ImportacionesPersonaREVS importaciones)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_addImportacion", connection);
                cmd.CommandType = CommandType.StoredProcedure;


                cmd.Parameters.AddWithValue("@IDImpSeguimiento", importaciones.IdimpSeguimiento);
                cmd.Parameters.AddWithValue("@ID_DNI", importaciones.IdDni);
                cmd.Parameters.AddWithValue("@IDRevVehiculo", importaciones.IDRevVehiculo);
                cmd.Parameters.AddWithValue("@IDRevContenedor", importaciones.IDRevContenedor);
                cmd.Parameters.AddWithValue("@FechaInicio", importaciones.FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFinalizacion", importaciones.FechaFinalizacion);
                cmd.Parameters.AddWithValue("@FechaEsperada", importaciones.FechaEsperada);
                cmd.Parameters.AddWithValue("@Prioridad", importaciones.Prioridad);
                cmd.Parameters.AddWithValue("@Descripcion", importaciones.Descripcion);

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

        public static async Task<bool> Update(ImportacionesPersonaREVS importaciones)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_modifyImportacion", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@IDImpSeguimiento", importaciones.IdimpSeguimiento);
                cmd.Parameters.AddWithValue("@newID_DNI", importaciones.IdDni);
                cmd.Parameters.AddWithValue("@newIDRevVehiculo", importaciones.IDRevVehiculo);
                cmd.Parameters.AddWithValue("@newIDRevContenedor", importaciones.IDRevContenedor);
                cmd.Parameters.AddWithValue("@newFechaInicio", importaciones.FechaInicio);
                cmd.Parameters.AddWithValue("@newFechaFinalizacion", importaciones.FechaFinalizacion);
                cmd.Parameters.AddWithValue("@newFechaEsperada", importaciones.FechaEsperada);
                cmd.Parameters.AddWithValue("@newPrioridad", importaciones.Prioridad);
                cmd.Parameters.AddWithValue("@newDescripcion", importaciones.Descripcion);

                try
                {
                    await connection.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
                catch (SqlException sqlEx)
                {
                    Console.WriteLine($"Error de SQL: {sqlEx.Message}");
                    return false;
                }
            }
        }

        public static async Task<List<ImportacionesPersonaREVS>> Read()
        {
            List<ImportacionesPersonaREVS> imports = new List<ImportacionesPersonaREVS>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getImportaciones", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await connection.OpenAsync();

                    using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                    {
                        while (dr.Read())
                        {
                            imports.Add(new ImportacionesPersonaREVS()
                            {
                                IdimpSeguimiento = Convert.ToInt32(dr["IDImpSeguimiento"]),
                                IdDni = Convert.ToInt32(dr["ID_DNI"]),
                                IDRevVehiculo = dr["IDRevVehiculo"] != DBNull.Value ? Convert.ToInt32(dr["IDRevVehiculo"]) : (int?)null,
                                IDRevContenedor = dr["IDRevContenedor"] != DBNull.Value ? Convert.ToInt32(dr["IDRevContenedor"]) : (int?)null,
                                FechaInicio = dr["FechaInicio"].ToString(),
                                FechaFinalizacion = dr["FechaFinalizacion"] != DBNull.Value ? dr["FechaFinalizacion"].ToString() : null,
                                FechaEsperada = dr["FechaEsperada"] != DBNull.Value ? dr["FechaEsperada"].ToString() : null,
                                Prioridad = dr["Prioridad"].ToString(),
                                Descripcion = dr["Descripcion"] != DBNull.Value ? dr["Descripcion"].ToString() : null
                            });
                        }
                    }
                    return imports;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    throw;
                }
            }
        }

        public static async Task<ImportacionesPersonaREVS> ReadOne(int IdimpSeguimiento)
        {
            ImportacionesPersonaREVS import = new ImportacionesPersonaREVS();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getSingleImportacion", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IDImpSeguimiento", IdimpSeguimiento);

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            import = new ImportacionesPersonaREVS()
                            {
                                IdimpSeguimiento = Convert.ToInt32(dr["IDImpSeguimiento"]),
                                IdDni = Convert.ToInt32(dr["ID_DNI"]),
                                IDRevVehiculo = dr["IDRevVehiculo"] != DBNull.Value ? Convert.ToInt32(dr["IDRevVehiculo"]) : (int?)null,
                                IDRevContenedor = dr["IDRevContenedor"] != DBNull.Value ? Convert.ToInt32(dr["IDRevContenedor"]) : (int?)null,
                                FechaInicio = dr["FechaInicio"].ToString(),
                                FechaFinalizacion = dr["FechaFinalizacion"] != DBNull.Value ? dr["FechaFinalizacion"].ToString() : null,
                                FechaEsperada = dr["FechaEsperada"] != DBNull.Value ? dr["FechaEsperada"].ToString() : null,
                                Prioridad = dr["Prioridad"].ToString(),
                                Descripcion = dr["Descripcion"] != DBNull.Value ? dr["Descripcion"].ToString() : null
                            };
                        }
                    }
                    return import;
                }
                catch (Exception e)
                {
                    return import;
                }
            }
        }

        public static async Task<bool> Delete(int IdimpSeguimiento)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_deleteImportacion", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IDImpSeguimiento", IdimpSeguimiento);

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
