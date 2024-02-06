using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Cliente
{
    public decimal Idcliente { get; set; }

    public string Direccion { get; set; } = null!;

    public decimal DniPersona { get; set; }

    public virtual Persona DniPersonaNavigation { get; set; } = null!;
}
