namespace SamusaBackNew.Entities
{
    public class RevisionContenedor
    {
        public int Id { get; set; }
        public string? PuertoOrigen { get; set; }
        public string? PuertoDestino { get; set; }
        public string? Naviera { get; set; }
        public string? Transportista { get; set; }
        public string? DniDuenno { get; set; }
        public string? Estado { get; set; }
    }

    public class RevisionContenedorRespuesta
    {
        public RevisionContenedorRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public RevisionContenedor? Dato { get; set; }

        public List<RevisionContenedor>? Datos { get; set; }

    }
}
