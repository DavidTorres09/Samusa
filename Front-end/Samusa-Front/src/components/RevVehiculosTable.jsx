import React, { useState, useEffect } from 'react';
import RevVehiculosModal from './RevVehiculosModal'; // Importa el componente del modal
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

const RevVehiculosTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [SelectedRevVeh, setSelectedRevVeh] = useState(null);
  const [query, SetQuery] = useState("");
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('https://localhost:7189/api/samusa/RevisionVehiculo/listar', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setTableData(data);

        setTimeout(() => {
          $(document).ready(function() {
            $('#example').DataTable({
              dom: 'Bfrtip',
              destroy: true,
              language: {
                url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-MX.json',
            },
              buttons: [
                'copy', 'csv', 'excel', 'print'
              ]
            });
          });
        }, 0);
      })
      .catch(error => console.error('Error fetching data:', error));

    return () => {
      if ($.fn.DataTable.isDataTable('#example')) {
        $('#example').DataTable().destroy();
      }
    };
}, []);

  const handleDelete = (id) => {
    fetch(`https://localhost:7189/api/samusa/RevisionVehiculo/eliminar/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
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
      alert('revision eliminada exitosamente');
      window.location.reload();
    })
    .catch(error => {
      alert('Error al eliminar la revision:', error.message);
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
      <div className="table-container col-12 mb-30">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de revisiones de vehículos</h1>

        <div className="table-controls">
          <button
            className="text-white font-bold py-2 px-4 rounded add-btn"
            onClick={handleSave}
          >
            Agregar Vehiculo
          </button>
          </div>

        <div className="">
          <div className="box-body">
          <table id="example" className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export">
            <thead>
              <tr className="">
                <th className="py-4 px-6">Id de formulario</th>
                <th className="py-4 px-6">VIN</th>
                <th className="py-4 px-6">Marca</th>
                <th className="py-4 px-6">Modelo</th>
                <th className="py-4 px-6">Extras</th>
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
              {tableData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6">{item.vin}</td>
                  <td className="py-4 px-6">{item.marca}</td>
                  <td className="py-4 px-6">{item.modelo}</td>
                  <td className="py-4 px-6">{item.extras}</td>
                  <td className="py-4 px-6">{item.color}</td>
                  <td className="py-4 px-6">{item.costoVehiculo}</td>
                  <td className="py-4 px-6">{item.annoVehiculo}</td>
                  <td className="py-4 px-6">{item.dniDuenno}</td>
                  <td className="py-4 px-6">{item.placa}</td>
                  <td className="py-4 px-6">{item.estadoOP}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.id)}>Eliminar</button>
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
      {showEditModal && (<RevVehiculosModal user={SelectedRevVeh} onClose={handleCloseModal} isEditing={isEditing}/>      )}

    </>
  );
};

export default RevVehiculosTable;