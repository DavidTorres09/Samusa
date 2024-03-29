import React, { useState } from 'react';

const ImportaModal = ({ user, onClose, isEditing  }) => {
  const [editedImporta, seteditedImporta] = useState(user || {
    idimpSeguimiento: "",
    idDni: "",
    idRevVehiculo: null,
    idRevContenedor: null,
    fechaInicio: new Date().toISOString(),
    fechaFinalizacion: null,
    fechaEsperada: null,
    prioridad: "",
    descripcion: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    seteditedImporta({ ...editedImporta, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        editedImporta.fechaInicio = new Date().toISOString().split("T")[0] + 'T00:00:00.000Z';
        console.log(editedImporta);
        

      // Lógica para agregar una nueva cotización directamente sin verificar su existencia
      const response = await fetch('https://localhost:7293/api/samusa/importacion/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedImporta),
      });

      if (response.ok) {
        alert("Cotización guardada exitosamente");
        window.location.reload(); // O actualizar el estado para reflejar los cambios sin recargar la página
      } else {
        const errorData = await response.json();
        throw new Error(`Error al agregar la cotización: ${errorData.message}`);
      }
      }
      else {
        editedImporta.fechaInicio = new Date().toISOString();

        console.log(editedImporta);

        if (editedImporta.fechaFinalizacion) {
          editedImporta.fechaFinalizacion = new Date(editedImporta.fechaFinalizacion).toISOString();
        }else{
          editedImporta.fechaFinalizacion = null;
        }
      
        if (editedImporta.fechaEsperada) {
          editedImporta.fechaEsperada = new Date(editedImporta.fechaEsperada).toISOString();
        }else{
          editedImporta.fechaEsperada = null;
        }

        const updateCotiza = await fetch(
          `https://localhost:7293/api/samusa/importacion/modificar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedImporta),
          }
        );

        if (updateCotiza.ok) {
          alert("Usuario actualizado exitosamente");
          window.location.reload();
        } else {
          throw new Error("No se pudo actualizar el usuario");
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
              <div className="bg-blue-600 px-4 py-4 sm:px-6 rounded">
          {isEditing ? <h3 className="titleform">Editar Importacion</h3> : <h3 className="titleform">Agregar Importacion</h3>}
          </div>
          <br />
                <div className="mb-4">
                  <label htmlFor="idimpSeguimiento" className="block text-sm font-medium text-gray-700">Numero de registro</label>
                  <input type="text" name="idimpSeguimiento" id="idimpSeguimiento" value={editedImporta.idimpSeguimiento} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="idDni" className="block text-sm font-medium text-gray-700">Dni</label>
                  <input type="text" name="idDni" id="idDni" value={editedImporta.idDni} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="idRevVehiculo" className="block text-sm font-medium text-gray-700">Revision de vehiculo asociada</label>
                  <input type="text" name="idRevVehiculo" id="idRevVehiculo" value={editedImporta.idRevVehiculo} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="idRevContenedor" className="block text-sm font-medium text-gray-700">Revision de contenedor asociada</label>
                  <input type="text" name="idRevContenedor" id="idRevContenedor" value={editedImporta.idRevContenedor} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                {isEditing ? 
                
                <div>
                  <p>Fecha esperada actual: {editedImporta.fechaEsperada}</p>
                  <div className="mb-4">
                  <label htmlFor="fechaEsperada" className="block text-sm font-medium text-gray-700">Fecha esperada</label>
                  <input type="date" name="fechaEsperada" id="fechaEsperada" value={editedImporta.fechaEsperada} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                </div>
                
                 : 
                 <div></div>
                 }
                 
                 
                 {isEditing ? 
                 <div>
                  <p>Fecha de finalizacion actual: {editedImporta.fechaFinalizacion}</p>
                  <div className="mb-4">
                  <label htmlFor="fechaFinalizacion" className="block text-sm font-medium text-gray-700">Fecha de finalziacion</label>
                  <input type="date" name="fechaFinalizacion" id="fechaFinalizacion" value={editedImporta.fechaFinalizacion} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                 </div>
                 : 
                 <div></div>
                 }
                
                <div className="mb-4">
                    <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700"> Estado </label>
                    <select name="prioridad" id="prioridad" value={editedImporta.prioridad} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="En espera de documentos">En espera de documentos</option>
                      <option value="Documentacion">Documentacion</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Pendiente de pago">Pendiente de pago</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </div>

                <div className="mb-4">
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripcion</label>
                  <input type="text" name="descripcion" id="descripcion" value={editedImporta.descripcion} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
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

export default ImportaModal;
