import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './pages/Layout'
import LayoutAdmin from './pages/LayoutAdmin'
import IndexUser from './pages/User/IndexUser'
import Login from './pages/User/Login'
import ClientsTable from './components/ClientsTable'
import RecuperarPass from './pages/RecuperarPass'
import AdminClientes from './pages/Admin/AdminClientes'
import ClientModal from './components/ClientModal'
import Perfil from './pages/User/Perfil'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  
  const [count, setCount] = useState(0)

  return (
    
    
    <Router>
     
     <Routes>
      //TODO: fix the routes
      <Route exact path="/Admin/Clientes" element={<AdminClientes/>}> </Route>
      
      <Route exact path="" element={<IndexUser />}>  </Route>
      <Route exact path="/Login" element={<Login />}> </Route>
      <Route exact path="/RecuperarPass" element={<RecuperarPass />}></Route>
      <Route exact path="/Perfil" element={<ClientModal/>}> </Route>

    </Routes>


    </Router>




  )
}
//
export default App