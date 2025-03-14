import React from "react"

import Front from "./pages/Front"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import About from "./pages/About"



import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Addexpense from "./pages/Addexpense"
import Addbudget from "./pages/Addbudget"
import ExpenseTracker from "./pages/Viewexpense"
import EditExpense from "./pages/Editexpense"
import BudgetTracker from "./pages/Viewbudget"
import EditBudget from "./pages/Editbudget"
import Viewprofile from "./pages/Viewprofile"
import Editprofile from "./pages/Editprofile"
import Charts from './pages/Charts'


function App() {

  return (
    <>

     <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to = "/front"/>}/>   
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/front' element={<Front/>}/>
        <Route path='/about' element={<About/>}/>
      
        {/* <Route path="/viewprofile" element={<Userprofile/>}/> */}
        <Route path="/addexpense" element={<Addexpense/>}/>
        <Route path="/addbudget" element={<Addbudget/>}/>
        <Route path="/viewexpense" element={<ExpenseTracker/>}/>
        <Route path="/editexpense" element={<EditExpense/>}/>
        <Route path='/viewbudget' element={<BudgetTracker/>}/>
        <Route path='editbudget' element={<EditBudget/>}/>
        <Route path="/viewprofile" element={<Viewprofile/>}/>
        <Route path="/editprofile" element={<Editprofile/>}/>
        <Route path='/charts' element={<Charts/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
