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
            
                    <br />
                    <div class="col-md-4 mb-30">
                        <div class="box">
                            <div class="box-head">
                                <h4 class="title">Herramientas externas</h4>
                            </div>
                            <div class="box-body">
                                <a href="https://www.autocheck.com/vehiclehistory/" class="button button-primary button-outline" target="_blank" rel="noopener noreferrer"><span>Verificacion de VIN</span></a>
                                <a href="https://serviciosnet.hacienda.go.cr/autohacienda/"  class="button button-primary button-outline" target="_blank" rel="noopener noreferrer"><span>Clases tributarias</span></a>
                                <a href="https://ticaconsultas.hacienda.go.cr/Tica/hrgdeclarantescedula.aspx/"  class="button button-primary button-outline" target="_blank" rel="noopener noreferrer"><span>Verificacion de importadores</span></a>
                                <a href="https://ticaconsultas.hacienda.go.cr/Tica/hskmovstk.aspx" class="button button-primary button-outline" target="_blank" rel="noopener noreferrer"><span>Verificacion de movimientos</span></a>
                                <a href="https://ticaconsultas.hacienda.go.cr/Tica/hcgcontenedores.aspx" class="button button-primary button-outline" target="_blank" rel="noopener noreferrer"><span>Verificacion de contenedores</span></a>
                                <a href="https://ticaconsultas.hacienda.go.cr/Tica/hcimppon.aspx" class="button button-primary button-outline" target="_blank" rel="noopener noreferrer"><span>Informacion de DUAS</span></a>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                    <br />
        </div>
    );
}
export default AdminAlertsandbuttons;