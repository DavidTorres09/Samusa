﻿using Microsoft.AspNetCore.Mvc;
using Samusa_Back.Data;
using Samusa_Back.Models;
using System.Data.SqlTypes;
using System.Text;
using System.Net.Mail;
using System.Configuration;
using System.Net;
using Microsoft.Data.SqlClient;

namespace Samusa_Back.Controllers
{
    

    public class Login
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    [ApiController]
    [Route("api/samusa/cliente")]
    public class ClienteController : ControllerBase
    {

        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> ViewClientes()
        {
            var clientes = ClienteData.Read();

            if (clientes != null)
            {
                return Ok( clientes );
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al obtener la lista de clientes." });
            }
        }

        [HttpGet]
        [Route("listarUnico")]
        public async Task<IActionResult> viewClienteById(int dni)
        {
            var cliente =  ClienteData.ReadOne(dni);

            if (cliente != null)
            {
                return Ok(cliente);
            }
            else
            {
                return NotFound(new { Status = 404, Message = "Cliente no encontrado" });
            }
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> saveCliente([FromBody]ClientePersona persona)
        {
        
            var confirmation =  ClienteData.Create(persona);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return NotFound(new { Status = 400, Message = "Error al guardar el cliente." });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> deleteCliente(int dni)
        {
            var confirmation =  ClienteData.Delete(dni);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al borrar el cliente." });
            }
        }

        [HttpPut]
        [Route("modificar")]
        public async Task<IActionResult> modifyCliente([FromBody]ClientePersona cliente)
        {

            var confirmation = ClienteData.Update(cliente);
            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return BadRequest(new { Status = 400, Message = "Error al modificar el cliente." });
            }
        }

        [HttpPost]
        [Route("RecuperarClave")]

        public async Task<IActionResult> RecuperarPassCliente([FromBody] ClientePersona cliente)
        
        {
            var confirmation = ClienteData.Update(cliente);
            
            {
            
                if (cliente != null)
                {
                    string pass = CreatePassword();
                    string mensaje = "Estimado(a)" + cliente.Nombre + ". Se ha generado la siguiente contraseña temporal: " + pass;
                    SendEmail(cliente.Email, "Recuperar Contraseña", mensaje);


                    cliente.Password = pass;
                }


                return BadRequest(new { Status = 400, Message = "Error al recuperar password." }); ;

            }
        }

        private string CreatePassword()
        {
            int lenght = 10;
            const string valid = "abcdefjhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < lenght--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        private void SendEmail(string destinatario, string asunto, string mensaje)
        {
            SmtpClient mySmtpClient = new SmtpClient("outlook.office365.com");
            string CuentaEmail = "ProyectoLN@hotmail.com";
            string PasswordEmail = "LN292929!";

            MailMessage msg = new MailMessage();
            msg.To.Add(new MailAddress(destinatario));
            msg.From = new MailAddress(CuentaEmail);
            msg.Subject = asunto;
            msg.Body = mensaje;
            msg.IsBodyHtml = true;

            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(CuentaEmail, PasswordEmail);
            client.Port = 587;
            client.Host = "smtp.office365.com";
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Send(msg);

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Login login)

        {
            string msg = string.Empty;

            var confirmation = ClienteData.Login(login.username, login.password);

            if (confirmation)
            {
                return Ok(new { Status = 200 });
            }
            else
            {
                return NotFound(new { Status = 400, Message = "No se puede ingresar" });
            }

        }


        [HttpGet]
        [Route("Login")]

        public async Task<IActionResult> LoginGet( String user, String password)
        {
            var cliente = await ClienteData.readTwo(user, password);
            if(cliente != null)
            {

                return Ok(cliente);
            }
            else
            {

                return NotFound(new { Status = 404, message = "Usuario no encontrado" });
            }


        }
    }
}
