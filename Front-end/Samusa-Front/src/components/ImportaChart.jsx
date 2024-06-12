import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../Css/User/Dashboardcard.css";

function ImportaChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://localhost:7189/api/samusa/importacion/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregar el token como encabezado de autorización
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce((acc, item) => {
          //Se crea la const counts para contar cuantas veces se repite cada una de las 4 opciones de estado
          acc[item.prioridad] = (acc[item.prioridad] || 0) + 1; //Aca esta gyardando en el array las veces que hay los diferentes estados
          return acc;
        }, {});
        //Se pasa al formato que dice higsharts que usemos
        const transformedData = Object.entries(counts).map(([name, y]) => ({
          name,
          y,
        })); //Aca como vemos pasa el nombre del esatdo y la cantidad

        setChartData(transformedData);
      });
  }, []);

  const options = {
    //Esta es ya la estructura de highsharts
    chart: {
      type: "column", //Grafico de columnas
      style: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", //Tipo letra
      },
    },
    title: {
      text: "Estado de importaciones",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Estado",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Cantidad",
      },
    },
    series: [
      {
        name: "Cantidad",
        data: chartData, //Se agarran los datos que se setearon aca = setChartData(transformedData);
        color: "#0D47A1",
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    ],
  };

  return (
    <div>
      <section id="dashboard">
        <br />
        <div className="cards-container">
          <div className="card Center-card hvr-bubble-float-left">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ImportaChart;
