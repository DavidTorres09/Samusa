import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TrackingSearch = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(trackingNumber);
  };

  const handleSearch = (trackingNumber) => {
      const response = fetch(`https://localhost:7189/api/samusa/tracking/listar/${trackingNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).
      then(response => response.json())
      .then(data => {
        if (data.codigo && data.codigo === "-1") {
          setErrorMessage(data.mensaje);
          setTableData([]); //limpia datos existentes
        } else if (data.length === 0) {
          setErrorMessage("No se encontraron cotizaciones en la Base de datos.");
        } else {
          setTableData(data);
          setErrorMessage(""); // Limpia mensaje de error 
        }

      })
    return () => {
      if ($.fn.DataTable.isDataTable('#example')) {
        $('#example').DataTable().destroy();
      }
    };    
  };

  return (
    <div>
          <div className="search-tracking">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese su número de seguimiento"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
        />
        <button className='btn btn-sm' type="submit">Buscar</button>
      </form>
    </div>


    <section className='data-table-section'>
      <div className="table-container col-12 mb-30">
        <h1 className="text-3xl font-bold my-4 text-gray-800">Tabla de Tracking</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="table-controls">
          </div>
          
          <div className="">
          <div className="box-body">
          <table id="example" className="display Cliente-table w-full table-auto border-collapse rounded Tablebg table table-bordered data-table data-table-export">
            <thead>
              <tr className="">
                <th className="py-4 px-6">Id</th>
                <th className="py-4 px-6">impSeguimientoId</th>
                <th className="py-4 px-6">expSeguimientoId</th>
                <th className="py-4 px-6">fechaInicio</th>
                <th className="py-4 px-6">fechaFinalizacion</th>
                <th className="py-4 px-6">estado</th>
                <th className="py-4 px-6">vin</th>
                <th className="py-4 px-6">marca</th>

                <th className="py-4 px-6">modelo</th>
                <th className="py-4 px-6">color</th>
                <th className="py-4 px-6">extras</th>
                <th className="py-4 px-6">estadoOp</th>

                <th className="py-4 px-6">naviera</th>
                <th className="py-4 px-6">puertoOrigen</th>
                <th className="py-4 px-6">puertoDestino</th>
                <th className="py-4 px-6">transportista</th>
              </tr>
            </thead>
            <tbody>
                  <td className="py-4 px-6">{ tableData.id ?
                  tableData.id
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.impSeguimientoId ?
                  tableData.impSeguimientoId
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.expSeguimientoId ?
                  tableData.expSeguimientoId
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.fechaInicio ?
                  tableData.fechaInicio
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.fechaFinalizacion ?
                  tableData.fechaFinalizacion
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.estado ?
                  tableData.estado
                :
                "Sin Data"}</td>
                  
                  <td className="py-4 px-6">{ tableData.vin ?
                  tableData.vin
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.marca ?
                  tableData.marca
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.modelo ?
                  tableData.modelo
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.color ?
                  tableData.color
                :
                "Sin Data"}</td>
                  <td className="py-4 px-6">{ tableData.extras ?
                  tableData.extras
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.estadoOp ?
                  tableData.estadoOp
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.naviera ?
                  tableData.naviera
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.puertoOrigen ?
                  tableData.puertoOrigen
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.puertoDestino ?
                  tableData.puertoDestino
                :
                "Sin Data"}</td>

                  <td className="py-4 px-6">{ tableData.transportista ?
                  tableData.transportista
                :
                "Sin Data"}</td>
            </tbody>
          </table>
        </div>
          </div>
      </div>
      </section>
    </div>
  );
};

export default TrackingSearch;
