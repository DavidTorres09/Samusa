import React, { useState } from 'react';

const RevVehiculosModal = ({ user, onClose, isEditing  }) => {
  const [editedRevVeh, seteditedRevVeh] = useState(user || {
    idformAlmacen: "",
    vin: "",
    marca: "",
    modelo: "",
    color: "",
    costoVehiculo: "",
    anioVehiculo: "",
    dniDueno: "",
    placa: "",
    estadoOp: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    seteditedRevVeh({ ...editedRevVeh, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (isEditing===false) {   
        editedRevVeh.idformAlmacen = 0;
        console.log(editedRevVeh)   
      const response = await fetch('https://localhost:7293/api/samusa/revisionAlmacen/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedRevVeh),
      });

      if (response.ok) {
        alert("Revision guardada exitosamente");
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(`Error al agregar la Revision: ${errorData.message}`);
      }
      }
      else {
        const updateCotiza = await fetch(
          `https://localhost:7293/api/samusa/revisionAlmacen/modificar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedRevVeh),
          }
        );

        if (updateCotiza.ok) {
          alert("Revision actualizada exitosamente");
          window.location.reload();
        } else {
          throw new Error("No se pudo actualizar la Revision");
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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">                
              {isEditing ? <h3 className="text-lg font-medium leading-6 text-white">Editar Revision</h3> : <h3 className="text-lg font-medium leading-6 text-white">Agregar Revision</h3>}
                <div className="mb-4">
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN</label>
                  <input type="text" name="vin" id="vin" value={editedRevVeh.vin} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
                  <input type="text" name="marca" id="marca" value={editedRevVeh.marca} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo</label>
                  <input type="text" name="modelo" id="modelo" value={editedRevVeh.modelo} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                  <input type="text" name="color" id="color" value={editedRevVeh.color} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="costoVehiculo" className="block text-sm font-medium text-gray-700">Costo</label>
                  <input type="text" name="costoVehiculo" id="costoVehiculo" value={editedRevVeh.costoVehiculo} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="anioVehiculo" className="block text-sm font-medium text-gray-700">Año del vehiculo</label>
                  <input type="text" name="anioVehiculo" id="anioVehiculo" value={editedRevVeh.anioVehiculo} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="dniDueno" className="block text-sm font-medium text-gray-700">DNI del dueño</label>
                  <input type="text" name="dniDueno" id="dniDueno" value={editedRevVeh.dniDueno} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="placa" className="block text-sm font-medium text-gray-700">Placa</label>
                  <input type="text" name="placa" id="placa" value={editedRevVeh.placa} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="estadoOp" className="block text-sm font-medium text-gray-700"> Estado </label>
                    <select name="estadoOp" id="estadoOp" value={editedRevVeh.estadoOp} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="Documentacion">Documentacion</option>
                      <option value="Pendiente de cita">Pendiente de cita</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Revisado">Revisado</option>
                    </select>
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

export default RevVehiculosModal;