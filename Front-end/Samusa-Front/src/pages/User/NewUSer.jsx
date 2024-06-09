import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NewUser = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasenna, setContrasenna] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [esNacional, setEsNacional] = useState(false);
    const [error, setError] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {

        if (!usuario || !contrasenna || !direccion || !nombre || !dni || !telefono || !email) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        const cliente = {
            usuario: usuario,
            contrasenna: contrasenna,
            direccion: direccion,
            nombre: nombre,
            dni: dni,
            telefono: telefono,
            email: email,
            esNacional: esNacional === "true" ? true : false
        };

        try {
            console.log(JSON.stringify(usuario));
            const response = await fetch('https://localhost:7189/api/samusa/cliente/agregar ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });
            
            if (response.ok ) {
                const data = await response.json();
                if (data.codigo == "0") {
                    navigate('/User/Login');
                } else {
                    setError('Su Usuario o correo ya se encuentran registrados.');
                }
            } else {
                Seterror(`Error al intentar registarse`);
            }
        } catch (error) {
            setError('Error al registrar usuario. Favor contactar con soporte');
        };
        setError('');
    };


    return (
        <div className="bg-gradient-to-r from-purple-300 to-cyan-400 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-white text-4xl font-bold mb-4">Registro</h1>
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Ingrese sus datos</h2>


            <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="usuario" className="block text-sm font-semibold text-gray-600 mb-1">
                                Usuario
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                                placeholder="Ingrese su usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contrasenna" className="block text-sm font-semibold text-gray-600 mb-1">
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

                        <div className="mb-4">
                            <label htmlFor="direccion" className="block text-sm font-semibold text-gray-600 mb-1">
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="direccion"
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                                placeholder="Ingrese su dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-600 mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                                placeholder="Ingrese su nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="mb-4">
                        <label htmlFor="dni" className="block text-sm font-semibold text-gray-600 mb-1">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            placeholder="Ingrese su DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="telefono" className="block text-sm font-semibold text-gray-600 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telefono"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            placeholder="Ingrese su teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="esNacional" className="block text-sm font-semibold text-gray-600 mb-1">
                            ¿Es nacional?
                        </label>
                        <select
                            id="esNacional"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            value={esNacional}
                            onChange={(e) => setEsNacional(e.target.value)}
                            required
                        >
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={handleRegister}
                    >
                        Registrarse
                    </button>

                    <div className="mt-2">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                </div>
            </div>
            <p className="text-center mt-4 text-white">
                    ¿Ya tienes una cuenta?
                    <Link to="/User/Login" className="text-blue-500 hover:underline"> Haz clic aquí</Link>
            </p>
        </div>
    );
};

export default NewUser;
