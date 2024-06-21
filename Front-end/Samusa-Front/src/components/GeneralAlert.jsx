import React, { useState, useEffect } from "react";

const GeneralAlert = () => {
  const [Alarmas, setAlarmas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    fetch("https://localhost:7189/api/samusa/Alarma/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Error en la solicitud de red');
      }
      return response.json();
    })
    .then(data => {
        if (data.codigo && data.codigo === "-1") {
            setErrorMessage(data.mensaje);
            setAlarmas([]);
        } else if (data.length === 0) {
            setErrorMessage("No se encontraron alarmas en la base de datos.");
            setAlarmas([]);
        } else {
            setAlarmas(data);
            setErrorMessage("");
        }
    })
    .catch(error => {
        console.error("Error fetching alarmas:", error);
        setErrorMessage("Error al cargar las alarmas.");
    });

  }, []);

  

  return (
    <>
      <div className="">
        {Alarmas.map((Alarma) => (
          <div className="content text-center">
            <div className="alert alert-info text-warning" role="alert">
              <i className="zmdi zmdi-info"></i>
              Alarma:{" "}
              <a className="alert-link" href="#">
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
