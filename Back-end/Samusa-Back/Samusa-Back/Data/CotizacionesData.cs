using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

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

                
                cmd.Parameters.AddWithValue("@IdCotizacion", cotizacione.Idcotizacion);
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
                return true;
            }
        }

        public static async Task<List<Cotizacione>> Read()
        {
            List<Cotizacione> quotations = new List<Cotizacione>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return quotations;
            }
        }

        public static async Task<Cotizacione> ReadOne(int Idcotizacion)
        {
            Cotizacione quotation = new Cotizacione();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return quotation;
            }
        }

        public static async Task<bool> Delete(int Idcotizacion)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

    }
}
