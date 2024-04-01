namespace SamusaBackNew.Entities
{
    public class Colaborador
    {
        public int Idcolaborador { get; set; }
        public string Direccion { get; set; } = string.Empty;
        public int DniPersona { get; set; }
        public int idPersona { get; set; } = 0;
    }

    public class ColaboradorPersona
    {
        public int DNI { get; set; }
        public string? Nombre { get; set; } = string.Empty;
        public string? PrimerApellido { get; set; } = string.Empty;
        public string? SegundoApellido { get; set; } = string.Empty;
        public string? Telefono { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public bool EsNacional { get; set; } = true;
        public string? Usuario { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public string? Direccion { get; set; } = string.Empty;
        public int? IdRol { get; set; } = 1;
        public byte[]? Foto { get; set; } = null;
    }

    public class VistaColaboradorPersona
    {
        public int IDCOLABORADOR { get; set; } = 0;
        public int DNI { get; set; }
        public string? Nombre { get; set; } = string.Empty;
        public string? PrimerApellido { get; set; } = string.Empty;
        public string? SegundoApellido { get; set; } = string.Empty;
        public string? Telefono { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public bool EsNacional { get; set; } = true;
        public string? Usuario { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public string? Direccion { get; set; } = string.Empty;
        public string? Rol { get; set; }
        public byte[]? Foto { get; set; } = null;
    }
}
