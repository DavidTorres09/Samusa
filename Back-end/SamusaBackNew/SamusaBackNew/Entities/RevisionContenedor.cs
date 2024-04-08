namespace SamusaBackNew.Entities
{
    public class RevisionContenedor
    {
        public int IDExpSeguimiento { get; set; }
        public int ID_DNI { get; set; }
        public int? IDRevVehiculo { get; set; }
        public int? IDRevContenedor { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinalizacion { get; set; }
        public DateTime? FechaEsperada { get; set; }
        public string? Prioridad { get; set; }
        public string? Descripcion { get; set; }
    }
}
