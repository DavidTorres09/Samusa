import React, { useState } from 'react';

const token = sessionStorage.getItem("token");

const TicketClientModal = ({ user, onClose,}) => {
  const [NewTicket, setNewTicket] = useState(user || {
    id: 0,
    colaboradorId: 1,
    clienteId: sessionStorage.getItem('id'),
    dniCliente: "",
    estado: "Sin revisar",
    prioridad: "",
    descripcion: null,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewTicket({ ...NewTicket, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    if(NewTicket.descripcion == null || NewTicket.descripcion.length < 10){
      alert("Agrega una consulta, debe ser mayor a 15 caracteres.");
    }
    else{
      try {
        const response = await fetch('https://localhost:7189/api/samusa/Ticket/agregar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(NewTicket),
        });
        console.log(NewTicket);
  
        if (response.ok) {
          alert("Cobnsulta guardada exitosamente");
          window.location.reload();
        } else {
          alert("Erro al guardar consulta verifica los campos con *");
          const errorData = await response.json();
          throw new Error(`Error al agregar la cotización: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };


  return (
    <div className='Modals'>
      <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate__animated animate__fadeInUp">
          <div className="bg-blue-800 px-4 py-2 sm:px-6 rounded">
            <h3 className="titleModal text-white">Agregar consulta</h3>
          </div>
          <div className="bg-white px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">                
          <br />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>


                  <div className="mb-4">
                    <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700"> Prioridad </label>
                    <select name="prioridad" id="prioridad" value={NewTicket.prioridad} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                      <option value="Critica">Critica</option>
                    </select>
                  </div>

                <div className="mb-4">
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Consulta *</label>
                  <input type="text" name="descripcion" id="descripcion" value={NewTicket.descripcion} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm animate__animated animate__pulse"
            >
              Guardar Cambios
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm animate__animated animate__pulse"
            >
              Cancelar
            </button>
          </div>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TicketClientModal;
