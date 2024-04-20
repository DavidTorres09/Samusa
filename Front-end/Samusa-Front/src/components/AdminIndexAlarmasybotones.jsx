import React, { useState, useEffect } from 'react';
import "../css/Template.css";
import "../css/Admin/Admin.css";
import AdminAlarmas from './AdminAlarmas';
const AdminAlertsandbuttons = () => {

    return(
        <div>
            <div class="row mbn-30">
                    
                    <div class="col-md-8 mb-30">
                    <AdminAlarmas/>
                    </div>
            
                    
                    <div class="col-md-4 mb-30">
                        <div class="box">
                            <div class="box-head">
                                <h4 class="title">Herramientas externas</h4>
                            </div>
                            <div class="box-body">
                                <button class="button button-outline"><span>Verificacion de VIN</span></button>
                                <button class="button button-outline"><span>Clases tributarias</span></button>
                                <button class="button button-outline"><span>Verificacion de importadores</span></button>
                                <button class="button button-outline"><span>Verificacion de movimientos</span></button>
                                <button class="button button-outline"><span>Verificacion de cargas</span></button>
                                <button class="button button-outline"><span>Informacion de DUAS</span></button>
                            </div>
                        </div>
                    </div>
                    
                    </div>
        </div>
    );
}
export default AdminAlertsandbuttons;