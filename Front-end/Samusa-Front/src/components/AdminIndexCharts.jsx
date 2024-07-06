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

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch("https://localhost:7189/api/samusa/RevisionVehiculo/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    })
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
    fetch("https://localhost:7189/api/samusa/revisionContenedor/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    })
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
        "https://localhost:7189/api/samusa/RevisionVehiculo/listar", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        }
      ); //Se emñista vehiculos
      const revVehiculosData = await revVehiculosRes.json();

      const revContenedoresRes = await fetch(
        "https://localhost:7189/api/samusa/revisionContenedor/listar", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        }
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
    fetch('https://localhost:7189/api/samusa/RevisionVehiculo/listar', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    }) //Esto es basicamente igual que el de barrras dentro del espacio de rev vehiculos, solo se ajusto luego el char
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
      <div className="row mbn-30">
        <div className="col-md-8 mb-30">
          <div className="box">
            <div className="box-head">
              <h4 className="title">Comparación de contenedores y vehículos</h4>
            </div>

            <div className="box-body">
              <div className="chart-legends-1 row">
                <div className="chart-legend-1 col-12 col-sm-4">
                  <h5 className="title">Total</h5>
                  <h3 className="value text-secondary">{totalrevisiones}</h3>
                </div>
                <div className="chart-legend-1 col-12 col-sm-4">
                  <h5 className="title">Total vehículos</h5>
                  <h3 className="value text-primary">{totalRevisionesVEh}</h3>
                </div>
                <div className="chart-legend-1 col-12 col-sm-4">
                  <h5 className="title">Total Contenedores</h5>
                  <h3 className="value text-warning">{totalRevisionesRevC}</h3>
                </div>
              </div>
              <div className="chartjs-revenue-statistics-chart">

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

        <div className="col-md-4 mb-30">
          <div className="box">
            <div className="box-head">
              <h4 className="title">Estados de vehículos</h4>
            </div>
            <div className="box-body">
              <div className="chartjs-market-trends-chart">
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
