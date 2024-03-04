import React, { useState, useEffect } from "react";
import ClientModal from "./ClientModal";
import "../css/Tables.css";

const ClientsTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [query, SetQuery] = useState("");
  console.log(query);

  useEffect(() => {
    fetch("https://localhost:7293/api/samusa/cliente/listar")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (dni) => {
    fetch(`https://localhost:7293/api/samusa/cliente/eliminar?dni=${dni}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return;
          } else {
            return response.json().catch(() => ({}));
          }
        } else {
          return response.json().then((error) => {
            throw new Error(error.message || "Error al eliminar el cliente");
          });
        }
      })
      .then(() => {
        alert("Cliente eliminado exitosamente");
        window.location.reload();
      })
      .catch((error) => {
       alert("Error al eliminar el cliente:", error.message);
      });
  };

  const handleSave = () => {
    setSelectedClient(null);
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };


  return (
    <>
      <section className="data-table-section">
        <div className="table-container">
          <h1 className="text-3xl font-bold my-4 text-gray-800">
            Tabla de Usuarios
          </h1>

          <div class="table-controls">
          <button
            className="text-white font-bold py-2 px-4 rounded add-btn"
            onClick={handleSave}
          >
            Agregar Usuario
          </button>
          <input type="text" id="searchBox" placeholder='Buscar' className='search' onChange={(e) => SetQuery(e.target.value)} />
          </div>
          
          <div className="">
            <table className="Cliente-table w-full table-auto border-collapse rounded Tablebg">
              <thead>
                <tr className="">
                  <th className="py-4 px-6">DNI</th>
                  <th className="py-4 px-6">Nombre</th>
                  <th className="py-4 px-6">Primer Apellido</th>
                  <th className="py-4 px-6">Segundo Apellido</th>
                  <th className="py-4 px-6">Teléfono</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Es Nacional</th>
                  <th className="py-4 px-6">Usuario</th>
                  <th className="py-4 px-6">Password</th>
                  <th className="py-4 px-6">Dirección</th>
                  <th className="py-4 px-6">Rol</th>
                  <th className="py-4 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tableData.filter(item => item.nombre.toLowerCase().includes(query)).map((cliente, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-6">{cliente.dni}</td>
                    <td className="py-4 px-6">{cliente.nombre}</td>
                    <td className="py-4 px-6">{cliente.primerApellido}</td>
                    <td className="py-4 px-6">{cliente.segundoApellido}</td>
                    <td className="py-4 px-6">{cliente.telefono}</td>
                    <td className="py-4 px-6">{cliente.email}</td>
                    <td className="py-4 px-6">
                      {cliente.esNacional ? "Sí" : "No"}
                    </td>
                    <td className="py-4 px-6">{cliente.usuario}</td>
                    <td className="py-4 px-6">{cliente.password}</td>
                    <td className="py-4 px-6">{cliente.direccion}</td>
                    <td className="py-4 px-6">{cliente.rol}</td>
                    <td className="py-4 px-6">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(cliente.dni)}  >
                        Eliminar
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(cliente)}>
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {showEditModal && (
        <ClientModal user={selectedClient} onClose={handleCloseModal} isEditing={isEditing}/>
      )}
    </>
  );
};

export default ClientsTable;