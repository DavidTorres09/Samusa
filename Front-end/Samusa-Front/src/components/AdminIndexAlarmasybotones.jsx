import React, { useState, useEffect } from 'react';
import "../css/Template.css";
import "../css/Admin/Admin.css";
const AdminAlertsandbuttons = () => {

    return(
        <div>
            <div class="row mbn-30">
                    
                    <div class="col-md-8 mb-30">
                      
                        <div class="box boxa">
                            <div class="box-head">
                                <h4 class="title">Alertas</h4>
                            </div>
                            <div class="box-body">
                               
                                <div class="news-update-inner">
                                                    
                                    <div class="news-item">
            
                              
                                        <div class="content">
                                  
                                            <div class="categories">
                                                <a href="#" class="new">Detalle de la alerta</a>
                                            </div>
                                  
                                            <h4 class="title"><a href="#">Sed do eiusmod typesetting industry. Lorem Ipsum is simplydummy text of the printing and typesetting industry.</a></h4>
                                     
                                            <ul class="meta">
                                                <li><i class="zmdi zmdi-time"></i>31-03-2024</li>
                                                <li>Status: <a href="#">Inactiva</a></li>
                                            </ul>
                                        </div>
            
                                    </div>
            
                                </div>
                            </div>
                        </div>
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