namespace SamusaBackNew.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public string? Estado { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
        public int ClienteId { get; set; }
        public int ColaboradorId { get; set; }
    }

    public class TicketRespuesta
    {
        public TicketRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public Ticket? Dato { get; set; }

        public List<Ticket>? Datos { get; set; }

    }
}
