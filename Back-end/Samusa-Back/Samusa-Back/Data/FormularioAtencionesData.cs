using Samusa_Back.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Data
{
    public class FormularioAtencionesData
    {
        public static async Task<bool> Create(FormularioAtencion formulario)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<bool> Update(FormularioAtencion formulario)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

        public static async Task<List<FormularioAtencion>> Read()
        {
            List<FormularioAtencion> formsA = new List<FormularioAtencion>();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return formsA;
            }
        }

        public static async Task<FormularioAtencion> ReadOne(int IdformularioAtencion)
        {
            FormularioAtencion FormA = new FormularioAtencion();
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return FormA;
            }
        }

        public static async Task<bool> Delete(int IdformularioAtencion)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                return true;
            }
        }

    }
}
