using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Colaborador
{
    public decimal Idcolaborador { get; set; }

    public DateOnly FechaIngreso { get; set; }

    public string Puesto { get; set; } = null!;

    public decimal DniPersona { get; set; }

    public virtual ICollection<Cotizacione> Cotizaciones { get; set; } = new List<Cotizacione>();

    public virtual Persona DniPersonaNavigation { get; set; } = null!;
}
