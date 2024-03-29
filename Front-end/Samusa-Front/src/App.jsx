import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import AboutUs from './pages/User/UserAboutUs.jsx'
import AdminClientes from './pages/Admin/AdminClientes'
import AdminColaboradores from './pages/Admin/AdminColaboradores.jsx'
import AdminCotizaciones from './pages/Admin/AdminCotizaciones.jsx'
import AdminExportaciones from './pages/Admin/AdminExportaciones.jsx'
import AdminImportaciones from './pages/Admin/AdminImportaciones.jsx'
import AdminPAqueteria from './pages/Admin/AdminPaqueteria.jsx'
import AdminRevisionContainer from './pages/Admin/AdminRevisionContainer.jsx'
import AdminRevisionVehiculo from './pages/Admin/AdminRevisionVehiculo.jsx'
import AdminTickets from './pages/Admin/AdminTickets.jsx'
import IndexUser from './pages/User/IndexUser'
import LayoutAdmin from './components/LayoutAdmin.jsx'
import Login from './components/Login.jsx'
import PerfilForm from './components/PerfilForm.jsx'
import RecuperarPass from './components/RecuperarPass.jsx'
import UserCotizaciones from './pages/User/UserCotizaciones.jsx'
import UserServices from './pages/User/UserServices.jsx'
import USerPreguntasFrecuentes from './pages/User/UserPReguntasFrecuentes.jsx'
import UserTickets from './pages/User/UserTickets.jsx'
import UserTracking from './pages/User/UserTracking.jsx'


function App() {
  return (
    <Router>
     <Routes>
      //TODO: fix the routes
      
      <Route exact path="/" element={<Login />}> </Route> //OK
      <Route exact path="/Recuperar" element={<RecuperarPass />}></Route> //TODO: finish the action

      
      <Route exact path="/Admin" element={<LayoutAdmin />}> </Route> //OK
      <Route exact path="/Admin/Clientes" element={<AdminClientes/>}> </Route> //OK
      <Route exact path="/Admin/Colaboradores" element={<AdminColaboradores/>}> </Route> //OK
      <Route exact path="/Admin/Cotizaciones" element={<AdminCotizaciones/>}> </Route> //OK
      <Route exact path="/Admin/Exportaciones" element={<AdminExportaciones/>}> </Route> //OK
      <Route exact path="/Admin/Importaciones" element={<AdminImportaciones/>}> </Route> //OK
      <Route exact path="/Admin/Paqueteria" element={<AdminPAqueteria/>}> </Route> //OK
      <Route exact path="/Admin/Perfil" element={<PerfilForm/>}> </Route> //TODO: finish the action
      <Route exact path="/Admin/RevisionContainer" element={<AdminRevisionContainer/>}> </Route> // OK
      <Route exact path="/Admin/RevisionVehiculo" element={<AdminRevisionVehiculo/>}> </Route> //OK
      <Route exact path="/Admin/Tickets" element={<AdminTickets/>}> </Route> //OK

      <Route exact path="/User" element={<IndexUser />}>  </Route> //OK
      <Route exact path="/User/AboutUs" element={<AboutUs/>}> </Route> //OK
      <Route exact path="/User/Cotizaciones" element={<UserCotizaciones/>}> </Route> //OK
      <Route exact path="/User/PreguntasFrecuentes" element={<USerPreguntasFrecuentes/>}> </Route> //OK
      <Route exact path="/User/Perfil" element={<PerfilForm/>}> </Route> //OK
      <Route exact path="/User/Services" element={<UserServices/>}> </Route> //OK
      <Route exact path="/User/Tickets" element={<UserTickets/>}> </Route> //OK
      <Route exact path="/User/Tracking" element={<UserTracking/>}> </Route> //OK

      

      
      

    </Routes>


    </Router>




  )
}
//
export default App