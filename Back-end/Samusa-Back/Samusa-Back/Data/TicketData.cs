﻿using Microsoft.Data.SqlClient;
using System.Data;
using Samusa_Back.Models;

namespace Samusa_Back.Data
{
    public class TicketData
    {
        public static async Task<bool> Create(Ticket ticket)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("InsertTicket", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Estado", ticket.Estado);
                cmd.Parameters.AddWithValue("@Prioridad", ticket.Prioridad);
                cmd.Parameters.AddWithValue("@Descripcion", ticket.Descripcion);
                cmd.Parameters.AddWithValue("@IDCliente", ticket.IDCliente);
                cmd.Parameters.AddWithValue("@IDColaborador", ticket.IDColaborador);

                try
                {
                    await connection.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    return false;
                }
            }
        }

        public static async Task<List<TicketColaborador>> GetByClient(int clientID)
        {
            List<TicketColaborador> tickets = new List<TicketColaborador>();

            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("ViewTicketsByClient", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IDCliente", clientID);

                try
                {
                    await connection.OpenAsync();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            TicketColaborador ticket = new TicketColaborador
                            {
                                TicketID = reader.GetInt32(0),
                                Estado = reader.GetString(1),
                                Prioridad = reader.GetString(2),
                                Descripcion = reader.GetString(3),
                                dniColaborador = reader.GetInt32(4)
                            };
                            tickets.Add(ticket);
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                }
            }
            return tickets;
        }



        public static async Task<List<ViewTicket>> Read()
        {
            List<ViewTicket> tickets = new List<ViewTicket>();

            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("ViewTickets", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await connection.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync()) {
                        
                        while (reader.Read())
                        {
                            tickets.Add( new ViewTicket()
                            {
                                ticketID = Convert.ToInt32(reader["TicketID"]),
                                estado = reader["Estado"].ToString(),
                                prioridad = reader["Prioridad"].ToString(),
                                descripcion = reader["Descripcion"].ToString(),
                                dniCliente = reader["DNI_CLIENTE"].ToString(),
                                dniColaborador = reader["DNI_COLABORADOR"].ToString()
                            });
                        }
                    } 
                    return tickets;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                }
            }
            return tickets;
        }




        public static async Task<bool> Update(UpdateTicket ticket)
        {
            using (SqlConnection connection = new SqlConnection(Connection.connectionString))
            {
                SqlCommand cmd = new SqlCommand("EditTicket", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TicketID", ticket.ticketID);
                cmd.Parameters.AddWithValue("@Estado", ticket.estado);
                cmd.Parameters.AddWithValue("@Prioridad", ticket.prioridad);
                cmd.Parameters.AddWithValue("@Descripcion", ticket.descripcion);

                try
                {
                    await connection.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                    return false;
                }
            }
        }

        public static async Task<bool> Delete(int ticketID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(Connection.connectionString))
                {
                    await connection.OpenAsync();

                    using (SqlCommand cmd = connection.CreateCommand())
                    {
                        cmd.CommandText = "DeleteTicket";
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@TicketID", ticketID);

                        int rowsAffected = await cmd.ExecuteNonQueryAsync();

                        return rowsAffected > 0;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e.Message}");
                return false;
            }
        }

    }
}
