import React, { useState } from "react";
import "../Css/User/Modals.css";

const token = sessionStorage.getItem("token");

const AdminAlarmaModal = ({ user, onClose,}) => {
  const [NewAlarma, setNewAlarma] = useState(user || {
    id: 0,
    descripcion: "",
  });

  const maxDescripcionLength = 1500;

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "descripcion" && newValue.length > maxDescripcionLength) {
      alert(`La descripción no puede tener más de ${maxDescripcionLength} caracteres.`);
      return;
  }

    setNewAlarma({ ...NewAlarma, [name]: newValue });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    if (!NewAlarma.descripcion || NewAlarma.descripcion.length > maxDescripcionLength) {
      alert("La descripción es obligatoria y no puede tener más de 1500 caracteres.");
      return;
    }
    try {
      const response = await fetch("https://localhost:7189/api/samusa/Alarma/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(NewAlarma),
      });
      if (response.ok) {
        alert("Alarma guardada exitosamente");
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(`Error al agregar la alarma: ${errorData.message}`);
      }
    } catch (error) {
    }
  };


  return (
    <div className="Alarma">
       <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate__animated animate__fadeInUp">
          <div className="bg-blue-900 px-4 py-5 sm:p-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-1 sm:text-left w-full">
                <div className="bg-blue-600 px-4 py-2 sm:px-2 rounded">
                  <h3 className="titlealarm text-white text-lg leading-5 font-medium">Agregar Alarma</h3>
                </div>
                <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="descripcion"
                      className="block text-sm font-medium text-gray-100"
                    >
                      Detalle *
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      id="descripcion"
                      value={NewAlarma.descripcion}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                      maxLength={maxDescripcionLength}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-1 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSave}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleCancel}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default AdminAlarmaModal;