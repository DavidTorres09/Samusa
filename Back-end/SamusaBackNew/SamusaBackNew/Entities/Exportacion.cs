namespace SamusaBackNew.Entities
{
    public class Exportacion
    {
        public int Id { get; set; } = 0;
        public int ExpSeguimientoId { get; set; }
        public int ClienteId { get; set; }
        public string? Dni { get; set; } = string.Empty;
        public int? RevVehiculoId { get; set; }
        public int? RevContenedorId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFinalizacion { get; set; }
        public DateTime? FechaEsperada { get; set; }
        public string? Prioridad { get; set; } = string.Empty;
        public string? Descripcion { get; set; } = string.Empty;
    }

    public class ExportacionRespuesta
    {
        public ExportacionRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public Exportacion? Dato { get; set; }

        public List<Exportacion>? Datos { get; set; }

    }
}
