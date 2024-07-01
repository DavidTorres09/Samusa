import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import encryptionUtils from "../utilities/encryptionUtils";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasenna, setContrasenna] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleEncrypt() {
    const encryptedText = await encryptionUtils.Encriptar(contrasenna);
    return encryptedText;
  }

  const handleLogin = async () => {
    try {
      const textoEncriptado = await handleEncrypt(contrasenna);
      const response = await fetch(
        "https://localhost:7189/api/samusa/cliente/autenticar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: usuario,
            contrasenna: textoEncriptado,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.codigo === "0") {
          const {
            id,
            dni,
            nombre,
            telefono,
            email,
            esNacional,
            usuario,
            rolId,
            nombreRol,
            foto,
            estado,
            esTemporal,
            token,
          } = data.dato;
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("dni", dni);
          sessionStorage.setItem("nombre", nombre);
          sessionStorage.setItem("telefono", telefono);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("esNacional", esNacional);
          sessionStorage.setItem("usuario", usuario);
          sessionStorage.setItem("rolId", rolId);
          sessionStorage.setItem("nombreRol", nombreRol);
          sessionStorage.setItem("foto", foto);
          sessionStorage.setItem("estado", estado);
          sessionStorage.setItem("esTemporal", esTemporal);
          sessionStorage.setItem("token", token);

          if (sessionStorage.getItem("esTemporal") === "true") {
            navigate("/User/CambiarContrasenna");
          } else {
            navigate("/User");
          }
        } else {
          setError("Usuario o contraseña incorrectos");
        }
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-300 to-cyan-400 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl font-bold mb-8">Samusa</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Iniciar Sesión
        </h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="usuario"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="usuario"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Ingrese su nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="contrasenna"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contrasenna"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Ingrese su contraseña"
              value={contrasenna}
              onChange={(e) => setContrasenna(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
          <p className="text-center mt-4">
            ¿Aún no estás registrado?
            <br />
            <Link to="/NewUser" className="text-blue-500 hover:underline">
              {" "}
               Haz click aquí
            </Link>
          </p>
          <p className="text-center mt-4">
            ¿Olvidó su contraseña?
            <br />
            <Link
              to="/RecuperarContrasenna"
              className="text-blue-500 hover:underline"
            >
              {" "}
              Recuperar
            </Link>
          </p>
          <div className="mt-2">
            <p className="text-red-500 text-sm text-center">{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
