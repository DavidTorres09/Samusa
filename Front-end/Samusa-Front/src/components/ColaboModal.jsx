import React, { useState } from 'react';

const ColaboModal = ({ user, onClose, isEditing }) => {
  const [editedColabo, setEditedColabo] = useState(
    user || {
      dni: "",
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      telefono: "",
      email: "",
      esNacional: false,
      usuario: "",
      password: "",
      fechaIngreso: "",
      rol: "Colaborador",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditedColabo({ ...editedColabo, [name]: newValue });
  };


  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        editedColabo.fechaIngreso = new Date().toISOString();
        editedColabo.rol = 'Colaborador';
        console.log(editedColabo)
        const responseVerificacion = await fetch(
          `https://localhost:7293/api/samusa/colaborador/listarUnico?dni=${editedColabo.dni}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
          const addColabo = await fetch(
            `https://localhost:7293/api/samusa/colaborador/guardar`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(editedColabo),
            }
          );
          if (addColabo.ok) {
            alert("Usuario guardado exitosamente");
            window.location.reload();
          } else {
            throw new Error("No se pudo agregar el usuario");
          }
      }
      else {
        const updateColabo = await fetch(
          `https://localhost:7293/api/samusa/colaborador/modificar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedColabo),
          }
        );

        if (updateColabo.ok) {
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
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Editar Colaborador</h3>
                <div className="mb-4">
                  <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
                  <input type="text" name="dni" id="dni" value={editedColabo.dni} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" name="nombre" id="nombre" value={editedColabo.nombre} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="primerApellido" className="block text-sm font-medium text-gray-700">Primer Apellido</label>
                  <input type="text" name="primerApellido" id="primerApellido" value={editedColabo.primerApellido} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="segundoApellido" className="block text-sm font-medium text-gray-700">Segundo Apellido</label>
                  <input type="text" name="segundoApellido" id="segundoApellido" value={editedColabo.segundoApellido} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="text" name="telefono" id="telefono" value={editedColabo.telefono} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" id="email" value={editedColabo.email} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="esNacional" className="block text-sm font-medium text-gray-700">Es Nacional</label>
                  <input type="checkbox" name="esNacional" id="esNacional" checked={editedColabo.esNacional} onChange={handleInputChange} className="mt-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
                  <input type="text" name="usuario" id="usuario" value={editedColabo.usuario} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input type="password" name="password" id="password" value={editedColabo.password} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
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

export default ColaboModal;