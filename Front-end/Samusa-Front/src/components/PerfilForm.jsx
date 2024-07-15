import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../Css/PerfilForm.css"


const firebaseConfig = {
  apiKey: "AIzaSyD-A26WJZEK_YzbKHOnqM33ECmyxeEs0fU",
  authDomain: "samusa-8eb97.firebaseapp.com",
  projectId: "samusa-8eb97",
  storageBucket: "samusa-8eb97.appspot.com",
  messagingSenderId: "637903625054",
  appId: "1:637903625054:web:591b6c1bd249349908cdcf"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (foto) => {
  const storageRef = ref(storage, `fotosPerfil/${foto.name}`);
  await uploadBytes(storageRef, foto);
  return getDownloadURL(storageRef);
};

const PerfilForm = () => {
  const [perfil, setPerfil] = useState({
    id: sessionStorage.getItem("id") || "",
    dni: sessionStorage.getItem("dni") || "",
    nombre: sessionStorage.getItem("nombre") || "",
    telefono: sessionStorage.getItem("telefono") || "",
    email: sessionStorage.getItem("email") || "",
    usuario: sessionStorage.getItem("usuario") || "",
    direccion: sessionStorage.getItem("direccion") || "",
    foto: sessionStorage.getItem("foto") || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_640.png",
    esNacional: sessionStorage.getItem("esNacional") === "true",
  });

  const [imgProfile, setImgProfile] = useState(perfil.foto);
  const [showCropDialog, setShowCropDialog] = useState(false);

  useEffect(() => {
    const storedFoto = sessionStorage.getItem("foto");
    if (storedFoto) {
      setImgProfile(storedFoto);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("foto", imgProfile);
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      foto: imgProfile,
    }));
  }, [imgProfile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 800;
          const maxHeight = 600;
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);

          const base64 = canvas.toDataURL("image/jpeg", 0.8);

          try {
            const url = await uploadImage(file);
            setImgProfile(url);
            setShowCropDialog(true);
          } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error al subir la imagen. Inténtalo nuevamente.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue =
      type === "checkbox"
        ? checked
        : name === "esNacional"
        ? value === "true"
        : value;
    setPerfil({
      ...perfil,
      [name]: newValue,
    });
  };

  const editarPerfil = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const profileType = sessionStorage.getItem("rolId");
      let endpoint = '';

      if (profileType == 1) {
        endpoint = `https://localhost:7189/api/samusa/cliente/actualizar`;
      } else {
        endpoint = `https://localhost:7189/api/samusa/colaborador/actualizarPerfil`;
      }
      const response = await fetch(endpoint,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...perfil,
            foto: imgProfile,
            esNacional: Boolean(perfil.esNacional),
          }),
        }
      );

      if (response.ok) {
        Object.entries(perfil).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
        alert("Perfil actualizado exitosamente");
        window.location.reload();
      } else {
        throw new Error("No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al actualizar el perfil. Inténtalo nuevamente.");
    }
  };

  const onCloseCropDialog = () => {
    setShowCropDialog(false);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <label htmlFor="inputFoto" className="form-label">
                Foto de Perfil
              </label>
              <p>(.jpg, .jpeg, .png)</p>
              <div className="profile-picture">
                <img
                  src={imgProfile || "/default-profile.png"}
                  alt="Foto de perfil"
                  className="img-fluid rounded-circle profile-image"
                />
              </div>
              <input
                type="file"
                className="form-control mt-2"
                id="inputFoto"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8 mb-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4 text-white">Información de perfil</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dni"
                    name="dni"
                    value={perfil.dni}
                    readOnly // Cambiado a readOnly en lugar de disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={perfil.email}
                    readOnly // Cambiado a readOnly en lugar de disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label text-white">
                    Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="usuario"
                    value={perfil.usuario}
                    readOnly // Cambiado a readOnly en lugar de disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label text-white">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label text-white">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={perfil.telefono}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label text-white">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    value={perfil.direccion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="esNacional" className="form-label text-white">
                    ¿Es Nacional?
                  </label>
                  <select
                    className="form-select text-black"
                    id="esNacional"
                    name="esNacional"
                    value={perfil.esNacional}
                    onChange={handleInputChange}
                    style={{ borderRadius: "5px", padding: "8px" }}
                  >
                    <option value={true}> Sí </option>
                    <option value={false}> No </option>
                  </select>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm animate__animated animate__pulse"
                    onClick={editarPerfil}
                  >
                    Guardar Cambios
                  </button>
                  <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm animate__animated animate__pulse">
                    Descartar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={showCropDialog}
        header="Editar Foto de Perfil"
        onHide={onCloseCropDialog}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        className="p-dialog"
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "100%" }}
        >
          <img
            src={imgProfile}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              marginBottom: "20px",
            }}
          />
          <div className="text-center">
            <Button
              className="btn btn-primary"
              onClick={editarPerfil}
              label="Guardar"
              icon="pi pi-check"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PerfilForm;