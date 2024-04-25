namespace SamusaBackNew.Entities
{
    public class Tracking
    {
        public int Id { get; set; }
        public int ImpSeguimientoId { get; set; }
        public int ExpSeguimientoId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinalizacion { get; set; }
        public string? Estado { get; set; }
        public string? VIN { get; set; }
        public string? Marca { get; set; }
        public string? Modelo { get; set; }
        public string? Color { get; set; }
        public string? Extras { get; set; }
        public string? EstadoOp { get; set; }
        public string? Naviera { get; set; }
        public string? PuertoOrigen { get; set; }
        public string? PuertoDestino { get; set; }
        public string? Transportista { get; set; }
    }

    public class TrackingRespuesta
    {
        public TrackingRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public Tracking? Dato { get; set; }

        public List<Tracking>? Datos { get; set; }


    }
}
