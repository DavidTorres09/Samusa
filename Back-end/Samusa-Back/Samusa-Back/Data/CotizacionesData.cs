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
                return true;
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
