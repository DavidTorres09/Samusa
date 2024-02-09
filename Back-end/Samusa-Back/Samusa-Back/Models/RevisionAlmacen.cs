using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class RevisionAlmacen
{
    public int IdformAlmacen { get; set; }

    public string Vin { get; set; } = null!;

    public string Marca { get; set; } = null!;

    public string Modelo { get; set; } = null!;

    public string Color { get; set; } = null!;

    public decimal CostoVehiculo { get; set; }

    public int AnioVehiculo { get; set; }

    public int DniDueno { get; set; }

    public int? Placa { get; set; }

    public string EstadoOp { get; set; } = null!;
}
