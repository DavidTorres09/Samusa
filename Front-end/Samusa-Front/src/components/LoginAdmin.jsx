import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import encryptionUtils from '../utilities/encryptionUtils';
import "../css/Register.css";

const LoginAdmin = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  async function handleEncrypt() {
    const encryptedText = await encryptionUtils.Encriptar(contrasenna);
    return encryptedText;
};


  const handleLogin = async () => {
    try {
      const textoEncriptado = await handleEncrypt(contrasenna);
        const response = await fetch('https://localhost:7189/api/samusa/colaborador/autenticar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: usuario,
                contrasenna: textoEncriptado,
            }),
        });
        
        if (response.ok ) {
            const data = await response.json();
            if (data.codigo === "0") {
                const { id, dni, nombre, telefono, email, esNacional, usuario, rolId, nombreRol, foto, estado, esTemporal, token, direccion } = data.dato;
                sessionStorage.setItem('id', id);
                sessionStorage.setItem('dni', dni);
                sessionStorage.setItem('nombre', nombre);
                sessionStorage.setItem('telefono', telefono);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('esNacional', esNacional);
                sessionStorage.setItem('usuario', usuario);
                sessionStorage.setItem('rolId', rolId);
                sessionStorage.setItem('nombreRol', nombreRol);
                sessionStorage.setItem('foto', (foto === null || foto === "") ? 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_640.png' : foto);
                sessionStorage.setItem('estado', estado);
                sessionStorage.setItem('esTemporal', esTemporal);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('direccion', direccion);
                setIsLogged(true);
            } else {
                console.error('Usuario o contraseña incorrectos');
            }
        } else {
            const errorMsg = await response.text();
            console.error(`Error al intentar loguearse: ${errorMsg}`);
        }
    } catch (error) {
        console.error(error);
    }};

  useEffect(() => {
    if (isLogged) {
        navigate('/Admin');
        window.location.reload();
    }
  }, [isLogged, navigate]);

  return (
    <div className="bg-gradient-to-r from-purple-300 to-cyan-400 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl font-bold mb-8">Samusa - Admin</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Iniciar Sesión</h2>

        <form>
          <div className="mb-4 reginput">
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

          <div className="mb-6 reginput">
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
            Olvidé mi contraseña
            <br />
            <Link
              to="/RecuperarContrasennaAdmin"
              className="text-blue-500 hover:underline"
            >
              Recuperar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
