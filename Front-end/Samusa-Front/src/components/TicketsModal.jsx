import React, { useState, useEffect } from 'react';

const token = sessionStorage.getItem("token");

const TicketModal = ({ user, onClose, isEditing  }) => {
  const [editedTicket, seteditedTicket] = useState(user || {
    id: 0,
    colaboradorId: null,
    clienteId: null,
    dniCliente: "",
    estado: null,
    prioridad: null,
    descripcion: "TKK de prueba",
    respuesta: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    seteditedTicket({ ...editedTicket, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };


  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7189/api/samusa/cliente/listar', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener la lista de clientes:', error));
  }, []);

  const [Colaboradores, setColaborador] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7189/api/samusa/colaborador/listar', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setColaborador(data))
      .catch(error => console.error('Error al obtener la lista de clientes:', error));
  }, []);

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        

      // Lógica para agregar una nueva cotización directamente sin verificar su existencia
      const response = await fetch('https://localhost:7189/api/samusa/Ticket/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedTicket),
      });

      if (response.ok) {
        alert("Ticket guardado exitosamente");
        window.location.reload(); // O actualizar el estado para reflejar los cambios sin recargar la página
      } else {
        alert("Error al guardar el ticket revisa los campos con *");
        const errorData = await response.json();
        throw new Error(`Error al agregar el ticket: ${errorData.message}`);
      }
      }
      else {
        const updateCotiza = await fetch(
          `https://localhost:7189/api/samusa/Ticket/actualizar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editedTicket),
          }
        );

        if (updateCotiza.ok) {
          alert("Ticket actualizado exitosamente");
          window.location.reload();
        } else {
          alert("No se pudo actualizar el ticket, verifica los campos");
          throw new Error("No se pudo actualizar el ticket");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
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
            {isEditing ? <h3 className="titleModal text-white">Responder Ticket</h3> : <h3 className="titleModal text-white">Agregar Ticket</h3>}
          </div>

          <div className="bg-white px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">                
          <br />
          
          {isEditing ? 
                 <div>
                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                 <div className="mb-4 hidden">
                 <label htmlFor="colaboradorId" className="block text-sm font-medium text-gray-700">Colaborador *</label>
                 <select
                     name="colaboradorId"
                     id="colaboradorId"
                     value={editedTicket.colaboradorId}
                     onChange={handleInputChange}
                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                   >
                     <option value="">Seleccione un colaborador</option>
                     {Colaboradores.map((Colaborador) => (
                       <option key={Colaborador.id} value={Colaborador.id}>
                         {Colaborador.nombre}
                       </option>
                     ))}
                   </select>
               </div>
               
               <div className="mb-4 hidden">
                 <label htmlFor="clienteId" className="block text-sm font-medium text-gray-700">Cliente Id *</label>
                 <select
                     name="clienteId"
                     id="clienteId"
                     value={editedTicket.clienteId}
                     onChange={handleInputChange}
                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                   >
                     <option value="">Seleccione un cliente</option>
                     {clientes.map((cliente) => (
                       <option key={cliente.id} value={cliente.id}>
                         {cliente.nombre}
                       </option>
                     ))}
                   </select>
               </div>

               <div className="mb-4">
                 <label htmlFor="Descripcion" className="block text-sm font-medium text-gray-700">Descripcion</label>
                 <input type="text" name="descripcion" id="descripcion" value={editedTicket.descripcion} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
               </div>

               <div className="mb-4">
                 <label htmlFor="respuesta" className="block text-sm font-medium text-gray-700">Respuesta</label>
                 <input type="text" name="respuesta" id="respuesta" value={editedTicket.respuesta} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
               </div>


               
               <div className="mb-4">
                   <label htmlFor="estado" className="block text-sm font-medium text-gray-700"> Estado *</label>
                   <select name="estado" id="estado" value={editedTicket.estado} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                     <option value="Sin revisar">Sin revisar</option>
                     <option value="En revision">En revision</option>
                     <option value="En espera de cliente">En espera de cliente</option>
                     <option value="Completado">Completado</option>
                   </select>
                 </div>

                 <div className="mb-4">
                   <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700"> Prioridad *</label>
                   <select name="prioridad" id="prioridad" value={editedTicket.prioridad} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                     <option value="Baja">Baja</option>
                     <option value="Media">Media</option>
                     <option value="Alta">Alta</option>
                     <option value="Critica">Critica</option>
                   </select>
                 </div>

                </div>
                </div>
                 : 
                 <div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className="mb-4">
                  <label htmlFor="colaboradorId" className="block text-sm font-medium text-gray-700">Colaborador *</label>
                  <select
                      name="colaboradorId"
                      id="colaboradorId"
                      value={editedTicket.colaboradorId}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Seleccione un colaborador</option>
                      {Colaboradores.map((Colaborador) => (
                        <option key={Colaborador.id} value={Colaborador.id}>
                          {Colaborador.nombre}
                        </option>
                      ))}
                    </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="clienteId" className="block text-sm font-medium text-gray-700">Cliente Id *</label>
                  <select
                      name="clienteId"
                      id="clienteId"
                      value={editedTicket.clienteId}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Seleccione un cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="respuesta" className="block text-sm font-medium text-gray-700">Descripcion</label>
                  <input type="text" name="descripcion" id="descripcion" value={editedTicket.descripcion} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                
                <div className="mb-4">
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700"> Estado *</label>
                    <select name="estado" id="estado" value={editedTicket.estado} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="Sin revisar">Sin revisar</option>
                      <option value="En revision">En revision</option>
                      <option value="En espera de cliente">En espera de cliente</option>
                      <option value="Completado">Completado</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700"> Prioridad *</label>
                    <select name="prioridad" id="prioridad" value={editedTicket.prioridad} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                      <option value="Critica">Critica</option>
                    </select>
                  </div>

                 </div>
                 </div>
                 }
              


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

export default TicketModal;
