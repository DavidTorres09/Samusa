using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class RevisionContenedor
{
    public int IdrevCont { get; set; }

    public string PuertoOrigen { get; set; } = null!;

    public string PuertoDestino { get; set; } = null!;

    public string Naviera { get; set; } = null!;

    public string Transportista { get; set; } = null!;

    public int DniDueno { get; set; }

    public string Estado { get; set; } = null!;
}
