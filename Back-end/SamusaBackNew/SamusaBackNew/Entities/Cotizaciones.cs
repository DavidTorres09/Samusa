namespace SamusaBackNew.Entities
{
    public class Cotizaciones
    {
        public int ID_DNI { get; set; }
        public int IDColaborador { get; set; }
        public string? TipoProducto { get; set; }
        public string? Producto { get; set; }
        public int PorcentajeIMP { get; set; }
        public string? EnlaceRef { get; set; }
        public DateTime FechaCreacion { get; set; }
    }

    public class VistaCotizaciones
    {
        public int IDCotizacion { get; set; }
        public int ID_DNI { get; set; }
        public int IDColaborador { get; set; }
        public string? TipoProducto { get; set; }
        public string? Producto { get; set; }
        public int PorcentajeIMP { get; set; }
        public string? EnlaceRef { get; set; }
        public DateTime FechaCreacion { get; set; }
    }

}
