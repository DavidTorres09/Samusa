import React, { useState, useEffect } from 'react';
import LayoutAdmin from './LayoutAdmin';
import ColaboModal from './ColaboModal'; /* Aqui va el modal de colanoradores */
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

const ColaboTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedColabo, setSelectedColabo] = useState(null);
  const [query, SetQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log(query);
  console.log(tableData.filter(item => item.nombre.toLowerCase().includes("a")));

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch('https://localhost:7189/api/samusa/colaborador/listar', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.codigo && data.codigo === "-1") {
          setErrorMessage(data.mensaje);
          setTableData([]); //limpia datos existentes
        } else if (data.length === 0) {
          setErrorMessage("No se encontraron colaboradores en la Base de datos.");
        } else {
          setTableData(data);
          setErrorMessage(""); // Limpia mensaje de error 
        }

        setTimeout(() => {
          $(document).ready(function() {
            $('#example').DataTable({
              dom: 'Bfrtip',
              destroy: true,
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
    fetch(`https://localhost:7189/api/samusa/colaborador/eliminar/${id}`, {
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
      <div className="table-container col-12 mb-30">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de Colaboradores</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="table-controls">
          <button
            className="text-white font-bold py-2 px-4 rounded add-btn"
            onClick={handleSave}
          >
            Agregar Colaborador
          </button>
          </div>

        <div className="">
          <div className="box-body">
          <table id="example" className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export">
            <thead>
              <tr className="">
                  <th className="py-4 px-6">ID de colaborador</th>
                  <th className="py-4 px-6">DNI</th>
                  <th className="py-4 px-6">Nombre</th>
                  <th className="py-4 px-6">Teléfono</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Es Nacional</th>
                  <th className="py-4 px-6">Usuario</th>
                  <th className="py-4 px-6">Dirección</th>
                  <th className="py-4 px-6">Rol</th>
                <th className="py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.filter(item => item.nombre.toLowerCase().includes(query)).map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-6">{item.id}</td>
                    <td className="py-4 px-6">{item.dni}</td>
                    <td className="py-4 px-6">{item.nombre}</td>
                    <td className="py-4 px-6">{item.telefono}</td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">
                      {item.esNacional ? "Sí" : "No"}
                    </td>
                    <td className="py-4 px-6">{item.usuario}</td>
                    <td className="py-4 px-6">{item.direccion}</td>
                    <td className="py-4 px-6">{item.nombreRol}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEdit(item)}>Editar</button> {/* Pasa el objeto completo del cliente */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      </section>

      {showEditModal && (<ColaboModal user={selectedColabo} onClose={handleCloseModal} isEditing={isEditing} />)}

    </>
  );
};

export default ColaboTable;