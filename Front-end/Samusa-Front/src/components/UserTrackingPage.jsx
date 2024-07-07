import React, { useState, useEffect } from "react";
import "../css/Tables.css";
import "../Css/datatables.min.css";
import "../Css/datatables.css";
import { Link } from "react-router-dom";

import $ from "jquery";
import jszip from "jszip";
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

const MyTrackingPage = () => {
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [query, SetQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const agentId = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/importacion/listar", {
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
          setErrorMessage(
            "No se encontraron importaciones en la Base de datos."
          );
        } else {
          const filteredImp = data.filter(
            (imp) => imp.clienteId === parseInt(agentId)
          );
          setTableData(filteredImp);
          setErrorMessage(""); // Limpia mensaje de error
        }

        setTimeout(() => {
          $(document).ready(function () {
            $("#example").DataTable({
              dom: "Bfrtip",
              destroy: true,
              language: {
                url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-MX.json',
            },
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

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/exportacion/listar", {
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
          setTableData2([]); //limpia datos existentes
        } else if (data.length === 0) {
          setErrorMessage(
            "No se encontraron importaciones en la Base de datos."
          );
        } else {
          const filteredexp = data.filter(
            (exp) => exp.clienteId === parseInt(agentId)
          );
          setTableData2(filteredexp);
          setErrorMessage(""); // Limpia mensaje de error
        }

        setTimeout(() => {
          $(document).ready(function () {
            $("#example2").DataTable({
              dom: "Bfrtip",
              destroy: true,
              language: {
                url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-MX.json',
            },
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

  return (
    <>
      <div>
        <br />
        <Link to="/User/TrackingSearch">
          <button className="btn button-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </button>
        </Link>
      </div>
      <section className="data-table-section">
        <div className="table-container col-12 mb-30">
          <h1 className="text-3xl font-bold my-4 text-gray-800">
            Mis Importaciones
          </h1>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="">
            <div className="box-body">
              <table
                id="example"
                className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export"
              >
                <thead>
                  <tr className="">
                    <th className="py-4 px-6">Numero de seguimiento</th>
                    <th className="py-4 px-6">Id Dni</th>
                    <th className="py-4 px-6">Tipo de tramite</th>
                    <th className="py-4 px-6">Fecha Inicio</th>
                    <th className="py-4 px-6">Fecha Finalizacion</th>
                    <th className="py-4 px-6">Estado</th>
                    <th className="py-4 px-6">Descargas</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 px-6">{item.impSeguimientoId}</td>
                      <td className="py-4 px-6">{item.clienteId}</td>

                      <td className="py-4 px-6">
                        {item.revVehiculoId
                          ? "Asociado a vehiculo"
                          : "Asociado a contenedor"}
                      </td>

                      <td className="py-4 px-6">{item.fechaInicio}</td>
                      <td className="py-4 px-6">
                        {item.fechaFinalizacion
                          ? item.fechaFinalizacion
                          : "Aun sin determinar"}
                      </td>
                      <td className="py-4 px-6">{item.prioridad}</td>
                      <td className="py-4 px-6">
                        <a
                          href={item.documentoUrl}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded ml-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver documentos
                        </a>{" "}
                        <a></a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="data-table-section">
        <div className="table-container col-12 mb-30">
          <h1 className="text-3xl font-bold my-4 text-gray-800">
            Mis Exportaciones
          </h1>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="">
            <div className="box-body">
              <table
                id="example2"
                className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export"
              >
                <thead>
                  <tr className="">
                    <th className="py-4 px-6">Numero de seguimiento</th>
                    <th className="py-4 px-6">Id Dni</th>
                    <th className="py-4 px-6">Tipo de tramite</th>
                    <th className="py-4 px-6">Fecha Inicio</th>
                    <th className="py-4 px-6">Fecha Finalizacion</th>
                    <th className="py-4 px-6">Estado</th>
                    <th className="py-4 px-6">Descargas</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData2.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 px-6">{item.expSeguimientoId}</td>
                      <td className="py-4 px-6">{item.clienteId}</td>

                      <td className="py-4 px-6">
                        {item.revVehiculoId
                          ? "Asociado a vehiculo"
                          : "Asociado a contenedor"}
                      </td>

                      <td className="py-4 px-6">{item.fechaInicio}</td>
                      <td className="py-4 px-6">
                        {item.fechaFinalizacion
                          ? item.fechaFinalizacion
                          : "Aun sin determinar"}
                      </td>
                      <td className="py-4 px-6">{item.prioridad}</td>
                      <td className="py-4 px-6">
                        <a
                          href={item.documentoUrl}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded ml-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver documentos
                        </a>{" "}
                        <a></a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyTrackingPage;
