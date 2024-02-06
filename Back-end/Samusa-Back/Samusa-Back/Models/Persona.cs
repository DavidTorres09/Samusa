﻿using System;
using System.Collections.Generic;

namespace Samusa_Back.Models;

public partial class Persona
{
    public decimal Dni { get; set; }

    public string Nombre { get; set; } = null!;

    public string PrimerApellido { get; set; } = null!;

    public string? SegundoApellido { get; set; }

    public decimal? Telefono { get; set; }

    public string Email { get; set; } = null!;

    public bool EsNacional { get; set; }

    public virtual ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();

    public virtual ICollection<Colaborador> Colaboradors { get; set; } = new List<Colaborador>();

    public virtual ICollection<Cotizacione> Cotizaciones { get; set; } = new List<Cotizacione>();

    public virtual ICollection<Exportacione> Exportaciones { get; set; } = new List<Exportacione>();

    public virtual ICollection<Importacione> Importaciones { get; set; } = new List<Importacione>();

    public virtual ICollection<Paqueterium> Paqueteria { get; set; } = new List<Paqueterium>();

    public virtual ICollection<Soporte> Soportes { get; set; } = new List<Soporte>();
}
