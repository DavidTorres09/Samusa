import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const PerfilForm = () => {
  const [perfil, setPerfil] = useState({
    id: sessionStorage.getItem("id") || "",
    dni: sessionStorage.getItem("dni") || "",
    nombre: sessionStorage.getItem("nombre") || "",
    telefono: sessionStorage.getItem("telefono") || "",
    email: sessionStorage.getItem("email") || "",
    usuario: sessionStorage.getItem("usuario") || "",
    direccion: sessionStorage.getItem("direccion") || "",
    foto: sessionStorage.getItem("foto") || "",
    esNacional: sessionStorage.getItem("esNacional") === "true" ? true : false,
  });

  const [imgProfile, setImgProfile] = useState(perfil.foto);
  const [showCropDialog, setShowCropDialog] = useState(false);

  useEffect(() => {
    // Cargar la foto de perfil desde LocalStorage al iniciar
    const storedFoto = localStorage.getItem("fotoPerfil");
    if (storedFoto) {
      setImgProfile(storedFoto);
    }
  }, []);

  // Actualizar LocalStorage cuando se actualice perfil
  useEffect(() => {
    localStorage.setItem("fotoPerfil", perfil.foto);
  }, [perfil.foto]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
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
          setImgProfile(base64);
          setShowCropDialog(true);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCropImage = () => {
    try {
      localStorage.setItem("fotoPerfil", imgProfile);
      setPerfil({
        ...perfil,
        foto: imgProfile,
      });

      alert("Foto de perfil actualizada localmente.");

      setShowCropDialog(false); // Ocultar el diálogo de recorte
    } catch (error) {
      console.error("Error al guardar la foto de perfil:", error);
      alert("Error al guardar la foto de perfil. Inténtalo nuevamente.");
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
    setPerfil({ ...perfil, [name]: newValue });
  };

  const editarPerfil = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7189/api/samusa/cliente/actualizar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...perfil,
            esNacional: Boolean(perfil.esNacional),
          }),
        }
      );

      if (response.ok) {
        Object.entries(perfil).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
        alert("Perfil actualizado exitosamente");
      } else {
        throw new Error("No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error:", error.message);
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
              <input
                type="file"
                className="form-control"
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
              <h3 className="card-title mb-4">Información de perfil</h3>
              <form onSubmit={editarPerfil}>
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
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={perfil.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="usuario"
                    value={perfil.usuario}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
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
                  <label htmlFor="telefono" className="form-label">
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
                  <label htmlFor="direccion" className="form-label">
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
                  <label htmlFor="esNacional" className="form-label">
                    ¿Es Nacional?
                  </label>
                  <select
                    className="form-select"
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
                  <button type="submit" className="btn btn-primary me-md-2">
                    Guardar Cambios
                  </button>
                  <button type="button" className="btn btn-danger">
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
              onClick={saveCropImage}
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
