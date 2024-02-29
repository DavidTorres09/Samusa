using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Cotizacione
{
    public int Idcotizacion { get; set; }

    public int IdDni { get; set; }

    public int Idcolaborador { get; set; }

    public string TipoProducto { get; set; } = null!;

    public string Producto { get; set; } = null!;

    public int PorcentajeImp { get; set; }

    public string EnlaceRef { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }
}
