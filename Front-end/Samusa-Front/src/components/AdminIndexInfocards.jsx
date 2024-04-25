import React, { useState, useEffect } from 'react';
import "../css/Template.css";
import "../css/Admin/Admin.css";
import "../Css/bootstrap.min.css"

const AdminInfoCards = () => {
  const [importaciones, setImportaciones] = useState([]);
  const [totalImportacionesMes, setTotalImportacionesMes] = useState(0);
  const [totalenDocumentacion, setTotalenDocumentacion] = useState(0);
  const [totalenFinalizado, setTotalenFinalizado] = useState(0);

  const [Exportaciones, setExportaciones] = useState([]);
  const [totalExportaciones, setTotalExportaciones] = useState(0);
  const [totalenPendienteCitaExp, setTotalenPendienteCitaExp] = useState(0);
  const [totalenFinalizadoExp, setTotalenFinalizadoExp] = useState(0);

  useEffect(() => {
    fetch('https://localhost:7189/api/samusa/importacion/listar')
      .then((response) => response.json())
      .then((data) => {
        setImportaciones(data);
        TotalImportacionesMes(data);
        calcularTotalDocumentacion(data);
        calcularTotalFinalizado(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch('https://localhost:7189/api/samusa/exportacion/listar')
      .then((response) => response.json())
      .then((data) => {
        setExportaciones(data);
        TotalExportaciones(data);
        calcularTotalPendienteCitaExp(data);
        calcularTotalFinalizadoExp(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const TotalImportacionesMes = (importaciones) => {
    const total = importaciones.length;

    setTotalImportacionesMes(total);
  };

  const calcularTotalDocumentacion = (importaciones) => {
    const total = importaciones.filter((importacion) => 
      importacion.prioridad === "Documentacion"
    ).length;

    setTotalenDocumentacion(total);
  };

  const calcularTotalFinalizado = (importaciones) => {
    const total = importaciones.filter((importacion) => 
      importacion.prioridad === "Finalizado"
    ).length;

    setTotalenFinalizado(total);
  };

  const TotalExportaciones = (Exportaciones) => {
    const total = Exportaciones.length;

    setTotalExportaciones(total);
  };

  const calcularTotalPendienteCitaExp = (Exportaciones) => {
    const total = Exportaciones.filter((Exportaciones) => 
    Exportaciones.estadoOp === "Pendiente de cita"
    ).length;

    setTotalenPendienteCitaExp(total);
  };

  const calcularTotalFinalizadoExp = (Exportaciones) => {
    const total = Exportaciones.filter((Exportaciones) => 
    Exportaciones.estadoOp === "Revisado"
    ).length;

    setTotalenFinalizadoExp(total);
  };

  return (
    <div className='row'>

            <div className='col-xlg-3 col-md-6 col-12 mb-30'>
                <div className='top-report'>

                    <div className='head'>
                        <h4>Numero de Importaciones</h4>
                        <a className='view'><i className='zmdi zmdi-eye'></i></a>
                        </div>

                        <div className='content'>
                        <h5>Cantidad de importaciones</h5>
                        <h2>{totalImportacionesMes}</h2>
                        </div>

                        <div className='footer'>
                            <div className='progess'>
                                <div className='progess-bar'></div>
                                <div className='content'>
                                <h5>En documentacion: {totalenDocumentacion} | Finalizados: {totalenFinalizado} </h5>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <div className='col-xlg-3 col-md-6 col-12 mb-30'>
                <div className='top-report'>

                    <div className="head">
                        <h4>Numero de Exportaciones</h4>
                        <a className='view'><i className='zmdi zmdi-eye'></i></a>
                        </div>

                        <div className='content'>
                        <h5>Total de Exportaciones</h5>
                        <h2>{totalExportaciones}</h2>
                        </div>

                        <div className='footer'>
                            <div className='progess'>
                                <div className='progess-bar'></div>
                                <div className='content'>
                                <h5>Pendientes de cita: {totalenPendienteCitaExp} | Revisados: {totalenFinalizadoExp} </h5>
                                </div>                            
                                </div>
                        </div>
                </div>
            </div>

    </div>
  );
};

export default AdminInfoCards;