const TicketCard = ({ ticket }) => {
    return (
        <div className="card bg-white shadow-xl rounded p-4">
            <h2 className="text-xl font-bold">{ticket.descripcion}</h2>
            <p>{ticket.estado}</p>
            <p>Prioridad: {ticket.prioridad}</p>
            <div className="text-right">
                <span className="text-sm text-gray-600">Seguimiento #{ticket.id}</span>
            </div>
        </div>
    );
};

export default TicketCard;
