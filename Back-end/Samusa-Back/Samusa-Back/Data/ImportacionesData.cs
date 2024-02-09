using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class ImportacionesData
    {

        public static async Task<bool> Create(Importacione importacione)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<bool> Update(Importacione importacione)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<List<Importacione>> Read()
        {
            List<Importacione> imports = new List<Importacione>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return imports;
            }
        }

        public static async Task<Importacione> ReadOne(int IdimpSeguimiento)
        {
            Importacione import = new Importacione();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return import;
            }
        }

        public static async Task<bool> Delete(int IdimpSeguimiento)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

    }
}
