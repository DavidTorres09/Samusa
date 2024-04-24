import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasenna, setContrasenna] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          console.log('usuario:', usuario);
          console.log('contrasenna:', contrasenna);
            const response = await fetch('https://localhost:7189/api/samusa/cliente/autenticar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasenna: contrasenna,
                }),
            });
            
            if (response.ok ) {
                const data = await response.json();
                console.log(data.codigo)
                if (data.codigo === "0") {
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
        }
    };

    useEffect(() => {
      if (isLogged) {
          navigate('/User');
      }
  }, [isLogged, navigate]);

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
                            onChange={(e) => setUsuario(e.target.value)}
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
