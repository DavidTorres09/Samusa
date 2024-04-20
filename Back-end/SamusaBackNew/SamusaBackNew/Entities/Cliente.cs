namespace SamusaBackNew.Entities
{
    public class Cliente
    {
        public int Id { get; set; } = 0;
        public string? Direccion { get; set; } = string.Empty;
        public string? Dni { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty; 
        public string? Telefono { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public bool EsNacional { get; set; } = true;
        public string? Usuario { get; set; } = string.Empty;
        public string? Contrasenna { get; set; } = string.Empty;
        public string? ContrasennaTemporal { get; set; } = string.Empty;
        public int RolId { get; set; }
        public string? NombreRol { get; set; } = string.Empty;
        public string? Foto { get; set; }
        public bool Estado { get; set; } = true;
        public bool EsTEmporal { get; set; }
        public string Token { get; set; } = string.Empty;
    }

    public class ClienteRespuesta
    {
        public ClienteRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public Cliente? Dato { get; set; }

        public List<Cliente>? Datos { get; set; }

    }
}


