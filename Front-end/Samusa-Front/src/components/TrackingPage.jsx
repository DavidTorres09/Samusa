import React, { useState, useEffect } from 'react';
import "../css/Template.css";
import "../css/Admin/Admin.css";
import "../Css/bootstrap.min.css"
const TrackPage = () => {
  return (
    <div>

      <div className="row justify-content-between align-items-center mb-10">
        <div className="col-12 col-lg-auto mb-10">
          <div className="page-heading">
            <h3>
              Tracking <span>/ Exportaciones e Importaciones</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="row mbn-15">

<div className="col-12 mb-10">
    <div className="row mbn-15">
        <div className="col-12 col-md-2 mb-15">
            <h4 className="fw-800 m-0">Seguimiento # xxxx</h4>
        </div>
        <div><span>Status: <span className="badge badgestatus badge-success">Aca va el estado de la imp/exp</span></span></div>
        <div className="text-left text-md-right col-12 col-md-4 mb-15">
            <p>xx xxxx, xxxx fecha de imp/exp</p>
        </div>
    </div>
</div>



<div className="col-12 mb-20">
    <div className="order-details-customer-info row mbn-20">

     
        <div className="col-lg-4 col-md-6 col-11 mb-15">
            <h4 className="fw-600 mb-25">Informacion de imp/exp</h4>
            <br />
            <ul>
                <li> <span>Cliente:</span> <span>Jonathin doe</span> </li>
                <li> <span>Fecha de Inicio</span> <span>xx/xx/xxxx</span> </li>
                <li> <span>Fecha esperada</span> <span>xx/xx/xxxx</span> </li>
                <li> <span>Revision</span> <span>contenedor.</span> </li>
                <li> <span># de revision</span> <span>xxxx</span> </li>
                <li> <span>Descripcion</span> <span>En espera de previo</span> </li>
            </ul>
        </div>
 
        <div className="col-lg-4 col-md-6 col-12 mb-20">
            <h4 className="fw-600 mb-25">Revision Vehiculo</h4>
            <br />
            <ul>
                <li> <span>VIN</span> <span>XXXX</span> </li>
                <li> <span>Marca</span> <span>Toyota</span> </li>
                <li> <span>Modelo</span> <span>Corolla</span> </li>
                <li> <span>Color</span> <span>Negro</span> </li>
                <li> <span>Extras</span> <span>SemiFull</span> </li>
            </ul>
        </div>

        <div className="col-lg-4 col-md-6 col-12 mb-20">
            <h4 className="fw-600 mb-25">Tramite de revision</h4>
            <br />
            <ul>
                <li> <span className="h5 fw-600">Estado</span> <span className="h5 fw-600 text-warning">En espera de documentacion</span> </li>
            </ul>
        </div>
 

    </div>
</div>
    </div>

    </div>
  );
};
export default TrackPage;
