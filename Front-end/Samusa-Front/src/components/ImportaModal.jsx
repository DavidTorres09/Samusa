import React, { useState,useEffect } from 'react';

const token = sessionStorage.getItem('token');

const ImportaModal = ({ user, onClose, isEditing  }) => {
  const [editedImporta, seteditedImporta] = useState(user || {
    id: 0,
    impSeguimientoId: null,
    clienteId: null,
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
    seteditedImporta({ ...editedImporta, [name]: newValue });
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

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        editedImporta.fechaInicio = new Date().toISOString().split("T")[0] + 'T00:00:00.000Z';
      const response = await fetch('https://localhost:7189/api/samusa/importacion/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(editedImporta),
      });

      if (response.ok) {
        alert("Importacion guardada exitosamente");
        window.location.reload(); //actualizar el estado
      } else {
        alert("Error al agregar importacion, verifica los campos con *");
        const errorData = await response.json();
        throw new Error(`Error al agregar la cotización: ${errorData.message}`);
      }
      }
      else {
        const updateImporta = await fetch(
          `https://localhost:7189/api/samusa/importacion/actualizar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(editedImporta),
          }
        );

        if (updateImporta.ok) {
          alert("Importacion actualizada exitosamente");
          window.location.reload();
        } else {
          alert("Error al actualizar" + errorData.message);
          throw new Error("No se pudo actualizar el usuario");
        }
      }
    } catch (error) {
      alert("Error al actualizar, verifica que haya un numero de segumiento");
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
            {isEditing ? <h3 className="titleModal text-white">Editar importación</h3> : <h3 className="titleModal text-white">Agregar importación</h3>}
          </div>

          <div className="bg-white px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">                
          <br />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="impSeguimientoId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Numero de registro *
                    </label>
                    <input
                      type="text"
                      name="impSeguimientoId"
                      id="impSeguimientoId"
                      value={editedImporta.impSeguimientoId}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="clienteId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre del cliente *
                    </label>
                    <select
                      name="clienteId"
                      id="clienteId"
                      value={editedImporta.clienteId}
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
                    <label
                      htmlFor="dni"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dni
                    </label>
                    <input
                      type="text"
                      name="dni"
                      id="dni"
                      value={editedImporta.dni}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="revVehiculoId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Revision de vehiculo asociada
                    </label>
                    <input
                      type="text"
                      name="revVehiculoId"
                      id="revVehiculoId"
                      value={editedImporta.revVehiculoId}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="revContenedorId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Revision de contenedor asociada
                    </label>
                    <input
                      type="text"
                      name="revContenedorId"
                      id="revContenedorId"
                      value={editedImporta.revContenedorId}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>

                  {isEditing ? (
                    <div>
                      <p>
                        Fecha esperada actual: {editedImporta.fechaEsperada}
                      </p>
                      <div className="mb-4">
                        <label
                          htmlFor="fechaEsperada"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fecha esperada
                        </label>
                        <input
                          type="date"
                          name="fechaEsperada"
                          id="fechaEsperada"
                          value={editedImporta.fechaEsperada}
                          onChange={handleInputChange}
                          className="Datein mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {isEditing ? (
                    <div>
                      <p>
                        Fecha de finalizacion actual:{" "}
                        {editedImporta.fechaFinalizacion}
                      </p>
                      <div className="mb-4">
                        <label
                          htmlFor="fechaFinalizacion"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fecha de finalziacion
                        </label>
                        <input
                          type="date"
                          name="fechaFinalizacion"
                          id="fechaFinalizacion"
                          value={editedImporta.fechaFinalizacion}
                          onChange={handleInputChange}
                          className="Datein mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="prioridad"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Estado *{" "}
                    </label>
                    <select
                      name="prioridad"
                      id="prioridad"
                      value={editedImporta.prioridad}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="En espera de documentos">
                        En espera de documentos
                      </option>
                      <option value="Documentacion">Documentacion</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Pendiente de pago">
                        Pendiente de pago
                      </option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="descripcion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descripcion
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      id="descripcion"
                      value={editedImporta.descripcion}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="documentoUrl"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Link de documentos
                    </label>
                    <input
                      type="text"
                      name="documentoUrl"
                      id="documentoUrl"
                      value={editedImporta.documentoUrl}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
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
  );
};

export default ImportaModal;
