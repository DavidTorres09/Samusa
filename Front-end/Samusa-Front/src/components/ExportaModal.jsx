import React, { useState, useEffect } from 'react';

const ExportaModal = ({ user, onClose, isEditing  }) => {
  const [editedExporta, seteditedExporta] = useState(user || {
    id: 0,
    expSeguimientoId: 0,
    clienteId: 0,
    dni: "",
    revVehiculoId: null,
    revContenedorId: null,
    fechaInicio: new Date().toISOString(),
    fechaFinalizacion: null,
    fechaEsperada: null,
    prioridad: "",
    descripcion: "",
    documentoUrl: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    seteditedExporta({ ...editedExporta, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7189/api/samusa/cliente/listar')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener la lista de clientes:', error));
  }, []);

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        editedExporta.fechaInicio = new Date().toISOString().split("T")[0] + 'T00:00:00.000Z';
        console.log(editedExporta);
        

      const response = await fetch('https://localhost:7189/api/samusa/exportacion/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedExporta),
      });

      if (response.ok) {
        alert("Exportación guardada exitosamente");
        window.location.reload(); //actualizar el estado
      } else {
        const errorData = await response.json();
        throw new Error(`Error al agregar la Exportación: ${errorData.message}`);
      }
      }
      else {
        editedExporta.fechaInicio = new Date().toISOString();

        console.log(editedExporta);

        if (editedExporta.fechaFinalizacion) {
          editedExporta.fechaFinalizacion = new Date(editedExporta.fechaFinalizacion).toISOString();
        }
      
        if (editedExporta.fechaEsperada) {
          editedExporta.fechaEsperada = new Date(editedExporta.fechaEsperada).toISOString();
        }

        const updateExporta = await fetch(
          `https://localhost:7189/api/samusa/exportacion/actualizar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedExporta),
          }
        );
        console.log(editedExporta);
        if (updateExporta.ok) {
          alert("exportacion actualizada exitosamente");
          window.location.reload();
        } else {
          throw new Error("No se pudo actualizar la exportacion");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">                
              <div className="bg-blue-600 px-4 py-4 sm:px-6 rounded">
          {isEditing ? <h3 className="titleform">Editar exportacion</h3> : <h3 className="titleform">Agregar exportacion</h3>}
          </div>
          <br />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            
            
            {isEditing ? 
                
                <div>
                </div>
                
                 : 
                 <div className="mb-4">
                 <label htmlFor="expSeguimientoId" className="block text-sm font-medium text-gray-700">Numero de registro</label>
                 <input type="text" name="expSeguimientoId" id="expSeguimientoId" value={editedExporta.expSeguimientoId} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
               </div>
                 }
                <div className="mb-4">
                    <label
                      htmlFor="clienteId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre del cliente
                    </label>
                    <select
                      name="clienteId"
                      id="clienteId"
                      value={editedExporta.clienteId}
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
                  <label htmlFor="dni" className="block text-sm font-medium text-gray-700">Dni</label>
                  <input type="text" name="dni" id="dni" value={editedExporta.dni} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="revVehiculoId" className="block text-sm font-medium text-gray-700">Revision de vehiculo asociada</label>
                  <input type="text" name="revVehiculoId" id="revVehiculoId" value={editedExporta.revVehiculoId} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="revContenedorId" className="block text-sm font-medium text-gray-700">Revision de contenedor asociada</label>
                  <input type="text" name="revContenedorId" id="revContenedorId" value={editedExporta.revContenedorId} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                {isEditing ? 
                
                <div>
                  <p>Fecha esperada actual: {editedExporta.fechaEsperada}</p>
                  <div className="mb-4">
                  <label htmlFor="fechaEsperada" className="block text-sm font-medium text-gray-700">Fecha esperada</label>
                  <input type="date" name="fechaEsperada" id="fechaEsperada" value={editedExporta.fechaEsperada} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                </div>
                
                 : 
                 <div></div>
                 }
                 
                 
                 {isEditing ? 
                 <div>
                  <p>Fecha de finalizacion actual: {editedExporta.fechaFinalizacion}</p>
                  <div className="mb-4">
                  <label htmlFor="fechaFinalizacion" className="block text-sm font-medium text-gray-700">Fecha de finalziacion</label>
                  <input type="date" name="fechaFinalizacion" id="fechaFinalizacion" value={editedExporta.fechaFinalizacion} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                 </div>
                 : 
                 <div></div>
                 }
                
                <div className="mb-4">
                    <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700"> Estado </label>
                    <select name="prioridad" id="prioridad" value={editedExporta.prioridad} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="En espera de documentos">En espera de documentos</option>
                      <option value="Documentacion">Documentacion</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Pendiente de pago">Pendiente de pago</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </div>

                <div className="mb-4">
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripcion</label>
                  <input type="text" name="descripcion" id="descripcion" value={editedExporta.descripcion} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="documentoUrl" className="block text-sm font-medium text-gray-700">Link de documentos</label>
                  <input type="text" name="documentoUrl" id="documentoUrl" value={editedExporta.documentoUrl} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={handleSave} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Guardar Cambios
            </button>
            <button onClick={handleCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportaModal;
