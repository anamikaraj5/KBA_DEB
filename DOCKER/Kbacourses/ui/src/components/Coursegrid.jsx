import React,{useState,useEffect} from 'react' //use_effect is used for side effects - like the loading of data from db
import Coursecard from './Coursecard'

const Coursegrid = ({isHome=false}) => {

  const[courses,setcourses] = useState([])
  const[loading,setloading] = useState(true)
  const courselist = isHome?courses.slice(0,3):courses

  useEffect(()=>{            //use effect has 2 params - fn and []
       const fetchCourses = async()=>
        {
          try{
            const res=await fetch("/api/getallcourses")
            const data = await res.json()
            setcourses(data)
          }
          catch(error)
          {
            console.log(error)
          }
          finally
          {
            setloading(false)
          }
        }    
        fetchCourses()  
  },[])  //[] - dependency list 

  return (

    <>

        <h1 className='flex flex-col items-center font-bold text-2xl md:text-4xl text-purple-800 pt-10'>{isHome?'Top courses':'All Courses'}</h1>
      
        {loading?(
          <h1>Loading</h1>
        ):<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
        {courselist.map((course) =>( 
            <Coursecard key={courses.courseid}
            course={course}/>
        ))
        }
        </div>
        }
        

    </>
  )
}

export default Coursegrid