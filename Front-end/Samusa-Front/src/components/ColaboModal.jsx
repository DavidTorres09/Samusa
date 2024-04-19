import React, { useState } from 'react';

const ColaboModal = ({ user, onClose, isEditing }) => {
  const [editedColabo, setEditedColabo] = useState(
    user || {
      id: 0,
      dni: "",
      nombre: "",
      telefono: "",
      email: "",
      esNacional: false,
      usuario: "",
      contrasenna: "",
      direccion: "",
      rolId: 2,
      nombreRol: "",
      foto:"",
      estado: true,
      esTEmporal: false,
      token: "",
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
       
        console.log(editedColabo)
        const responseVerificacion = await fetch(
          `https://localhost:7189/api/samusa/colaborador/listarUnico?dni=${editedColabo.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
          const addColabo = await fetch(
            `https://localhost:7189/api/samusa/colaborador/agregar`,
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
        editedColabo.fechaIngreso = new Date().toISOString();
        console.log(editedColabo)
        const updateColabo = await fetch(          
          `https://localhost:7189/api/samusa/colaborador/actualizar`,
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
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <div className="bg-blue-600 px-4 py-2 sm:px-6 rounded">
          {isEditing ? <h3 className="titleform">Editar Colaborador</h3> : <h3 className="titleform">Agregar Colaborador</h3>}
          </div>
          <br />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className="mb-4">
                    <label
                      htmlFor="dni"
                      className="block text-sm font-medium text-gray-700"
                    >
                      DNI
                    </label>
                    <input
                      type="number"
                      name="dni"
                      id="dni"
                      value={editedColabo.dni}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-gray-700"
                    >
                      NOMBRE
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={editedColabo.nombre}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium text-gray-700"
                    >
                      TELEFONO
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      id="telefono"
                      value={editedColabo.telefono}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      EMAIL
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={editedColabo.email}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="contrasenna"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CONTRASEÑA
                    </label>
                    <input
                      type="text"
                      name="contrasenna"
                      id="contrasenna"
                      value={editedColabo.contrasenna}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="usuario"
                      className="block text-sm font-medium text-gray-700"
                    >
                      USUARIO
                    </label>
                    <input
                      type="usuario"
                      name="usuario"
                      id="usuario"
                      value={editedColabo.usuario}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="esNacional"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Es Nacional
                    </label>
                    <label className="inline-flex items-center mt-1">
                      <input
                        type="checkbox"
                        name="esNacional"
                        id="esNacional"
                        defaultChecked={editedColabo.esNacional}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        ESTADO
                      </span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="estado"
                      className="block text-sm font-medium text-gray-700"
                    >
                      estado
                    </label>
                    <label className="inline-flex items-center mt-1">
                      <input
                        type="checkbox"
                        name="estado"
                        id="estado"
                        defaultChecked={editedColabo.estado}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Es nacional
                      </span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="direccion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      id="direccion"
                      value={editedColabo.direccion}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
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

export default ColaboModal;