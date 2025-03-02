import React from "react"
import Nav from "./components/Nav"
import Front from "./pages/Front"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import About from "./pages/About"
import Contact from "./pages/Contact"
import Logout from "./pages/Logout"
import Userprofile from "./pages/Userprofile"

import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Addexpense from "./pages/Addexpense"
import Addbudget from "./pages/Addbudget"


function App() {

  return (
    <>
     {/* <Nav/> */}
     {/* <Front/> */}
     {/* <Home/> */}


     <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to = "/front"/>}/>   //ele-which react element to be loaded
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/front' element={<Front/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path="/viewprofile" element={<Userprofile/>}/>
        <Route path="/addexpense" element={<Addexpense/>}/>
        <Route path="/addbudget" element={<Addbudget/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
