import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TrackingSearch = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(trackingNumber);
  };

  const handleSearch = (trackingNumber) => {
      const response = fetch(`https://localhost:7189/api/samusa/revisionContenedor/eliminar/${trackingNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedExporta),
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
    <div className="search-tracking">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese su número de seguimiento"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default TrackingSearch;
