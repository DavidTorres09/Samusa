import React, { useState, useEffect } from "react";
import ClientModal from "./ClientModal";
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

const ClientsTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [query, SetQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log(query);

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/cliente/listar")
      .then(response => response.json())
      .then(data => {
        if (data.codigo && data.codigo === "-1") {
          setErrorMessage(data.mensaje);
          setTableData([]); //limpia datos existentes
        } else if (data.length === 0) {
          setErrorMessage("No se encontraron clientes en la Base de datos.");
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

console.log(tableData);

  const handleDelete = (id) => {
    fetch(`https://localhost:7189/api/samusa/cliente/eliminar/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(id);
        if (response.ok) {
          if (response.status === 0) {
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
        <div className="table-container col-12 mb-30">
          <h1 className="text-3xl font-bold my-4 text-gray-800">
            Tabla de Clientes
          </h1>
          {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
          <div class="table-controls">
          <button
            className="text-white font-bold py-2 px-4 rounded add-btn"
            onClick={handleSave}
          >
            Agregar Cliente
          </button>
          </div>
          
          <div className="">
            <div className="box-body">
            <table id="example" className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export">
              <thead>
                <tr className="">
                <th className="py-4 px-6">ID de cliente</th>
                  <th className="py-4 px-6">DNI</th>
                  <th className="py-4 px-6">Nombre</th>
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
                {tableData.map((cliente, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-6">{cliente.id}</td>
                    <td className="py-4 px-6">{cliente.dni}</td>
                    <td className="py-4 px-6">{cliente.nombre}</td>
                    <td className="py-4 px-6">{cliente.telefono}</td>
                    <td className="py-4 px-6">{cliente.email}</td>
                    <td className="py-4 px-6">
                      {cliente.esNacional ? "Sí" : "No"}
                    </td>
                    <td className="py-4 px-6">{cliente.usuario}</td>
                    <td className="py-4 px-6">{cliente.contrasenna}</td>
                    <td className="py-4 px-6">{cliente.direccion}</td>
                    <td className="py-4 px-6">{cliente.nombreRol}</td>
                    <td className="py-4 px-6">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(cliente.id)}  >
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
        </div>
      </section>
      {showEditModal && (
        <ClientModal user={selectedClient} onClose={handleCloseModal} isEditing={isEditing}/>
      )}
    </>
  );
};

export default ClientsTable;