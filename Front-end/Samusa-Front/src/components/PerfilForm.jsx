
import React, { useState } from "react";
import Layout from './Layout';
import Footer from './Footer';

const PerfilForm = () => {

//     const modeloPerfil = {
//   dni: "",
//   nombre: "",
//   primerApellido: "",
//   segundoApellido: "",
//   telefono: "",
//   email: "",
//   esNacional: false,
//   usuario: "",
//   password: "",
//   fechaIngreso: "",
//   rol: "Colaborador",

// }
// const[perfil, setPerfil]=useState(modeloPerfil) //variable y funcion para almacenar la information y actualizar 





// const editarPerfil = async (perfil) => {
  
//   try{
//           const updateClient = await fetch(
//             `https://localhost:7293/api/samusa/cliente/modificar`,
//             {
//               method: "PUT",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(perfil),
//             }
//           );

//           if (updateClient.ok) {
//             alert("Usuario actualizado exitosamente");
//             window.location.reload();
//           } else {
//               throw new Error("No se pudo actualizar el usuario");
//           }
// }
//     catch (error) {
//         console.error("Error:", error.message);
//       }
// }





  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
    <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Editar Usuario</h2>
    <form className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
        <input type="text" name="dni" id="dni" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input type="text" name="nombre" id="nombre" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="primerApellido" className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido</label>
          <input type="text" name="primerApellido" id="primerApellido" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="segundoApellido" className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
          <input type="text" name="segundoApellido" id="segundoApellido" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input type="text" name="telefono" id="telefono" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name="email" id="email" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" readOnly />
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" name="esNacional" id="esNacional" className="mr-2" />
        <label htmlFor="esNacional" className="text-sm font-medium text-gray-700">Es Nacional</label>
      </div>
      <div className="flex flex-col">
        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
        <input type="text" name="usuario" id="usuario" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" readOnly />
      </div>
      <div className="flex flex-col">
        <label htmlFo
        r="direccion" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input type="text" name="direccion" id="direccion" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500" />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="w-1/2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default PerfilForm;
