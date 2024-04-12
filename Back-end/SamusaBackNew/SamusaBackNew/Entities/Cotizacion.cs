namespace SamusaBackNew.Entities
{
    public class Cotizacion
    {
        public int Id { get; set; }
        public int ColaboradorId { get; set; }
        public string? DniCliente { get; set; }  
        public string? TipoProducto { get; set; }
        public string? Producto { get; set; }
        public float PorcentajeIMP { get; set; }
        public string? EnlaceRef { get; set; }
        public DateTime FechaCreacion { get; set; }
    }

    public class CotizacionRespuesta
    {
        public CotizacionRespuesta()
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
