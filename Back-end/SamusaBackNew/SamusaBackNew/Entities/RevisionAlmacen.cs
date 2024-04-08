namespace SamusaBackNew.Entities
{
    public class RevisionAlmacen
    {
        public int IDFormAlmacen { get; set; }
        public string? VIN { get; set; }
        public string? Marca { get; set; }
        public string? Modelo { get; set; }
        public string? Extras { get; set; }
        public string? Color { get; set; }
        public decimal CostoVehiculo { get; set; }
        public int AnioVehiculo { get; set; }
        public int DNI_Dueno { get; set; }
        public int? Placa { get; set; }
        public string? EstadoOP { get; set; }
    }
}
