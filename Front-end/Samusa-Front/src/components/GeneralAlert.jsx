import React, { useState, useEffect } from "react";
import AlarmaList from "./AdminAlarmaList";
import AdminAlarmaModal from "./AdminAlarmaModal";

const GeneralAlert = () => {
  const [Alarmas, setAlarmas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/Alarma/listar")
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo && data.codigo === "-1") {
          setErrorMessage(data.mensaje);
          setAlarmas([]);
        } else if (data.length === 0) {
          setErrorMessage("No se encontraron alarmas en la base de datos.");
        } else {
          setAlarmas(data);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.error("Error fetching alarmas:", error);
        setErrorMessage("Error al cargar las alarmas.");
      });
  }, []);

  return (
    <>
      <div class="">
        {Alarmas.map((Alarma) => (
          <div class="content text-center">
            <div class="alert alert-info text-warning" role="alert"><i class="zmdi zmdi-info"></i>
              Alarma:{" "}
              <a class="alert-link" href="#">
                -
              </a>{" "}
              {Alarma.descripcion}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GeneralAlert;
