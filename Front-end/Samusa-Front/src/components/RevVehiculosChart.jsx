import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function RevVehiculosChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7293/api/samusa/revisionAlmacen/listar') //Nos conectamos al api
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce((acc, item) => { //Se crea la const counts para contar cuantas veces se repite cada una de las 4 opciones de estado
          acc[item.estadoOp] = (acc[item.estadoOp] || 0) + 1; //Aca esta gyardando en el array las veces que hay los diferentes estados
          return acc;
        }, {}); 
        //Se pasa al formato que dice higsharts que usemos
        const transformedData = Object.entries(counts).map(([name, y]) => ({ name, y }));
  
        setChartData(transformedData);
      });
  }, []);
  

  const options = { //Esta es ya la estructura de highsharts
    chart: {
      type: 'column', //Grafico de columnas
    },
    title: {
      text: 'Estado de vehiculos',
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Estado',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad',
      },
    },
    series: [
      {
        name: 'Cantidad',
        data: chartData, //Se agarran los datos que se setearon aca = setChartData(transformedData);
        dataLabels: {
          enabled: true,
          format: '{point.y}',
        },
      },
    ],
  };
  

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default RevVehiculosChart;
