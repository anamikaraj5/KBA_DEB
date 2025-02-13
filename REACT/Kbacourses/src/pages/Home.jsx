import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Coursegrid from '../components/Coursegrid'
import coursesdata from '../assets/data/courses.json'

function Home() {

  return (
    <div>
      <Nav/>
      <Hero/>
      <Coursegrid courses={coursesdata}/>
    </div>
  )
}

export default Home