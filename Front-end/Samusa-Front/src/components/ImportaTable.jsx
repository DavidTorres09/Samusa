import React, { useState, useEffect } from 'react';
import ImportaModal from './ImportaModal';
import "../css/Tables.css";

const ImportaTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [SelectedImporta, setSelectedImporta] = useState(null);
  const [query, SetQuery] = useState("");
  console.log(query);

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/importacion/listar')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (idimpSeguimiento) => {
    fetch(`https://localhost:7293/api/samusa/importacion/eliminar?IdimpSeguimiento=${idimpSeguimiento}`, {
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
          throw new Error(error.message || 'Error al eliminar la Importacion');
        });
      }
    })
    .then(() => {
      console.log('Importacion eliminada exitosamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al eliminar la Importacion:', error.message);
    });
  };

  const handleSave = () => {
    setSelectedImporta(null);
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleEdit = (Importa) => {
    setSelectedImporta(Importa);
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
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de Importacion</h1>

        <div class="table-controls">
          <button
            className="text-white font-bold py-2 px-4 rounded add-btn"
            onClick={handleSave}
          >
            Agregar Importacion
          </button>
          <input type="text" id="searchBox" placeholder='Buscar' className='search' onChange={(e) => SetQuery(e.target.value)} />
          </div>

        <div className="">
          <table className="Cliente-table w-full table-auto border-collapse rounded Tablebg">
            <thead>
              <tr className="">
                <th className="py-4 px-6">Id impSeguimiento</th>
                <th className="py-4 px-6">Id Dni</th>
                <th className="py-4 px-6">ID Rev Vehiculo</th>
                <th className="py-4 px-6">ID Rev Contenedor</th>
                <th className="py-4 px-6">Fecha Inicio</th>
                <th className="py-4 px-6">Fecha Finalizacion</th>
                <th className="py-4 px-6">FechaEsperada</th>
                <th className="py-4 px-6">Estado</th>
                <th className="py-4 px-6">Descripcion</th>
                <th className="py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.filter(item => item.prioridad.toLowerCase().includes(query)).map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{item.idimpSeguimiento}</td>
                  <td className="py-4 px-6">{item.idDni}</td>

                  <td className="py-4 px-6">{ item.idRevVehiculo ?
                  item.idRevVehiculo
                :
                "Campo no aplica"}</td>
                
                <td className="py-4 px-6">{ item.idRevContenedor ?
                  item.idRevContenedor
                :
                "Campo no aplica"}</td>          
                  <td className="py-4 px-6">{item.fechaInicio}</td>
                  <td className="py-4 px-6">{item.fechaFinalizacion}</td>
                  <td className="py-4 px-6">{item.fechaEsperada}</td>
                  <td className="py-4 px-6">{item.prioridad}</td>
                  <td className="py-4 px-6">{item.descripcion}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.idimpSeguimiento)}>Eliminar</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(item)}>Editar</button> {/* Pasar el objeto completo del pruducto */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </section>
      {showEditModal && (<ImportaModal user={SelectedImporta} onClose={handleCloseModal} isEditing={isEditing}/>      )}

    </>
  );
};

export default ImportaTable;
