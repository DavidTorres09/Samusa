using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class FormularioAtencion
{
    public int IdformularioAtencion { get; set; }

    public int Idformulario { get; set; }

    public string Vinvehiculo { get; set; } = null!;

    public string EstadoAtencion { get; set; } = null!;

    public string Detalle { get; set; } = null!;
}
