import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecuperarPass = () => {
  const [Email, setEmail] = useState('');

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-teal-600 min-h-screen flex flex-col items-center justify-center"> 
    <h1 className="text-white text-6xl font-bold mb-8">Samusa</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Recuperar mi contraseña</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-sm font-semibold text-gray-600 mb-1">
              Correo Electrónico
            </label>
            <input
              type="text"
              id="username"
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
            onClick={handleLogin}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarPass;
