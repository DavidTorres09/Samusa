namespace SamusaBackNew.Entities
{
    public class Alarma
    {
        public int Id { get; set; }
        public string? Descripcion { get; set; } 
    }

    public class AlarmaRespuesta
    {
        public AlarmaRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }
        public List<Alarma>? Datos { get; set; }
    }
}
