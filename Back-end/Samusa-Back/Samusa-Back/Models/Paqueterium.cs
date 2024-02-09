using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Paqueterium
{
    public int IdpaqSeguimiento { get; set; }

    public int IdDni { get; set; }

    public string NumCasillero { get; set; } = null!;

    public string NumTracking { get; set; } = null!;

    public string TipoProducto { get; set; } = null!;

    public string DirectOrigen { get; set; } = null!;

    public string DirectDestino { get; set; } = null!;

    public DateTime FechaRegistro { get; set; }

    public DateTime? FechaEsperada { get; set; }

    public virtual Persona IdDniNavigation { get; set; } = null!;
}
