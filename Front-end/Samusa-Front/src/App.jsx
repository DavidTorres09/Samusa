import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './pages/Layout'
import LayoutAdmin from './pages/LayoutAdmin'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LayoutAdmin/>
    </>
  )
}

export default App
