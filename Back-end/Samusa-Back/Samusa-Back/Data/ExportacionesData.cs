using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class ExportacionesData
    {
        public static async Task<bool> Create(Exportacione exportacione)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<bool> Update(Exportacione exportacione)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<List<Exportacione>> Read()
        {
            List<Exportacione> exports = new List<Exportacione>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return exports;
            }
        }

        public static async Task<Exportacione> ReadOne(int IdexpSeguimiento)
        {
            Exportacione export = new Exportacione();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return export;
            }
        }

        public static async Task<bool> Delete(int IdexpSeguimiento)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }
    }
}
