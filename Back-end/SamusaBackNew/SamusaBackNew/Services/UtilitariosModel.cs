using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SamusaBackNew.Interfaces;
using System.Security.Cryptography;
using System.Net.Mail;

namespace SamusaBackNew.Models
{
    public class UtilitariosModel(IConfiguration _configuration) : IUtilitariosModel
    {
        string secretKey = _configuration.GetSection("settings:SecretKey").Value ?? string.Empty;

        public string GenerarToken(string dni)
        {
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("Dni", dni));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(25),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string Encriptar(string texto)
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = DerivarClave(secretKey, 32);
                aes.IV = iv;
                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter(cryptoStream))
                        {
                            streamWriter.Write(texto);
                        }
                    }
                    array = memoryStream.ToArray();
                }
            }
            return Convert.ToBase64String(array);
        }

        public string Desencriptar(string texto)
        {
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(texto);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(secretKey);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader(cryptoStream))
                        {
                            return streamReader.ReadToEnd();
                        }
                    }
                }
            }
        }

        private byte[] DerivarClave(string clave, int keySizeInBytes)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] claveBytes = Encoding.UTF8.GetBytes(clave);
                byte[] hash = sha256.ComputeHash(claveBytes);
                Array.Resize(ref hash, keySizeInBytes);

                return hash;
            }
        }

        public string GenerarNuevaContrasenna()
        {
            int length = 8;
            const string valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        public void EnviarCorreo(string Destinatario, string Asunto, string Mensaje)
        {
            string correoSMTP = _configuration.GetSection("settings:correoSMTP").Value!;
            string claveSMTP = _configuration.GetSection("settings:claveSMTP").Value!;

            MailMessage msg = new MailMessage();
            msg.To.Add(new MailAddress(Destinatario));
            msg.From = new MailAddress(correoSMTP);
            msg.Subject = Asunto;
            msg.Body = Mensaje;
            msg.IsBodyHtml = true;

            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(correoSMTP, claveSMTP);
            client.Port = 587;
            client.Host = "smtp.office365.com";
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Send(msg);
        }
    }
}
