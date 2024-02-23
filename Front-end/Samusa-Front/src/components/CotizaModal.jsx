import React, { useState } from 'react';

const CotizaModal = ({ user, onClose, isEditing  }) => {
  const [editedCotiza, seteditedCotiza] = useState(user || {
    idDni: "",
    idcolaborador: "",
    tipoProducto: "",
    producto: "",
    porcentajeImp: "",
    enlaceRef: "",
    fechaCreacion: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    seteditedCotiza({ ...editedCotiza, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        editedCotiza.fechaCreacion = new Date().toISOString();
        

      // Lógica para agregar una nueva cotización directamente sin verificar su existencia
      const response = await fetch('https://localhost:7293/api/samusa/cotizacion/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCotiza),
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
        const updateCotiza = await fetch(
          `https://localhost:7293/api/samusa/cotizacion/modificar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedCotiza),
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
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Editar Cotizacion</h3>
                <div className="mb-4">
                  <label htmlFor="idDni" className="block text-sm font-medium text-gray-700">Dni</label>
                  <input type="text" name="idDni" id="idDni" value={editedCotiza.idDni} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="idcolaborador" className="block text-sm font-medium text-gray-700">Dni Colaborador</label>
                  <input type="text" name="idcolaborador" id="idcolaborador" value={editedCotiza.idcolaborador} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="tipoProducto" className="block text-sm font-medium text-gray-700">Tipo Producto</label>
                  <input type="text" name="tipoProducto" id="tipoProducto" value={editedCotiza.tipoProducto} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Poducto</label>
                  <input type="text" name="producto" id="producto" value={editedCotiza.producto} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="porcentajeImp" className="block text-sm font-medium text-gray-700">Porcentaje Imp</label>
                  <input type="text" name="porcentajeImp" id="porcentajeImp" value={editedCotiza.porcentajeImp} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="enlaceRef" className="block text-sm font-medium text-gray-700">Enlace de referencia</label>
                  <input type="text" name="enlaceRef" id="enlaceRef" value={editedCotiza.enlaceRef} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
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

export default CotizaModal;
