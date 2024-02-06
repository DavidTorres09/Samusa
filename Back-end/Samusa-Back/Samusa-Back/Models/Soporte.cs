using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Soporte
{
    public int Idformulario { get; set; }

    public decimal IdDni { get; set; }

    public DateTime FechaInicio { get; set; }

    public DateOnly FechaFinalizacion { get; set; }

    public DateOnly? FechaEsperada { get; set; }

    public string Prioridad { get; set; } = null!;

    public virtual Persona IdDniNavigation { get; set; } = null!;
}
