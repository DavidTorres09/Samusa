import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCardCliente';
import TicketClientModal from './TicketClienteModal';


const TicketCliente = () => {
    const [tickets, setTickets] = useState([]);
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);

    useEffect(() => {
        fetch('https://localhost:7189/api/samusa/Ticket/listar')
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error fetching tickets:', error));
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
                    className="mb-6 text-white font-bold py-2 px-4 rounded add-btn"
                    onClick={handleNewTicket}
                >
                    Añadir consulta
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-6">
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
