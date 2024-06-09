import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RecuperarPass = () => {
  const [Email, setEmail] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePass = async () => {
    try {
      const response = await fetch(
        "https://localhost:7189/api/samusa/cliente/RecuperarAccesoCliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({Email}),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.codigo === "0") {
          navigate('/User/Login');
        } else {
          setError(data.mensaje);
        }
      } else {
        const errorMsg = await response.text();
        setError(`Ha ocurrido un error, favor contactar con soporte.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-300 to-cyan-400 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl font-bold mb-8">Samusa</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">
          Recuperar mi contraseña
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm text-center font-semibold text-gray-600 mb-1"
            >
              Para recuperar su contraseña por favor ingrese su correo
              electronico
            </label>
            <input
              type="email"
              id="correo"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Ingrese su correo"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handlePass}
          >
            Enviar
          </button>
          <div className="mt-2">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </form>
      </div>
      <Link to="/User/Login" className="text-white hover:underline mt-4">
        {" "}
        Regresar al login
      </Link>
    </div>
  );
};

export default RecuperarPass;
