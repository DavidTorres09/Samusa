import React, { useState, useEffect } from 'react';
import RevCModal from './RevCModal';
import "../css/Tables.css";

const RevCTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [SelectedRevC, setSelectedRevC] = useState(null);
  const [query, SetQuery] = useState("");

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/revisionContenedor/listar')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (idrevCont) => {
    fetch(`https://localhost:7293/api/samusa/revisionContenedor/eliminar?idrevCont=${idrevCont}`, {
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
          throw new Error(error.message || 'Error al eliminar la revision de Contenedor');
        });
      }
    })
    .then(() => {
      console.log('revision de Contenedor eliminada exitosamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al eliminar la revision de Contenedor:', error.message);
    });
  };

  const handleSave = () => {
    setSelectedRevC(null);
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleEdit = (Revc) => {
    setSelectedRevC(Revc);
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
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de revisiones de contenedores</h1>

        <div class="table-controls">
          <button
            className="text-white font-bold py-2 px-4 rounded add-btn"
            onClick={handleSave}
          >
            Agregar Contenedor
          </button>
          <input type="text" id="searchBox" placeholder='Buscar' className='search' onChange={(e) => SetQuery(e.target.value)} />
          </div>

        <div className="">
          <table className="Cliente-table w-full table-auto border-collapse rounded Tablebg">
          <thead>
              <tr className="">
                <th className="py-4 px-6">Id de formulario</th>
                <th className="py-4 px-6">Puerto Origen</th>
                <th className="py-4 px-6">Puerto Destino</th>
                <th className="py-4 px-6">Naviera</th>
                <th className="py-4 px-6">Transportista</th>
                <th className="py-4 px-6">Dni del dueño</th>
                <th className="py-4 px-6">Estado</th>
                <th className="py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.filter(item => item.puertoDestino.toUpperCase().includes(query) || item.vin.toLowerCase().includes(query)).map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{item.idrevCont}</td>
                  <td className="py-4 px-6">{item.puertoOrigen}</td>
                  <td className="py-4 px-6">{item.puertoDestino}</td>
                  <td className="py-4 px-6">{item.naviera}</td>
                  <td className="py-4 px-6">{item.transportista}</td>
                  <td className="py-4 px-6">{item.dniDueno}</td>
                  <td className="py-4 px-6">{item.estado}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.IdrevCont)}>Eliminar</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(item)}>Editar</button> {/* Pasar el objeto completo del pruducto */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </section>
      {showEditModal && (<RevCModal user={SelectedRevC} onClose={handleCloseModal} isEditing={isEditing}/>      )}

    </>
  );
};

export default RevCTable;