namespace SamusaBackNew.Interfaces
{
    public interface IUtilitariosModel
    {
        public string GenerarToken(string cedula);
        public string GenerarNuevaContrasenna();
        public string Encriptar(string texto);
        public string Desencriptar(string texto);
        void EnviarCorreo(string correo, string asunto, string mensaje);
    }
}
