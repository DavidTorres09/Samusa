import React, { useState } from 'react';
import { Link, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

  //const navigate = useNavigate();


 const Login = () => {

  // const handleLogin = async () => {
  //  try{
  //   const response = await fetch('https://localhost:7293/api/samusa/cliente/Login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ 
  //         username, 
  //         password, 
  //       }),
  //   });


  //   const responseVerificacion = await fetch(
  //     `https://localhost:7293/api/samusa/cliente/Login?user=${username}&password=${password}`);

  //   if(responseVerificacion.ok){
  //       const data = await responseVerificacion.json();
  //       setInfoPerfil(data)
  //       console.log(data.direccion)
  //       sessionStorage.setItem("Direccion", data.direccion)
  //       sessionStorage.setItem("nombre", data.nombre)
  //       sessionStorage.setItem("primerApellido", data.primerApellido)
  //       sessionStorage.setItem("segundoApellido", data.segundoApellido)
  //       sessionStorage.setItem("telefono", data.telefono)
  //       sessionStorage.setItem("email", data.email)
  //       sessionStorage.setItem("usuario", data.usuario)
  //       sessionStorage.setItem("rol", data.rol)
  //       sessionStorage.setItem("dni", data.dni)
  //       sessionStorage.setItem("esNacional", data.esNacional)

  //   }


  //   console.log(username);
  //   console.log(password);
  //   if(response.ok){
  //       console.log('Usuario Logueado');
  //       setIsLogged(true); 

  //   } else {
  //       const errorMsg = await response.text();
  //       console.error('Error al intentar loguarse: ${errorMsg}');
  //   }
  //  }
  //  catch(error){
  //    console.error(error)
  //  }

   

 // };
    const [usuario, setusuario] = useState('');

    const [contrasenna, setContrasenna] = useState('');

    const [respuesta, setRespuesta] = useState(null);


    const handleLogin = async () => {

        try {

            const usuario = {

                Correo: correo,

                Contrasenna: contrasenna

            };

            const baseUrl = 'https://localhost:7189/'; // Reemplaza con tu URL base
            const endpoint = '/api/samusa/cliente/autenticar';
            const response = await axios.post(baseUrl + endpoint, usuario);

            setRespuesta(response.data);

        } catch (error) {

            console.error('Error al iniciar sesión:', error.response.data);

        }

    };

  // if(IsLoged){
  //   navigate('/Admin');
  // }

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-teal-600 min-h-screen flex flex-col items-center justify-center"> 
    <h1 className="text-white text-6xl font-bold mb-8">Samusa</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Iniciar Sesión</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-sm font-semibold text-gray-600 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="usuario"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Ingrese su nombre de usuario"
              value={usuario}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="contrasenna" className="block text-sm font-semibold text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasenna"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Ingrese su contraseña"
              value={contrasenna}
              onChange={(e) => setPassword(e.target.value)}
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
            <Link to="#" className="text-blue-500 hover:underline"> Haz clic aquí</Link>
          </p>
          <p className="text-center mt-4">
            Olvidé mi contraseña 
            <Link to="/RecuperarPass" className="text-blue-500 hover:underline"> Recuperar</Link>
          </p>
        </form>
      </div>
    </div>
  );
 }
export default Login;
