import React, { useState, useEffect } from "react";
import CardsTickets from "./TicketCardCliente";
import TicketClientModal from "./TicketClienteModal";

const TicketCliente = () => {
  const [tickets, setTickets] = useState([]);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const agentId = sessionStorage.getItem("id");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch("https://localhost:7189/api/samusa/Ticket/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo && data.codigo === "-1") {
          setErrorMessage(data.mensaje);
          setTickets([]);
        } else if (data.length === 0) {
          setErrorMessage("No se encontraron tickets en la base de datos.");
        } else {
          // Filtra los tickets para que solo incluya aquellos que pertenecen al agente actual
          const filteredTickets = data.filter(
            (ticket) => ticket.clienteId === parseInt(agentId)
          );
          setTickets(filteredTickets);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.error("Error fetching alarmas:", error);
        setErrorMessage("Error al cargar las alarmas.");
      });
  }, []);

  const handleNewTicket = () => {
    setShowNewTicketModal(true);
  };

  const handleCloseModal = () => {
    setShowNewTicketModal(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-white font-bold my-4 text-center">
          Mis Consultas
        </h1>
        <button
          className="mb-6 text-white font-bold py-2 px-4 rounded add-btn"
          onClick={handleNewTicket}
        >
          Añadir consulta
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-6">
          {tickets.map((ticket) => (
            <CardsTickets key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
      {showNewTicketModal && <TicketClientModal onClose={handleCloseModal} />}
    </>
  );
};

export default TicketCliente;
