import React, { useState } from 'react';

const token = sessionStorage.getItem('token');

const RevCModal = ({ user, onClose, isEditing  }) => {
  const [editedRevVeh, seteditedRevVeh] = useState(user || {
    id: "",
    puertoOrigen: null,
    puertoDestino: null,
    naviera: null,
    transportista: "",
    dniDuenno: "",
    estado: null,
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
        editedRevVeh.id = 0;
      const response = await fetch('https://localhost:7189/api/samusa/revisionContenedor/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(editedRevVeh),
      });

      if (response.ok) {
        alert("Revision guardada exitosamente");
        window.location.reload();
      } else {
        alert("Error al crear, revisa los campos con *");
        const errorData = await response.json();
        throw new Error(`Error al agregar la Revision: ${errorData.message}`);
      }
      }
      else {
        const updateCotiza = await fetch(
          `https://localhost:7189/api/samusa/revisionContenedor/actualizar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(editedRevVeh),
          }
        );

        if (updateCotiza.ok) {
          alert("Revision actualizada exitosamente");
          window.location.reload();
        } else {
          alert("Inconveniente al actualizar");
          throw new Error("No se pudo actualizar la Revision");
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
            {isEditing ? <h3 className="titleModal text-white">Editar contenedor</h3> : <h3 className="titleModal text-white">Agregar contenedor</h3>}
          </div>

          <div className="bg-white px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">                
          <br />
          {isEditing ? 
                <div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                <div className="mb-4">
                  <label htmlFor="puertoDestino" className="block text-sm font-medium text-gray-700">Puerto Destino</label>
                  <input type="text" name="puertoDestino" id="puertoDestino" value={editedRevVeh.puertoDestino} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="naviera" className="block text-sm font-medium text-gray-700">Naviera</label>
                  <input type="text" name="naviera" id="naviera" value={editedRevVeh.naviera} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="transportista" className="block text-sm font-medium text-gray-700">Transportista</label>
                  <input type="text" name="transportista" id="transportista" value={editedRevVeh.transportista} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="dniDuenno" className="block text-sm font-medium text-gray-700">DNI del dueño</label>
                  <input type="text" name="dniDuenno" id="dniDuenno" value={editedRevVeh.dniDuenno} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700"> Estado *</label>
                    <select name="estado" id="estado" value={editedRevVeh.estado} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="Documentacion">Documentacion</option>
                      <option value="En puerto">En puerto</option>
                      <option value="En espera de descarga">En espera de descarga</option>
                      <option value="En descarga">En descarga</option>
                      <option value="Ruta a almacen">Ruta a almacen</option>
                      <option value="En Almacen">En Almacen</option>
                      <option value="Revisado">Revisado</option>
                    </select>
                  </div>
                  </div>
                </div> 
                
                : 

                <div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className="mb-4">
                  <label htmlFor="puertoOrigen" className="block text-sm font-medium text-gray-700">Puerto Origen *</label>
                  <input type="text" name="puertoOrigen" id="puertoOrigen" value={editedRevVeh.puertoOrigen} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="puertoDestino" className="block text-sm font-medium text-gray-700">Puerto Destino *</label>
                  <input type="text" name="puertoDestino" id="puertoDestino" value={editedRevVeh.puertoDestino} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="naviera" className="block text-sm font-medium text-gray-700">Naviera *</label>
                  <input type="text" name="naviera" id="naviera" value={editedRevVeh.naviera} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="transportista" className="block text-sm font-medium text-gray-700">Transportista</label>
                  <input type="text" name="transportista" id="transportista" value={editedRevVeh.transportista} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="dniDuenno" className="block text-sm font-medium text-gray-700">DNI del dueño</label>
                  <input type="text" name="dniDuenno" id="dniDuenno" value={editedRevVeh.dniDuenno} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700"> Estado *</label>
                    <select name="estado" id="estado" value={editedRevVeh.estado} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                      <option value="Documentacion">Documentacion</option>
                      <option value="En puerto">En puerto</option>
                      <option value="En espera de descarga">En espera de descarga</option>
                      <option value="En descarga">En descarga</option>
                      <option value="Ruta a almacen">Ruta a almacen</option>
                      <option value="En Almacen">En Almacen</option>
                      <option value="Revisado">Revisado</option>
                    </select>
                  </div>
                  </div>
                </div>}

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

export default RevCModal;