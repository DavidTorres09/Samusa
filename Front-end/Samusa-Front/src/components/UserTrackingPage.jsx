import React, { useState, useEffect } from 'react';
import ImportaModal from './ImportaModal';
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


const TrackingPage = () => {
  const [tableData, setTableData] = useState([]);
  const [query, SetQuery] = useState("");
  console.log(query);

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/importacion/listar')
      .then(response => response.json())
      .then(data => {
        setTableData(data);

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

const [tableData2, setTableData2] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/revisionAlmacen/listar')
      .then(response => response.json())
      .then(data => {
        setTableData2(data);

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
        $('#example2').DataTable().destroy();
      }
    };
}, []);

console.log(tableData);
console.log(tableData2);

  return (
    <>
      <section className='data-table-section'>
      <div className="table-container col-12 mb-30">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de Importacion</h1>

        <div className="">
          <div className="box-body">
          <table id="example" className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export">
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
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
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
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      </section>


      <section className='data-table-section'>
      <div className="table-container col-12 mb-30">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de revisiones de vehiculos</h1>

        <div className="">
          <div className="box-body">
          <table id="example2" className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export">
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
              </tr>
            </thead>
            <tbody>
              {tableData2.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">{item.idformAlmacen}</td>
                  <td className="py-4 px-6">{item.vin}</td>
                  <td className="py-4 px-6">{item.marca}</td>
                  <td className="py-4 px-6">{item.modelo}</td>
                  <td className="py-4 px-6">{item.extras}</td>
                  <td className="py-4 px-6">{item.color}</td>
                  <td className="py-4 px-6">{item.costoVehiculo}</td>
                  <td className="py-4 px-6">{item.anioVehiculo}</td>
                  <td className="py-4 px-6">{item.dniDueno}</td>
                  <td className="py-4 px-6">{item.placa}</td>
                  <td className="py-4 px-6">{item.estadoOp}</td>
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

export default TrackingPage;