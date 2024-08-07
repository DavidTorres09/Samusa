import React, { useState } from "react";

const token = sessionStorage.getItem("token");

const CotizaModal = ({ user, onClose, isEditing  }) => {
  const [editedCotiza, seteditedCotiza] = useState(user || {
    id: 0,
    colaboradorId: sessionStorage.getItem("id"),
    tipoProducto: null,
    producto: null,
    porcentajeIMP: 0,
    enlaceRef: "",
    fechaCreacion: new Date().toISOString(),
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    seteditedCotiza({ ...editedCotiza, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (!editedCotiza.producto || editedCotiza.producto.trim() === "") {
        alert("El campo Producto es obligatorio.");
        return;
      }
      if (!editedCotiza.tipoProducto || editedCotiza.tipoProducto.trim() === "") {
        alert("El campo Tipo Producto es obligatorio.");
        return;
      }

      if (isEditing===false) {
        editedCotiza.fechaCreacion = new Date().toISOString();
        

      // Lógica para agregar una nueva cotización directamente sin verificar su existencia
      const response = await fetch("https://localhost:7189/api/samusa/cotizacion/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedCotiza),
      });
      console.log(editedCotiza);

      if (response.ok) {
        alert("Cotización guardada exitosamente");
        window.location.reload(); // O actualizar el estado para reflejar los cambios sin recargar la página
      } else {
        alert("Error al crear la cotizacion verifica los campos con *");
        const errorData = await response.json();
        throw new Error(`Error al agregar la cotización: ${errorData.message}`);
      }
      }
      else {
        editedCotiza.fechaCreacion = new Date().toISOString();
        const updateCotiza = await fetch(
          `https://localhost:7189/api/samusa/cotizacion/actualizar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editedCotiza),
          }
        );

        if (updateCotiza.ok) {
          alert("Cotización actualziada exitosamente");
          window.location.reload();
        } else {
          alert("Fallo al actualizar revisa los campos con *");
          throw new Error("No se pudo actualizar el usuario");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      console.log(editedCotiza);
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
            {isEditing ? <h3 className="titleModal text-white">Editar cotización</h3> : <h3 className="titleModal text-white">Agregar cotización</h3>}
          </div>

          <div className="bg-white px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">                
          <br />

          {isEditing ? 
                <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  
                <div className="mb-4">
                  <label htmlFor="porcentajeIMP" className="block text-sm font-medium text-gray-700">Porcentaje Imp *</label>
                  <input type="text" name="porcentajeIMP" id="porcentajeIMP" value={editedCotiza.porcentajeIMP} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="enlaceRef" className="block text-sm font-medium text-gray-700">Enlace de referencia</label>
                  <input type="text" name="enlaceRef" id="enlaceRef" value={editedCotiza.enlaceRef} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
                </div> 
                
                : 

                <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="tipoProducto" className="block text-sm font-medium text-gray-700">Tipo Producto *</label>
                  <input type="text" name="tipoProducto" id="tipoProducto" value={editedCotiza.tipoProducto} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Poducto *</label>
                  <input type="text" name="producto" id="producto" value={editedCotiza.producto} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="porcentajeIMP" className="block text-sm font-medium text-gray-700">Porcentaje Imp *</label>
                  <input type="text" name="porcentajeIMP" id="porcentajeIMP" value={editedCotiza.porcentajeIMP} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="enlaceRef" className="block text-sm font-medium text-gray-700">Enlace de referencia</label>
                  <input type="text" name="enlaceRef" id="enlaceRef" value={editedCotiza.enlaceRef} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
                </div>}
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

export default CotizaModal;
