using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Net;

namespace Samusa_Back.Data
{
    public class CotizacionesData
    {

        public static async Task<bool> Create(Cotizacione cotizacione)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_addCotizaciones", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                
                cmd.Parameters.AddWithValue("@dni", cotizacione.IdDni);
                cmd.Parameters.AddWithValue("@Idcolaborador", cotizacione.Idcolaborador);
                cmd.Parameters.AddWithValue("@TipoProducto", cotizacione.TipoProducto);
                cmd.Parameters.AddWithValue("@Producto", cotizacione.Producto);
                cmd.Parameters.AddWithValue("@PorcentajeImp", cotizacione.PorcentajeImp);
                cmd.Parameters.AddWithValue("@EnlaceRef", cotizacione.EnlaceRef);
                cmd.Parameters.AddWithValue("@fechaCrea", cotizacione.FechaCreacion);

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

        public static async Task<bool> Update(Cotizacione cotizacione)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_modifyCotizaciones", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@IdCotizacion", cotizacione.Idcotizacion);
                cmd.Parameters.AddWithValue("@newTipoProducto", cotizacione.TipoProducto);
                cmd.Parameters.AddWithValue("@newProducto", cotizacione.Producto);
                cmd.Parameters.AddWithValue("@newPorcentajeImp", cotizacione.PorcentajeImp);
                cmd.Parameters.AddWithValue("@newEnlaceRef", cotizacione.EnlaceRef);

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

        public static async Task<List<Cotizacione>> Read()
        {
            List<Cotizacione> quotations = new List<Cotizacione>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getCotizaciones", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await connection.OpenAsync();

                    using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                    {
                        while (dr.Read())
                        {
                            quotations.Add(new Cotizacione()
                            {
                                Idcotizacion = Convert.ToInt32(dr["IdCotizacion"]),
                                TipoProducto = dr["TipoProducto"].ToString(),
                                Producto = dr["Producto"].ToString(),
                                PorcentajeImp = Convert.ToInt32(dr["PorcentajeImp"]),
                                EnlaceRef = dr["EnlaceRef"].ToString(),
                                FechaCreacion = Convert.ToDateTime(dr["FechaCreacion"])
                            });
                        }
                    }
                    return quotations;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    throw;
                }
            }
        }

        public static async Task<Cotizacione> ReadOne(int Idcotizacion)
        {
            Cotizacione quotation = new Cotizacione();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_getSingleCotizaciones", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdCotizacion", Idcotizacion);

                try
                {
                    connection.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            quotation = new Cotizacione()
                            {
                                Idcotizacion = Convert.ToInt32(dr["IdCotizacion"]),
                                TipoProducto = dr["TipoProducto"].ToString(),
                                Producto = dr["Producto"].ToString(),
                                PorcentajeImp = Convert.ToInt32(dr["PorcentajeImp"]),
                                EnlaceRef = dr["EnlaceRef"].ToString(),
                                FechaCreacion = Convert.ToDateTime(dr["FechaCreacion"])
                            };
                        }
                    }
                    return quotation;
                }
                catch (Exception e)
                {
                    return quotation;
                }
            }
        }

        public static async Task<bool> Delete(int Idcotizacion)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("usp_deleteCotizaciones", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IdCotizacion", Idcotizacion);

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
