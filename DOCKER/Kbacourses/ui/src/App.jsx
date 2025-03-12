import React from 'react'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'


//for routing b/w pages
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Addcourse from './pages/Addcourse'
import Coursepage from './pages/Coursepage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to = "/signup"/>}/>   //ele-which react element to be loaded
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addcourse' element={<Addcourse/>}/>
        <Route path='/getallcourses' element={<Coursepage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
