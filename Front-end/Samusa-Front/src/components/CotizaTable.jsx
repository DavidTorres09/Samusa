import React, { useState, useEffect } from 'react';
import CotizaModal from './CotizaModal'; // Importa el componente del modal
import "../css/Tables.css";
import "../Css/datatables.min.css"
import "../Css/datatables.css"

import $ from 'jquery';
import jszip from 'jszip';
import DataTable from 'datatables.net-dt';
import 'datatables.net-autofill-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-colreorder-dt';
import 'datatables.net-fixedcolumns-dt';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-keytable-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-rowgroup-dt';
import 'datatables.net-rowreorder-dt';
import 'datatables.net-scroller-dt';
import 'datatables.net-select-dt';
window.JSZip = jszip;


const CotizaTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [SelectedCotiza, setSelectedCotiza] = useState(null);
  const [query, SetQuery] = useState("");
  console.log(query);
  console.log(tableData.filter(item => item.producto.toLowerCase().includes("a")));

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/cotizacion/listar')
      .then(response => response.json())
      .then(data => {
        setTableData(data);
        // Asegúrate de que la tabla se inicialice solo después de que los datos estén listos
        setTimeout(() => {
          $(document).ready(function() {
            $('#example').DataTable({
              dom: 'Bfrtip',
              destroy: true, // Agrega esta opción aquí
              buttons: [
                'copy', 'csv', 'excel', 'print'
              ]
            });
          });
        }, 0);
      })
      .catch(error => console.error('Error fetching data:', error));

    // Esta parte de limpieza probablemente ya no sea necesaria con `destroy: true`
    // pero depende de tu implementación específica y si tienes problemas de memoria
    return () => {
      if ($.fn.DataTable.isDataTable('#example')) {
        $('#example').DataTable().destroy();
      }
    };
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
      <div className="table-container col-12 mb-30">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de Cotización</h1>

        <div class="table-controls">
          <button
            className="text-white font-bold py-2 px-4 rounded add-btn"
            onClick={handleSave}
          >
            Agregar Cotización
          </button>
          </div>
          
          <div className="">
          <div className="box-body">
          <table id="example" className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export">
            <thead>
              <tr className="">
                <th className="py-4 px-6">Id Cotización</th>
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
                  <td className="py-4 px-6">{item.idDni}</td>
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
      </div>
      </section>
      {showEditModal && (<CotizaModal user={SelectedCotiza} onClose={handleCloseModal} isEditing={isEditing}/>      )}

    </>
  );
};

export default CotizaTable;
