namespace SamusaBackNew.Entities
{
    public class RevisionVehiculo
    {
        public int Id { get; set; }
        public string? VIN { get; set; }
        public string? Marca { get; set; }
        public string? Modelo { get; set; }
        public string? Extras { get; set; }
        public string? Color { get; set; }
        public decimal CostoVehiculo { get; set; }
        public string? AnnoVehiculo { get; set; }
        public string? DniDuenno { get; set; }
        public string? Placa { get; set; }
        public string? EstadoOP { get; set; }
    }

    public class RevisionVehiculoRespuesta
    {
        public RevisionVehiculoRespuesta()
        {
            Codigo = "0";
            Mensaje = string.Empty;
        }
        public string? Codigo { get; set; }
        public string? Mensaje { get; set; }

        public RevisionVehiculo? Dato { get; set; }

        public List<RevisionVehiculo>? Datos { get; set; }

    }
}
