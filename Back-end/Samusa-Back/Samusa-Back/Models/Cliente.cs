using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Cliente
{
    public int Idcliente { get; set; }

    public string Direccion { get; set; } = null!;

    public int DniPersona { get; set; }

    public virtual Persona DniPersonaNavigation { get; set; } = null!;
}
