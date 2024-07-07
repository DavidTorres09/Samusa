import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/User/Tracking.css";

const TrackingSearch = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(trackingNumber);
  };

  const handleSearch = (trackingNumber) => {
    const token = sessionStorage.getItem("token");
    const response = fetch(
      `https://localhost:7189/api/samusa/tracking/listar/${trackingNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo && data.codigo === "-1") {
          setErrorMessage(data.mensaje);
          setTableData([]); //limpia datos existentes
          alert("No se encontraron cotizaciones en la Base de datos.");
        } else if (data.length === 0) {
          setErrorMessage(
            "No se encontraron cotizaciones en la Base de datos."
          );
        } else {
          setTableData(data);
          setErrorMessage(""); // Limpia mensaje de error
        }
      });
    return () => {
      if ($.fn.DataTable.isDataTable("#example")) {
        $("#example").DataTable().destroy();
      }
    };
  };

  return (
    <div>
      <div className="search-tracking">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=" # de seguimiento"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
          />
          <button className="btn btn-sm" type="submit">
            Buscar
          </button>
        </form>
      </div>

      <div>
        <Link to="/User/MyTracking">
          <button className="btn btn-sm">Mis Tramites</button>
        </Link>
      </div>

      <section className="tracklist">
        <div className=" menu-container">
          {tableData.impSeguimientoId ? (
            <div>
              <h1 className="title">Importacion</h1>
              <ul className="item-list">
                {tableData.vin ? (
                  <div>
                    <h1 className="title">Vehiculo</h1>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">ID</span>
                      <span className="item-detail">{tableData.id}</span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Numero de IMP</span>
                      <span className="item-detail">
                        {tableData.impSeguimientoId}
                      </span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Inicio</span>
                      <span className="item-detail">
                        {tableData.fechaInicio}
                      </span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Finalizado</span>
                      <span className="item-detail">
                        {tableData.fechaFinalizacion}
                      </span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Estado Tramite</span>
                      <span className="item-detail">{tableData.estado}</span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Estado DEKRA</span>
                      <span className="item-detail">{tableData.estadoOp}</span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">VIN</span>
                      <span className="item-detail">{tableData.vin}</span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Marca</span>
                      <span className="item-detail">{tableData.marca}</span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Modelo</span>
                      <span className="item-detail">{tableData.modelo}</span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Color</span>
                      <span className="item-detail">{tableData.color}</span>
                    </li>
                    <li className="item">
                      <div className="item-box white-box"></div>
                      <span className="item-name">Extras</span>
                      <span className="item-detail">{tableData.extras}</span>
                    </li>
                  </div>
                ) : (
                  <div>
                    {tableData.naviera ? (
                      <div>
                        <h1 className="title">Contenedor</h1>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">ID</span>
                          <span className="item-detail">{tableData.id}</span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Numero de IMP</span>
                          <span className="item-detail">
                            {tableData.impSeguimientoId}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Estado Tramite</span>
                          <span className="item-detail">
                            {tableData.estado}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Naviera</span>
                          <span className="item-detail">
                            {tableData.naviera}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Puerto de origen</span>
                          <span className="item-detail">
                            {tableData.puertoOrigen}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Puerto de destino</span>
                          <span className="item-detail">
                            {tableData.puertoDestino}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Transportista</span>
                          <span className="item-detail">
                            {tableData.transportista}
                          </span>
                        </li>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </ul>
            </div>
          ) : (
            <div>
              {tableData.expSeguimientoId ? (
                <div>
                  <h1 className="title">Exportacion</h1>
                  <ul className="item-list">
                    {tableData.vin ? (
                      <div>
                        <h1 className="title">Vehiculo</h1>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">ID</span>
                          <span className="item-detail">{tableData.id}</span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Numero de EXP</span>
                          <span className="item-detail">
                            {tableData.expSeguimientoId}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Inicio</span>
                          <span className="item-detail">
                            {tableData.fechaInicio}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Finalizado</span>
                          <span className="item-detail">
                            {tableData.fechaFinalizacion}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Estado Tramite</span>
                          <span className="item-detail">
                            {tableData.estado}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Estado DEKRA</span>
                          <span className="item-detail">
                            {tableData.estadoOp}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">VIN</span>
                          <span className="item-detail">{tableData.vin}</span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Marca</span>
                          <span className="item-detail">{tableData.marca}</span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Modelo</span>
                          <span className="item-detail">
                            {tableData.modelo}
                          </span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Color</span>
                          <span className="item-detail">{tableData.color}</span>
                        </li>
                        <li className="item">
                          <div className="item-box white-box"></div>
                          <span className="item-name">Extras</span>
                          <span className="item-detail">
                            {tableData.extras}
                          </span>
                        </li>
                      </div>
                    ) : (
                      <div>
                        {tableData.naviera ? (
                          <div>
                            <h1 className="title">Contenedor</h1>
                            <li className="item">
                              <div className="item-box white-box"></div>
                              <span className="item-name">ID</span>
                              <span className="item-detail">
                                {tableData.id}
                              </span>
                            </li>
                            <li className="item">
                              <div className="item-box white-box"></div>
                              <span className="item-name">Numero de EXP</span>
                              <span className="item-detail">
                                {tableData.expSeguimientoId}
                              </span>
                            </li>
                            <li className="item">
                              <div className="item-box white-box"></div>
                              <span className="item-name">Estado Tramite</span>
                              <span className="item-detail">
                                {tableData.estado}
                              </span>
                            </li>
                            <li className="item">
                              <div className="item-box white-box"></div>
                              <span className="item-name">Naviera</span>
                              <span className="item-detail">
                                {tableData.naviera}
                              </span>
                            </li>
                            <li className="item">
                              <div className="item-box white-box"></div>
                              <span className="item-name">
                                Puerto de origen
                              </span>
                              <span className="item-detail">
                                {tableData.puertoOrigen}
                              </span>
                            </li>
                            <li className="item">
                              <div className="item-box white-box"></div>
                              <span className="item-name">
                                Puerto de destino
                              </span>
                              <span className="item-detail">
                                {tableData.puertoDestino}
                              </span>
                            </li>
                            <li className="item">
                              <div className="item-box white-box"></div>
                              <span className="item-name">Transportista</span>
                              <span className="item-detail">
                                {tableData.transportista}
                              </span>
                            </li>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </ul>
                </div>
              ) : (
                <div>
                  <h1 className="title">Ingresa tu numero de seguimiento</h1>
                </div>
              )}
            </div>
          )}
        </div>
        <br />
        <br />
      </section>

      <br />
      <br />
    </div>
  );
};

export default TrackingSearch;
