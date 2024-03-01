import React, { useState, useEffect } from 'react';
import LayoutAdmin from './LayoutAdmin';
import ColaboModal from './ColaboModal'; /* Aqui va el modal de colanoradores */
import "../css/Tables.css";

const ColaboTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedColabo, setSelectedColabo] = useState(null);
  const [query, SetQuery] = useState("");
  console.log(query);
  console.log(tableData.filter(item => item.nombre.toLowerCase().includes("a")));

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/colaborador/listar')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (dni) => {
    fetch(`https://localhost:7293/api/samusa/colaborador/eliminar?dni=${dni}`, {
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
          throw new Error(error.message || 'Error al eliminar el colaborador');
        });
      }
    })
    .then(() => {
      console.log('Colaborador eliminado exitosamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al eliminar el colaborador:', error.message);
    });
  };

  const handleSave = () => {
    setSelectedColabo(null);
    setIsEditing(false);
    setShowEditModal(true);
  };
  
  const handleEdit = (Colab) => {
    setSelectedColabo(Colab);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };
  

  return (
    <>
      <section className='data-table-section'>
      <div className="table-container">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de Colaboradores</h1>
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Agregar Usuario
          </button>

          <br />
          <br />
          
          <input type="text" placeholder='Buscar' className='search' onChange={(e) => SetQuery(e.target.value)} />

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
                <th className="py-4 px-6">Fecha de ingreso</th>
                <th className="py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.filter(item => item.nombre.toLowerCase().includes(query)).map((item, index) => (
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
                  <td className="py-4 px-6">{item.fechaIngreso}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.dni)}>Eliminar</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(item)}>Editar</button> {/* Pasa el objeto completo del cliente */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </section>

      {showEditModal && (<ColaboModal user={selectedColabo} onClose={handleCloseModal} isEditing={isEditing} />)}

    </>
  );
};

export default ColaboTable;