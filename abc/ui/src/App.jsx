import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'

import Addstudent from './Pages/Addstudent'
import Viewstudent from './Pages/Viewstudent'
import Viewstudents from './Pages/Viewstudents'

function App() {
  
  return (
    <>
        <BrowserRouter>
            <Routes>

              <Route path='/' element={<Navigate to = "/addstudent"/>}/> 
              <Route path='/addstudent' element={<Addstudent/>}/>
              <Route path='/viewstudent' element={<Viewstudent/>}/>
              <Route path='/viewstudents' element={<Viewstudents/>}/>
            </Routes>

        </BrowserRouter>
    </>
  )
}

export default App
