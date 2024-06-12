
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Avatar from 'react-avatar-edit';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import img from "../guppy.jpeg";

const PerfilForm = () => {

    const modeloPerfil = {
  dni: sessionStorage.getItem('dni'),
  nombre: sessionStorage.getItem('nombre'),
  telefono: sessionStorage.getItem('telefono'),
  email: sessionStorage.getItem('email'),
  esNacional: false,
  id: 1, //para testear update
  rolId: 1, //para testear update
  contrasenna: "",
  usuario: sessionStorage.getItem('usuario'),
  direccion: sessionStorage.getItem('Direccion'),
  rol: sessionStorage.getItem('rol'),
  foto: sessionStorage.getItem('foto'),
  estado: true,
  esTEmporal: false,
  token: ""

}


const[perfil, setPerfil]= useState(modeloPerfil) //variable y funcion para almacenar la information y actualizar 
const [imgCrop, setimgCrop] = useState(false);
const [image,setImage] = useState("");
const[src, setsrc] = useState(false);
const [imgProfile, setImgProfile]= useState([]);
const [pview, setpview] = useState(false);

const profileFinal = imgProfile.map((item)=> item.pview);

const profile = sessionStorage.getItem('foto');

const onClose = ()=>{
  setpview(null);
}

const onCrop = (view) => {
  setpview(view)
}

const saveCropImage= async () =>{
  setImgProfile([...imgProfile, {pview}]);
  console.log(src)
  const value = pview;
  perfil.foto = pview;
  console.log(value)
  console.log(perfil)
 
  try{

    const token = localStorage.getItem("token");       
    const updateClient = await fetch(
      `https://localhost:7189/api/samusa/cliente/actualizar`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(perfil),
      }
    );

    if (updateClient.ok) {
      
      sessionStorage.setItem("foto", pview)
      
      alert("Usuario actualizado exitosamente");
      window.location.reload();
    } else {
        throw new Error("No se pudo actualizar el usuario");
    }
}
catch (error) {
  console.error("Error:", error.message);
}

setimgCrop(false);
 
}

const handleInputChange = (event) => {
  const { name, value, type, checked } = event.target;
  const newValue = type === 'checkbox' ? checked : value;
  setPerfil({ ...modeloPerfil, [name]: newValue });
};

const actualizarPerfil = (e)=>{
  console.log(e.target.name + ":"+ e.target.value)
  setPerfil(
    {
      ...perfil,
      [e.target.name]: e.target.value
    }
    
  )
  
}



const editarPerfil = async (perfil) => {
  
  try{

            
          const updateClient = await fetch(
            `https://localhost:7189/api/samusa/cliente/actualizar`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(perfil),
            }
          );

          if (updateClient.ok) {
            
            sessionStorage.setItem("Direccion", perfil.direccion)
            sessionStorage.setItem("nombre", perfil.nombre)
            sessionStorage.setItem("primerApellido", perfil.primerApellido)
            sessionStorage.setItem("segundoApellido", perfil.segundoApellido)
            sessionStorage.setItem("telefono", perfil.telefono)
            sessionStorage.setItem("email", perfil.email)
            sessionStorage.setItem("esNacional", perfil.esNacional)
            sessionStorage.setItem("usuario", perfil.usuario)
            sessionStorage.setItem("rol", perfil.rol)
            sessionStorage.setItem("dni", perfil.dni)
            alert("Usuario actualizado exitosamente");
          } else {
              throw new Error("No se pudo actualizar el usuario");
          }
      }
    catch (error) {
        console.error("Error:", error.message);
      }
    
      


}
const editar = () =>{

  if(perfil.dni != 0){
    editarPerfil(perfil);
  }
  

} 
  return (
  
      <div class="row mbn-50">
                <div class="col-12 mb-50">
                    <div class="author-top">
                        <div class="inner">
                            <div class="author-profile">
                              <div>
                               <div  className="profile_img text-center p-4 m-5">
                                <div className="flex flex-column m-5">
                                    <img
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "4px solid white",
                                      }}
                                      src = {profile}
                                      alt= ""
                                      onClick={()=>setimgCrop(true)}
                                      />
                                    <Dialog 
                                      visible={imgCrop}
                                              header="Actualizar perfil"
                                              onHide={()=> setimgCrop(false)}
                                              breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                                      
                                      <div class = "d-flex flex-column m-3">
                                              <Avatar
                                                width={600}
                                                height={400}
                                                onCrop={onCrop}
                                                onClose={onClose}
                                                src={src}
                                                />
                                                <Button 
                                                class="btn btn-primary mt-5"
                                                onClick={saveCropImage}
                                                label="Save"
                                                icon="pi pi-check"
                                                />
                                      </div>
                                    </Dialog>
                                  </div>
                                </div> 
                              </div>

                                <div class="info">
                                    <h5>{sessionStorage.getItem('nombre')}</h5>
                                    <a href="#" class="edit"><i class="zmdi zmdi-edit"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 mb-50 ml-4 mr-4">
                    

                        <div class="row justify-content-between align-items-center mb-10">
                            <div class="box">
                                <div class="box-head">
                                    <h3 class="title">Informacion de perfil</h3>
                                </div>
                                <div class="box-body">
                                    <div class="form">
                                        <form action="#">
                                            <div class="row row-10 mbn-20">
                                            <div class="col-sm-6 col-12 mb-20">
                                                      <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
                                                        <input type="text"  name="dni" id="dni" onChange={(e) => actualizarPerfil(e)} value={perfil.dni} class="form-control" />
                                                      </div>
                                                      <div class="col-sm-6 col-12 mb-20">
                                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                                                        <input type="text" name="nombre" id="nombre" onChange={(e) => actualizarPerfil(e)} value={perfil.nombre}  class="form-control" />
                                                      </div>
                                                      <div class="col-sm-6 col-12 mb-20">
                                                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                                                        <input type="text" name="telefono" id="telefono"  onChange={(e) => actualizarPerfil(e)} value={perfil.telefono} class="form-control" />
                                                      </div>
                                                      <div className="col-sm-6 col-12 mb-20">
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                                        <input type="email" name="email" id="email"  onChange={(e) => actualizarPerfil(e)} value={perfil.email} class="form-control" />
                                                      </div>
                                                      <div class="col-sm-6 col-12 mb-20">
                                                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
                                                        <input type="text"  name="usuario" id="usuario" onChange={(e) => actualizarPerfil(e)} value={perfil.usuario}  class="form-control"/>
                                                      </div>
                                                      <div class="col-sm-6 col-12 mb-20">
                                                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                                                        <input type="text" name="direccion" id="direccion" onChange={(e) => actualizarPerfil(e)} value={perfil.direccion} class="form-control" />
                                                      </div>


                                                <div class="col-12 mt-10 mb-20">
                                                    <input type="submit" class="button button-primary button-outline" value="Save Changes" onClick={editar}/>
                                                    <input type="submit" class="button button-danger button-outline" value="Delete Changes"/>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                      </div>
                    </div>                     
  );
}

export default PerfilForm;
