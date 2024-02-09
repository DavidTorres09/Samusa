using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class PaqueteriasData
    {

        public static async Task<bool> Create(Paqueterium paqueterium)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<bool> Update(Paqueterium paqueterium)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<List<Paqueterium>> Read()
        {
            List<Paqueterium> packages = new List<Paqueterium>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return packages;
            }
        }

        public static async Task<Paqueterium> ReadOne(int IdpaqSeguimiento)
        {
            Paqueterium package = new Paqueterium();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return package;
            }
        }

        public static async Task<bool> Delete(int IdpaqSeguimiento)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

    }
}
