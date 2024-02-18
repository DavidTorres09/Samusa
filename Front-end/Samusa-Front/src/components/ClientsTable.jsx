import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../pages/LayoutAdmin';
import ClientModal from './ClientModal'; // Importa el componente del modal
import "../css/Tables.css";

const ClientsTable = () => {
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/cliente/listar')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (dni) => {
    fetch(`https://localhost:7293/api/samusa/cliente/eliminar?dni=${dni}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        if (response.status === 204) {
          return;
        } else {
          return response.json().catch(() => ({}));
        }
      } else {
        return response.json().then(error => {
          throw new Error(error.message || 'Error al eliminar el cliente');
        });
      }
    })
    .then(() => {
      console.log('Cliente eliminado exitosamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al eliminar el cliente:', error.message);
    });
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <LayoutAdmin></LayoutAdmin>
      <section className='data-table-section'>
      <div className="table-container">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de Usuarios</h1>
        <div className="">
          <table className="Cliente-table w-full table-auto border-collapse rounded">
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
                <th className="py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{item.dni}</td>
                  <td className="py-4 px-6">{item.nombre}</td>
                  <td className="py-4 px-6">{item.primerApellido}</td>
                  <td className="py-4 px-6">{item.segundoApellido}</td>
                  <td className="py-4 px-6">{item.telefono}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">{item.esNacional ? 'Sí' : 'No'}</td>
                  <td className="py-4 px-6">{item.usuario}</td>
                  <td className="py-4 px-6">{item.password}</td>
                  <td className="py-4 px-6">{item.direccion}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.dni)}>Eliminar</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(item)}>Editar</button> {/* Pasar el objeto completo del cliente */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </section>
      {showEditModal && (
        <ClientModal user={selectedClient} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ClientsTable;
