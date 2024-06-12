import React, { useState, useEffect } from "react";
import "../css/Tables.css";
import "../Css/datatables.min.css";
import "../Css/datatables.css";
import TicketModal from "./TicketsModal";

import $ from "jquery";
import jszip from "jszip";
import DataTable from "datatables.net-dt";
import "datatables.net-autofill-dt";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import "datatables.net-colreorder-dt";
import "datatables.net-fixedcolumns-dt";
import "datatables.net-fixedheader-dt";
import "datatables.net-keytable-dt";
import "datatables.net-responsive-dt";
import "datatables.net-rowgroup-dt";
import "datatables.net-rowreorder-dt";
import "datatables.net-scroller-dt";
import "datatables.net-select-dt";
window.JSZip = jszip;

const TicketsTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [SelectedTicket, setSelectedTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://localhost:7189/api/samusa/Ticket/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo && data.codigo === "-1") {
          setErrorMessage(data.mensaje);
          setTableData([]); //limpia datos existentes
        } else if (data.length === 0) {
          setErrorMessage("No se encontraron casos en la Base de datos.");
        } else {
          setTableData(data);
          setErrorMessage(""); // Limpia mensaje de error
        }
        // Asegúra de que la tabla se inicialice
        setTimeout(() => {
          $(document).ready(function () {
            $("#example").DataTable({
              dom: "Bfrtip",
              destroy: true,
              buttons: ["copy", "csv", "excel", "print"],
            });
          });
        }, 0);
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      if ($.fn.DataTable.isDataTable("#example")) {
        $("#example").DataTable().destroy();
      }
    };
  }, []);

  const handleDelete = (id) => {
    fetch(`https://localhost:7189/api/samusa/Ticket/eliminar/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return;
          } else {
            return response.json().catch(() => ({}));
          }
        } else {
          return response.json().then((error) => {
            throw new Error(error.message || "Error al eliminar la Ticket");
          });
        }
      })
      .then(() => {
        console.log("Ticket eliminada exitosamente");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al eliminar la Ticket:", error.message);
      });
  };

  const handleSave = () => {
    setSelectedTicket(null);
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleEdit = (Cotiza) => {
    setSelectedTicket(Cotiza);
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
            Tabla de Ticket
          </h1>
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
              Agregar Ticket
            </button>
          </div>

          <div className="">
            <div className="box-body">
              <table
                id="example"
                className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export"
              >
                <thead>
                  <tr className="">
                    <th className="py-4 px-6">Numero de caso</th>
                    <th className="py-4 px-6">ID Colaborador</th>
                    <th className="py-4 px-6">ID Cliente</th>
                    <th className="py-4 px-6">Estado</th>
                    <th className="py-4 px-6">Prioridad</th>
                    <th className="py-4 px-6">Descripcion</th>
                    <th className="py-4 px-6">Respuestas</th>
                    <th className="py-4 px-6">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 px-6">{item.id}</td>
                      <td className="py-4 px-6">{item.colaboradorId}</td>
                      <td className="py-4 px-6">{item.clienteId}</td>
                      <td className="py-4 px-6">{item.estado}</td>
                      <td className="py-4 px-6">{item.prioridad}</td>
                      <td className="py-4 px-6">{item.descripcion}</td>
                      <td className="py-4 px-6">{item.respuesta}</td>
                      <td className="py-4 px-6">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(item.id)}
                        >
                          Eliminar
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                          onClick={() => handleEdit(item)}
                        >
                          Responder
                        </button>{" "}
                        {/* Pasar el objeto completo del pruducto */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
      {showEditModal && (
        <TicketModal
          user={SelectedTicket}
          onClose={handleCloseModal}
          isEditing={isEditing}
        />
      )}
    </>
  );
};

export default TicketsTable;
