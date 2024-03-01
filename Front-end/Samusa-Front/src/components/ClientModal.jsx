import React, { useState } from "react";
// import Layout from '../pages/Layout';
// import Footer from './Footer';
const ClientModal = ({ user, onClose, isEditing }) => {
  const [editedUser, setEditedUser] = useState(
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
      direccion: "",
      rol: "Cliente",
    }
  );

const ClientModal = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState(user)};

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditedUser({ ...editedUser, [name]: newValue });
  };
  

  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (isEditing===false) {
        const responseVerificacion = await fetch(
          `https://localhost:7293/api/samusa/cliente/listarUnico?dni=${editedUser.dni}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (responseVerificacion.status === 404) {
          const addClient = await fetch(
            `https://localhost:7293/api/samusa/cliente/guardar`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(editedUser),
            }
          );
          if (addClient.ok) {
            alert("Usuario guardado exitosamente");
            window.location.reload();
          } else {
            throw new Error("No se pudo agregar el usuario");
          }
        } 
        else {
          alert("El usuario ya existe, por favor intente con otro DNI");
        }
      }
      else {
        const updateClient = await fetch(
          `https://localhost:7293/api/samusa/cliente/modificar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedUser),
          }
        );

        if (updateClient.ok) {
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
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-blue-200 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-blue-600 px-4 py-4 sm:px-6">
          {isEditing ? <h3 className="text-lg font-medium leading-6 text-white">Editar Usuario</h3> : <h3 className="text-lg font-medium leading-6 text-white">Agregar Usuario</h3>}
          </div>
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      value={editedUser.dni}
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
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={editedUser.nombre}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="primerApellido"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Primer Apellido
                    </label>
                    <input
                      type="text"
                      name="primerApellido"
                      id="primerApellido"
                      value={editedUser.primerApellido}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="segundoApellido"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Segundo Apellido
                    </label>
                    <input
                      type="text"
                      name="segundoApellido"
                      id="segundoApellido"
                      value={editedUser.segundoApellido}
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
                      Teléfono
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      id="telefono"
                      value={editedUser.telefono}
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
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={editedUser.email}
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
                        defaultChecked={editedUser.esNacional}
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
                      htmlFor="usuario"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Usuario
                    </label>
                    <input
                      type="text"
                      name="usuario"
                      id="usuario"
                      value={editedUser.usuario}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={editedUser.password}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
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
                      value={editedUser.direccion}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="rol"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Rol
                    </label>
                    <select
                      name="rol"
                      id="rol"
                      value={editedUser.rol}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div> 
  );
};

export default ClientModal;
