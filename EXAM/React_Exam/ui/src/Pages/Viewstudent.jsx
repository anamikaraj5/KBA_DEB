import React, { useState ,useEffect} from 'react'
import StudentCard from '../Component/Studentcard'
import Nav from '../Component/Nav'

const Viewstudent = () => {

    const [selectedCourse,setSelectedCourse] = useState('')
    const [students,setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchStudents = async (course) => {
        setLoading(true)
        setError("")
    
        try {
          const response = await fetch(`/api/viewdata?course_name=${course}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
    
          const data = await response.json()
    
          if (!response.ok) {
            setError(data.message || "Failed to fetch Student details")
            setStudents([])
          } 
          else {
            setStudents(data)
          }
        } 
        
        catch (err) {
          console.error("Error:", err)
          setError(err.message)
        } 
        
        finally {
          setLoading(false)
        }
      }
    
      useEffect(() => {
        if (selectedCourse) {
          fetchStudents(selectedCourse)
        }
      }, [selectedCourse])


  return (
    <div>
        
        <Nav/>


        <label className='mt-[30px] ml-[40px] text-3xl'>Enter any course name : </label>
        <input className='bg-purple-300 rounded-md ml-[20px] mt-[30px] h-[30px]' type='text' value={selectedCourse} onChange={(e)=> setSelectedCourse(e.target.value)}/>

        {loading && <p className="text-center mt-10 text-lg">Loading...</p>}
        {error && <p className="text-center mt-10 text-red-500">{error}</p>}

          {!loading && !error && students.length > 0 ? (
            <StudentCard course={selectedCourse} transactions={students} />
          ) : (
            !loading && <p className="text-center mt-10">Please enter any course name....</p>
          )}

    </div>
  )
}

export default Viewstudent