import React, { useState, useEffect } from "react";
import "../Css/User/Cotizaciones.css";

function CotizacionesUser() {
  //manejo datos
  const [tableData, setTableData] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  //carga datos igual que en la tabla
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch("https://localhost:7189/api/samusa/cotizacion/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filtrar tipos de producto únicos, basicamente es para no repetir los tipo productos y asi que se muestre solo uno en las opciones
  const uniqueTypes = Array.from(
    new Set(tableData.map((item) => item.tipoProducto))
  );

  // Filtrar productos basados en el tipo producto seleccionado
  const filteredProducts = tableData.filter(
    (item) => item.tipoProducto === selectedType
  );

  //Asigna de acuerdo a lo que se seleciono el impuesto correspondiente con el valor de la tabla porcentajeImp
  const calculateTax = () => {
    const product = tableData.find((item) => item.producto === selectedProduct);
    const tax = product ? product.porcentajeIMP : 0;
    document.getElementById("result").innerHTML = `Impuesto Total: ${tax}%`;
  };

  return (
    <div className="CotizacionesTax">
      <div className="body">
      <section id="Tax-calculator">
        <div className="animate__animated animate__flipInX container">
          <h1 className="title">Porcentajes de impuestos</h1>
          <div className="form-group">
            <label htmlFor="tipoProducto" className="label">Tipo de producto</label>
            <select
              id="tipoProducto"
              onChange={(e) => setSelectedType(e.target.value)}
              className="select"
            >
              <option value="">Seleccione Un Tipo</option>
              {uniqueTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="producto" className="label">Producto</label>
            <select
              id="producto"
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={!selectedType}
              className="select"
            >
              <option value="">Seleccione Un Producto</option>
              {filteredProducts.map((product, index) => (
                <option key={index} value={product.producto}>
                  {product.producto}
                </option>
              ))}
            </select>
          </div>
          <button className="btn-form" type="button" onClick={calculateTax}>
            Impuesto total
          </button>
          <div id="result" className="result"></div>
        </div>
      </section>
    </div>
    </div>
  );
}

export default CotizacionesUser;
