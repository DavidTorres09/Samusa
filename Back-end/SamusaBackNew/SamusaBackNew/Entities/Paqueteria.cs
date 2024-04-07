namespace SamusaBackNew.Entities
{
    public class Paqueteria
    {
        public int ID_DNI { get; set; }
        public string? NumCasillero { get; set; }
        public string? NumTracking { get; set; }
        public string? TipoProducto { get; set; }
        public string? DirectOrigen { get; set; }
        public string? DirectDestino { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaEsperada { get; set; }
    }

    public class PaqueteriaVista
    {
        public int IDPaqSeguimiento { get; set; }
        public int ID_DNI { get; set; }
        public string? NumCasillero { get; set; }
        public string? NumTracking { get; set; }
        public string? TipoProducto { get; set; }
        public string? DirectOrigen { get; set; }
        public string? DirectDestino { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaEsperada { get; set; }
    }
}
