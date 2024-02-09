using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class ColaboradoresData
    {

        public static async Task<bool> Create(Colaborador colaborador)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<bool> Update(Colaborador colaborador)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<List<Colaborador>> Read()
        {
            List<Colaborador> employees = new List<Colaborador>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return employees;
            }
        }

        public static async Task<Colaborador> ReadOne(int dni)
        {
            Colaborador employee = new Colaborador();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return employee;
            }
        }

        public static async Task<bool> Delete(int dni)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

    }
}
