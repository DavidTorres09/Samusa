namespace Samusa_Back.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public string? Estado { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
        public int IDCliente { get; set; }
        public int IDColaborador { get; set; }
    }

    public class ViewTicket
    {
        public int ticketID { get; set; }
        public string? estado { get; set; }
        public string? prioridad { get; set; }
        public string? descripcion { get; set; }
        public string? dniCliente { get; set; }
        public string? dniColaborador { get; set; }
    }

    public class TicketColaborador
    {
        public int TicketID { get; set; }
        public string? Estado { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
        public int dniColaborador { get; set; }
    }

    public class UpdateTicket
    {
        public int ticketID { get; set; }
        public string? estado { get; set; }
        public string? prioridad { get; set; }
        public string? descripcion { get; set; }
    }
}

