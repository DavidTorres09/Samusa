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
                return true;
            }
        }

        public static async Task<bool> Update(RevisionAlmacen revision)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<List<RevisionAlmacen>> Read()
        {
            List<RevisionAlmacen> RevsAlmacen = new List<RevisionAlmacen>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return RevsAlmacen;
            }
        }

        public static async Task<RevisionAlmacen> ReadOne(int IdformAlmacen)
        {
            RevisionAlmacen RevAlmacen = new RevisionAlmacen();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return RevAlmacen;
            }
        }

        public static async Task<bool> Delete(int IdformAlmacen)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

    }
}
