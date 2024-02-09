using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Exportacione
{
    public int IdexpSeguimiento { get; set; }

    public int IdDni { get; set; }

    public DateTime FechaInicio { get; set; }

    public DateTime FechaFinalizacion { get; set; }

    public DateTime? FechaEsperada { get; set; }

    public string Prioridad { get; set; } = null!;

    public virtual Persona IdDniNavigation { get; set; } = null!;
}
