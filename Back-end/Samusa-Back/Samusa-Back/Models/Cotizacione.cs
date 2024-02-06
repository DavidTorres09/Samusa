using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Cotizacione
{
    public int Idcotizacion { get; set; }

    public decimal IdDni { get; set; }

    public decimal Idcolaborador { get; set; }

    public string TipoProducto { get; set; } = null!;

    public string Producto { get; set; } = null!;

    public string PorcentajeImp { get; set; } = null!;

    public string EnlaceRef { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public virtual Persona IdDniNavigation { get; set; } = null!;

    public virtual Colaborador IdcolaboradorNavigation { get; set; } = null!;
}
