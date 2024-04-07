namespace SamusaBackNew.Entities
{
    public class Ticket
    {
        public int TicketID { get; set; }
        public string? Estado { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
        public int IDCliente { get; set; }
        public int IDColaborador { get; set; }
    }
}
