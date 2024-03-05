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
        public int TicketId { get; set; }
        public string? Estado { get; set; }
        public string? Prioridad { get; set; }
        public string? DNI_CLIENTE { get; set; }
        public string? DNI_COLABORADOR { get; set; }
    }

    public class TicketColaborador
    {
        public int TicketId { get; set; }
        public string? Estado { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
        public string? DNI_COLABORADOR { get; set; }
    }
}

