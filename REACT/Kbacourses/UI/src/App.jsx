// import { useState } from 'react'
// import Nav from './components/Nav'
// import Hero from './components/Hero'
import Coursegrid from './components/Coursegrid'
// import coursesdata from './assets/data/courses.json'
import Addcourse from './pages/Addcourse'
import Courses from './pages/Courses'
import Home from './pages/Home'
import Notfound from './pages/Notfound'

function App() {

  return (
    <div>
      {/* <Nav/>
      <Hero/>
      <Coursegrid courses={coursesdata}/> */}
      
      <Home/>
      
      {/* <Notfound/> */}
      {/* <Addcourse/> */}
      {/* <Courses/> */}
    </div>
  )
}

export default App
