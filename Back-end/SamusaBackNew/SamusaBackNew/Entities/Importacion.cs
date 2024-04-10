namespace SamusaBackNew.Entities
{
    public class Importacion
    {
        public int Id { get; set; } = 0;
        public int ImpSeguimientoId { get; set; }
        public int ClienteId { get; set; }
        public string? Dni { get; set; } = string.Empty;
        public int RevVehiculoId { get; set; }
        public int RevContenedorId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinalizacion { get; set; }
        public DateTime FechaEsperada { get; set; }
        public string? Prioridad { get; set; } = string.Empty;
        public string? Descripcion { get; set; } = string.Empty;
    }

    public class ImportacionRespuesta
    {
        public ImportacionRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public Importacion? Dato { get; set; }

        public List<Importacion>? Datos { get; set; }

    }
}
