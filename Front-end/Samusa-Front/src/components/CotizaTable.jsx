import React, { useState, useEffect } from 'react';
import CotizaModal from './CotizaModal'; // Importa el componente del modal
import "../css/Tables.css";

const CotizaTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [SelectedCotiza, setSelectedCotiza] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/cotizacion/listar')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (idcotizacion) => {
    fetch(`https://localhost:7293/api/samusa/cotizacion/eliminar?idcotizacion=${idcotizacion}`, {
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
          throw new Error(error.message || 'Error al eliminar la cotizacion');
        });
      }
    })
    .then(() => {
      console.log('Cotizacion eliminada exitosamente');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al eliminar la cotizacion:', error.message);
    });
  };

  const handleSave = () => {
    setSelectedCotiza(null);
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleEdit = (Cotiza) => {
    setSelectedCotiza(Cotiza);
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
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de cotizacion</h1>
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Agregar Cotizacion
          </button>
        <div className="">
          <table className="Cliente-table w-full table-auto border-collapse rounded">
            <thead>
              <tr className="">
                <th className="py-4 px-6">Id Cotizacion</th>
                <th className="py-4 px-6">Dni Colaborador</th>
                <th className="py-4 px-6">tipoProducto</th>
                <th className="py-4 px-6">producto</th>
                <th className="py-4 px-6">porcentajeImp</th>
                <th className="py-4 px-6">fechaCreacion</th>
                <th className="py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{item.idcotizacion}</td>
                  <td className="py-4 px-6">{item.idcolaborador}</td>
                  <td className="py-4 px-6">{item.tipoProducto}</td>
                  <td className="py-4 px-6">{item.producto}</td>
                  <td className="py-4 px-6">{item.porcentajeImp}</td>
                  <td className="py-4 px-6">{item.fechaCreacion}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.idcotizacion)}>Eliminar</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(item)}>Editar</button> {/* Pasar el objeto completo del pruducto */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </section>
      {showEditModal && (<CotizaModal user={SelectedCotiza} onClose={handleCloseModal} isEditing={isEditing}/>      )}

    </>
  );
};

export default CotizaTable;
