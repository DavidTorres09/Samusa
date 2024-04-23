import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCardCliente';
import TicketClientModal from './TicketClienteModal';

const TicketCliente = () => {
    const [tickets, setTickets] = useState([]);
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);

    useEffect(() => {
        fetch('https://localhost:7189/api/samusa/Ticket/listar')
            .then(response => response.json())
            .then(data => {
                // Verificar si la respuesta incluye un código de error
                if (data.codigo && data.codigo === "-1") {
                    setErrorMessage(data.mensaje);
                    setTickets([]); // Limpia los datos existentes
                } else if (data.length === 0) {
                    setErrorMessage("No se encontraron TKKS en la base de datos.");
                } else {
                    setTickets(data);
                    setErrorMessage(""); // Limpia el mensaje de error
                }
            })
            .catch(error => {
                console.error('Error fetching alarmas:', error);
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
                <h1 className="text-3xl text-white font-bold my-4 text-center">Mis Consultas</h1>
                <button
                    className="mb-4 text-white font-bold py-2 px-4 rounded add-btn"
                    onClick={handleNewTicket}
                >
                    Añadir consulta
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tickets.map(ticket => ( 
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            </div>
            {showNewTicketModal && <TicketClientModal onClose={handleCloseModal} />}
        </>
    );
};

export default TicketCliente;
