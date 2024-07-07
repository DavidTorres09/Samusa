import React, { useState, useEffect } from "react";

const token = sessionStorage.getItem("token");

const PaqueteriaModal = ({ user, onClose, isEditing  }) => {
  const [editedPaqueteria, seteditedPaqueteria] = useState(user || {
    id: 0,
    clienteId: 0,
    numCasillero: "",
    numTracking: null,
    tipoProducto: "",
    fechaRegistro: new Date().toISOString(),
    fechaEsperada: null,
    directOrigen: "",
    directDestino: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    seteditedPaqueteria({ ...editedPaqueteria, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/cliente/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error("Error al obtener la lista de clientes:", error));
  }, []);

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        editedPaqueteria.fechaRegistro = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";
      const response = await fetch("https://localhost:7189/api/samusa/paqueteria/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedPaqueteria),
      });

      if (response.ok) {
        alert("Paqueteriación guardada exitosamente");
        window.location.reload(); //actualizar el estado
      } else {
        alert("No es posible añadir el paquete, verifica los campos *");
        const errorData = await response.json();
        throw new Error(`Error al agregar la Paqueteriación: ${errorData.message}`);
      }
      }
      else {
        editedPaqueteria.fechaRegistro = new Date().toISOString();
      
        if (editedPaqueteria.fechaEsperada) {
          editedPaqueteria.fechaEsperada = new Date(editedPaqueteria.fechaEsperada).toISOString();
        }else{
          editedPaqueteria.fechaEsperada = null;
        }

        const updatePaqueteria = await fetch(
          `https://localhost:7189/api/samusa/paqueteria/actualizar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editedPaqueteria),
          }
        );

        if (updatePaqueteria.ok) {
          alert("Usuario actualizado exitosamente");
          window.location.reload();
        } else {
          alert("No es posible añadir el paquete, verifica los campos *");
          throw new Error("No se pudo actualizar el paquete");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  return (
    <div className="Modals">
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
            {isEditing ? <h3 className="titleModal text-white">Editar paquetería</h3> : <h3 className="titleModal text-white">Agregar paquetería</h3>}
          </div>

          <div className="bg-white px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">                
          <br />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      value={editedPaqueteria.clienteId}
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
                  <label htmlFor="numTracking" className="block text-sm font-medium text-gray-700">Numero de tracking * </label>
                  <input type="text" name="numTracking" id="numTracking" value={editedPaqueteria.numTracking} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div className="mb-4">
                  <label htmlFor="numCasillero" className="block text-sm font-medium text-gray-700">Numero de casillero</label>
                  <input type="text" name="numCasillero" id="numCasillero" value={editedPaqueteria.numCasillero} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div className="mb-4">
                  <label htmlFor="tipoProducto" className="block text-sm font-medium text-gray-700">Tipo de producto</label>
                  <input type="text" name="tipoProducto" id="tipoProducto" value={editedPaqueteria.tipoProducto} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                {isEditing ? 
                
                <div>
                  <p>Fecha esperada actual: {editedPaqueteria.fechaEsperada}</p>
                  <div className="mb-4">
                  <label htmlFor="fechaEsperada" className="block text-sm font-medium text-gray-700">Fecha esperada</label>
                  <input type="date" name="fechaEsperada" id="fechaEsperada" value={editedPaqueteria.fechaEsperada} onChange={handleInputChange} className="Datein mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                </div>
                
                 : 
                 <div></div>
                 }
                            
                <div className="mb-4">
                  <label htmlFor="directOrigen" className="block text-sm font-medium text-gray-700">Origen</label>
                  <input type="text" name="directOrigen" id="directOrigen" value={editedPaqueteria.directOrigen} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div className="mb-4">
                  <label htmlFor="directDestino" className="block text-sm font-medium text-gray-700">Direccion de destino</label>
                  <input type="text" name="directDestino" id="directDestino" value={editedPaqueteria.directDestino} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
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

export default PaqueteriaModal;
