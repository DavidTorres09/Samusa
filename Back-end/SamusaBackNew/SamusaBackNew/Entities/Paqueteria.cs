namespace SamusaBackNew.Entities
{
    public class Paqueteria
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public string? NumCasillero { get; set; }
        public string? NumTracking { get; set; }
        public string? TipoProducto { get; set; }
        public string? DirectOrigen { get; set; }
        public string? DirectDestino { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime FechaEsperada { get; set; }
    }

    public class PaqueteriaRespuesta
    {
        public PaqueteriaRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public Paqueteria? Dato { get; set; }

        public List<Paqueteria>? Datos { get; set; }
    }
}


