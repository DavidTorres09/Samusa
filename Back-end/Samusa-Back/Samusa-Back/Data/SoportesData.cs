using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class SoportesData
    {

        public static async Task<bool> Create(Soporte soporte)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<bool> Update(Soporte soporte)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<List<Soporte>> Read()
        {
            List<Soporte> supports = new List<Soporte>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return supports;
            }
        }

        public static async Task<Soporte> ReadOne(int Idformulario)
        {
            Soporte support = new Soporte();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return support;
            }
        }

        public static async Task<bool> Delete(int Idformulario)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

    }
}
