import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
   try{
    const response = await fetch('https://localhost:5000/api/samusa/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username, 
            password, 
        }),
    });

    if(response.ok){
        console.log('Usuario Logueado');
    } else {
        const errorMsg = await response.text();
        console.error('Error al intentar loguarse: ${errorMsg}');
    }
   }
   catch(error){
     console.error(error)
   }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-teal-600 min-h-screen flex flex-col items-center justify-center"> 
    <h1 className="text-white text-6xl font-bold mb-8">Samusa</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Iniciar Sesión</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Ingrese su contraseña"
              value={password}
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
};

export default Login;
