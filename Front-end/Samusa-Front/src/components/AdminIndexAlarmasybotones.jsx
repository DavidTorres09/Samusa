import React, { useState, useEffect } from 'react';
import "../css/Template.css";
import "../css/Admin/Admin.css";
import AdminAlarmas from './AdminAlarmas';
const AdminAlertsandbuttons = () => {

    return(
        <div>
            <div className="row mbn-30">
                    
                    <div className="col-md-8 mb-30">
                    <AdminAlarmas/>
                    </div>
            
                    <br />
                    <div className="col-md-4 mb-30">
                        <div className="box">
                            <div className="box-head">
                                <h4 className="title">Herramientas externas</h4>
                            </div>
                            <div className="box-body">
                                <button className="button button-outline"><span>Verificacion de VIN</span></button>
                                <button className="button button-outline"><span>Clases tributarias</span></button>
                                <button className="button button-outline"><span>Verificacion de importadores</span></button>
                                <button className="button button-outline"><span>Verificacion de movimientos</span></button>
                                <button className="button button-outline"><span>Verificacion de cargas</span></button>
                                <button className="button button-outline"><span>Informacion de DUAS</span></button>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                    <br />
        </div>
    );
}
export default AdminAlertsandbuttons;