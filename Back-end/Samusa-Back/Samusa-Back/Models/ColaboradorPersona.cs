﻿namespace Samusa_Back.Models
{
    public class ColaboradorPersona
    {
        public int DNI { get; set; }
        public string Nombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public bool EsNacional { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string FechaIngreso { get; set; }
        public int IdRol { get; set; }
    }
}
