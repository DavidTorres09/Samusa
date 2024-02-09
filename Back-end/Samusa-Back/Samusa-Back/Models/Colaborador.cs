using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Colaborador
{
    public int Idcolaborador { get; set; }

    public DateOnly FechaIngreso { get; set; }

    public int DniPersona { get; set; }

    public virtual ICollection<Cotizacione> Cotizaciones { get; set; } = new List<Cotizacione>();

    public virtual Persona DniPersonaNavigation { get; set; } = null!;
}
