namespace Samusa_Back.Models
{
    public class ImportacionesPersonaREVS
    {
        public int IdimpSeguimiento { get; set; }

        public int IdDni { get; set; }

        public int? IDRevVehiculo { get; set; }

        public int? IDRevContenedor { get; set; }

        public string FechaInicio { get; set; }

        public string? FechaFinalizacion { get; set; }

        public string? FechaEsperada { get; set; }

        public string Prioridad { get; set; } = null!;

        public string? Descripcion { get; set; }

    }
}
