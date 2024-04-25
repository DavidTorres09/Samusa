import React, { useState, useEffect } from 'react';
import AlarmaList from './AdminAlarmaList';
import AdminAlarmaModal from './AdminAlarmaModal';

const AdminAlarmas = () => {
    const [Alarmas, setAlarmas] = useState([]);
    const [showNewAlarmaModal, setShowNewAlarmaModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch('https://localhost:7189/api/samusa/Alarma/listar')
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta incluye un código de error
            if (data.codigo && data.codigo === "-1") {
                setErrorMessage(data.mensaje);
                setAlarmas([]); // Limpia los datos existentes
            } else if (data.length === 0) {
                setErrorMessage("No se encontraron alarmas en la base de datos.");
            } else {
                setAlarmas(data);
                setErrorMessage(""); // Limpia el mensaje de error
            }
        })
        .catch(error => {
            console.error('Error fetching alarmas:', error);
            setErrorMessage("Error al cargar las alarmas.");
        });
}, []);

    const handleNewAlarma = () => {
        setShowNewAlarmaModal(true);
    };

    const handleCloseModal = () => {
        setShowNewAlarmaModal(false);
    };

    return (
        <>
                <div className="box boxa">
                            <div className="box-head">
                                <h4 className="title">Alertas</h4>
                            </div>
                            <button className="mb-1  text-white font-bold py-1 px-2 rounded button-sm add-btn"
                            onClick={handleNewAlarma}>Añadir Alerta
                            </button>
                            <div className="box-body">
                                {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                    </div>
                                )}
                                <div className="news-update-inner">
                                                    
                                    <div className="news-item">
                                        {Alarmas.map(Alarma => ( 
                                        <AlarmaList key={Alarma.id} Alarma={Alarma} />
                                        ))}
                                    </div>           
                                </div>
                            </div>
                        </div>
            {showNewAlarmaModal && <AdminAlarmaModal onClose={handleCloseModal} />}
        </>
    );
};

export default AdminAlarmas;
