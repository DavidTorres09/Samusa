import React, { useState, useEffect } from "react";
import "../css/Template.css";
import "../css/Admin/Admin.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AdminIndexCharts = () => {
  const [RevisionesVEh, setRevisionesVEh] = useState([]);
  const [totalRevisionesVEh, setTotalRevisionesVEh] = useState(0);

  const [RevisionesRevC, setRevisionesRevC] = useState([]);
  const [totalRevisionesRevC, setTotalRevisionesRevC] = useState(0);

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/RevisionVehiculo/listar")
      .then((response) => response.json())
      .then((data) => {
        setRevisionesVEh(data);
        TotalRevisionesVEh(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const TotalRevisionesVEh = (RevisionesVEh) => {
    const total = RevisionesVEh.length;

    setTotalRevisionesVEh(total);
  };

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/revisionContenedor/listar")
      .then((response) => response.json())
      .then((data) => {
        setRevisionesRevC(data);
        TotalRevisionesRevC(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const TotalRevisionesRevC = (RevisionesRevC) => {
    const total = RevisionesRevC.length;

    setTotalRevisionesRevC(total);
  };

  const totalrevisiones = totalRevisionesVEh + totalRevisionesRevC;

  //////////////////ACA SE HACE LA LOGICA DE LA CHART 1
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const revVehiculosRes = await fetch(
        "https://localhost:7189/api/samusa/RevisionVehiculo/listar"
      ); //Se emñista vehiculos
      const revVehiculosData = await revVehiculosRes.json();

      const revContenedoresRes = await fetch(
        "https://localhost:7189/api/samusa/revisionContenedor/listar"
      ); //Se enlista contenedores
      const revContenedoresData = await revContenedoresRes.json();

      const vehiculosCounts = revVehiculosData.reduce((acc, item) => {
        //Se cuentan los vehiculos
        acc[item.estadoOP] = (acc[item.estadoOP] || 0) + 1; //Se verifican los estados y se cuentan
        return acc;
      }, {});

      const contenedoresCounts = revContenedoresData.reduce((acc, item) => {
        //Se cuentan los contenedores
        acc[item.estado] = (acc[item.estado] || 0) + 1; //Se verifican los estados y se cuentan
        return acc;
      }, {});

      //Se pasa al formato que dice higsharts que usemos
      const vehiculosData = Object.entries(vehiculosCounts).map(
        ([name, y]) => ({ name, y, stack: "Vehículos" })
      );
      const contenedoresData = Object.entries(contenedoresCounts).map(
        ([name, y]) => ({ name, y, stack: "Contenedores" })
      );

      setChartData([...vehiculosData, ...contenedoresData]);
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "column",
      backgroundColor: '#151722', //Fondo
      style: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", //Tipo letra
      }
    },
    title: {
      text: "Estado de Revisiones (Vehículos y Contenedores)",
      style: {
        color: '#ffffff',
      }
    },
    xAxis: {
      type: "category",
      labels: {
        style: {
          color: '#ffffff'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Cantidad",
        style: {
          color: '#ffffff'
        }
      },
      labels: {
        style: {
          color: '#ffffff'
        }
      }
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      style: {
        color: '#000000', //texto del tootip cuando te pones encima de la columna
      }
    },
    plotOptions: {
      column: {
        stacking: "normal",
        borderColor: '#000000' //Borde de las barras, negro para que resaltes mas
      },
    },
    series: [
      {
        name: "Vehículos",
        data: chartData.filter((item) => item.stack === "Vehículos"),
        stack: "Vehículos",
        color: '#0D47A1', //barras vehiculos
      },
      {
        name: "Contenedores",
        data: chartData.filter((item) => item.stack === "Contenedores"),
        stack: "Contenedores",
        color: '#fdd835', //barras contenedores
      },
    ],
    legend: {
      itemStyle: {
        color: '#ffffff', //Texto inferior
      }
    },
  };
  //////////////////ACA SE HACE LA LOGICA DE LA CHART 2
  const [chartData2, setChartData2] = useState([]); //Se debe de crear una constante para que almacene la data
  useEffect(() => {
    fetch('https://localhost:7189/api/samusa/RevisionVehiculo/listar') //Esto es basicamente igual que el de barrras dentro del espacio de rev vehiculos, solo se ajusto luego el char
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce((acc, item) => {
          acc[item.estadoOP] = (acc[item.estadoOP] || 0) + 1;
          return acc;
        }, {});
        const transformedData = Object.entries(counts).map(([name, y]) => ({ name, y }));
        setChartData2(transformedData);
      });
  }, []);

  const options2 = {
    chart: {
      type: 'pie',
      backgroundColor: '#151722', //Fondo
      style: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }
    },
    title: {
      text: 'Estado de revisiones de vehículos',
      style: {
        color: '#ffffff',
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        color: '#000000'
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: '#ffffff',
          },
          connectorColor: '#ffffff'
        }
      }
    },
    series: [{
      name: 'Porcentaje',
      data: chartData2,
      colors: [ //Colores de acuerdo a los estados posibles
        '#5dacbd', //De agreagrarse mas estados se debe de colocar un color aca
        '#24527a',
        '#a7bcb9',
        '#e0ebeb'
      ]
    }]
  };

  return (
    <div>
      <div class="row mbn-30">
        <div class="col-md-8 mb-30">
          <div class="box">
            <div class="box-head">
              <h4 class="title">Comparacion de contenedores y vehiculos</h4>
            </div>

            <div class="box-body">
              <div class="chart-legends-1 row">
                <div class="chart-legend-1 col-12 col-sm-4">
                  <h5 class="title">Total</h5>
                  <h3 class="value text-secondary">{totalrevisiones}</h3>
                </div>
                <div class="chart-legend-1 col-12 col-sm-4">
                  <h5 class="title">Total Vehiculos</h5>
                  <h3 class="value text-primary">{totalRevisionesVEh}</h3>
                </div>
                <div class="chart-legend-1 col-12 col-sm-4">
                  <h5 class="title">Total Contenedores</h5>
                  <h3 class="value text-warning">{totalRevisionesRevC}</h3>
                </div>
              </div>
              <div class="chartjs-revenue-statistics-chart">

                  <div className="chartcontainer">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options}
                    />
                  </div>

              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-30">
          <div class="box">
            <div class="box-head">
              <h4 class="title">Estados de vehiculos</h4>
            </div>
            <div class="box-body">
              <div class="chartjs-market-trends-chart">
              <div className="">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options2}
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminIndexCharts;
