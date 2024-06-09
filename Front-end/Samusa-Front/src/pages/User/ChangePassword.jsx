import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import encryptionUtils from "../../utilities/encryptionUtils";

const ChangePassUser = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePass = async () => {
    try {
      const email = sessionStorage.getItem("email");

      async function handleEncrypt(password) {
        const encryptedText = await encryptionUtils.Encriptar(password);
        return encryptedText;
      }

      const contrasenna = await handleEncrypt(newPassword);
      const contrasennaTemporal = await handleEncrypt(currentPassword);
      console.log(contrasenna);
      if (newPassword !== confirmNewPassword) {
        setError("Las contraseñas nuevas no coinciden.");
        return;
      }

      if (newPassword.length < 8 && confirmNewPassword.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
        setError("Por favor digite la nueva contraseña.");
        return;
      }

      const response = await fetch(
        "https://localhost:7189/api/samusa/cliente/CambiarContrasennaCliente",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            contrasenna: contrasenna,
            contrasennaTemporal: contrasennaTemporal,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.codigo === "0") {
          navigate("/User");
        } else {
          setError(data.mensaje);
        }
      } else {
        setError(
          `Ha ocurrido un error, favor contactar con soporte. Código de error: ${response.status}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-300 to-cyan-400 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl font-bold mb-8">Samusa</h1>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center ">
          Cambiar contraseña
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm text-center font-semibold text-gray-600 mb-1"
            >
              Contraseña Actual
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Contraseña Actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm text-center font-semibold text-gray-600 mb-1"
            >
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm text-center font-semibold text-gray-600 mb-1"
            >
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirmar Nueva Contraseña"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            <p className="text-red-500 text-sm text-center">{error}</p>
          </div>
        </form>
      </div>
      <Link to="/User/Login" className="text-white hover:underline mt-4">
        Regresar al login
      </Link>
    </div>
  );
};

export default ChangePassUser;
