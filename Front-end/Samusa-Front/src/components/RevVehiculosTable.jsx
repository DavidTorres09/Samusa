import React, { useState, useEffect } from 'react';
import RevVehiculosModal from './RevVehiculosModal'; // Importa el componente del modal
import "../css/Tables.css";

const RevVehiculosTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [SelectedRevVeh, setSelectedRevVeh] = useState(null);
  const [query, SetQuery] = useState("");

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/revisionAlmacen/listar')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (idformAlmacen) => {
    fetch(`https://localhost:7293/api/samusa/revisionAlmacen/eliminar?idformAlmacen=${idformAlmacen}`, {
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
          throw new Error(error.message || 'Error al eliminar la revision de Almacen');
        });
      }
    })
    .then(() => {
      console.log('revision de Almacen eliminada exitosamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al eliminar la revision de Almacen:', error.message);
    });
  };

  const handleSave = () => {
    setSelectedRevVeh(null);
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleEdit = (Cotiza) => {
    setSelectedRevVeh(Cotiza);
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
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de revisiones de vehiculos</h1>

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
                <th className="py-4 px-6">Id de formulario</th>
                <th className="py-4 px-6">VIN</th>
                <th className="py-4 px-6">Marca</th>
                <th className="py-4 px-6">Modelo</th>
                <th className="py-4 px-6">Color</th>
                <th className="py-4 px-6">Costo de vehiculo</th>
                <th className="py-4 px-6">Año de vehiculo</th>
                <th className="py-4 px-6">Dni del dueño</th>
                <th className="py-4 px-6">Placa</th>
                <th className="py-4 px-6">Estado de revision con Dekra</th>
                <th className="py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.filter(item => item.vin.toUpperCase().includes(query) || item.vin.toLowerCase().includes(query)).map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{item.idformAlmacen}</td>
                  <td className="py-4 px-6">{item.vin}</td>
                  <td className="py-4 px-6">{item.marca}</td>
                  <td className="py-4 px-6">{item.modelo}</td>
                  <td className="py-4 px-6">{item.color}</td>
                  <td className="py-4 px-6">{item.costoVehiculo}</td>
                  <td className="py-4 px-6">{item.anioVehiculo}</td>
                  <td className="py-4 px-6">{item.dniDueno}</td>
                  <td className="py-4 px-6">{item.placa}</td>
                  <td className="py-4 px-6">{item.estadoOp}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.idformAlmacen)}>Eliminar</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(item)}>Editar</button> {/* Pasar el objeto completo del pruducto */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </section>
      {showEditModal && (<RevVehiculosModal user={SelectedRevVeh} onClose={handleCloseModal} isEditing={isEditing}/>      )}

    </>
  );
};

export default RevVehiculosTable;