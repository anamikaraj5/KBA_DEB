import React, { useState ,useEffect} from 'react'
import StudentCard from '../Component/Studentcard'

const Viewstudents = () => {

    let students =[]
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchStudents = async (e) => {
        setLoading(true)
        setError("")
    
        try {
          const response = await fetch('/api/viewdata2', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
    
          const data = await response.json()
    
          if (!response.ok) {
            setError(data.message || "Failed to fetch student details")
          }
          
          students = data
        } 
        
        catch (err) {
          console.error("Error:", err)
          setError(err.message)
        } 
        
        finally {
          setLoading(false)
        }
      }

    // useEffect(() => {
        
    //       fetchStudents()
    //     }
    //   , [])


      let transaction = []

      for (let i = 0; i < students.length; i++) {
        const entry = students[i]
    
        transaction.push(
          <div className="flex justify-between items-center  py-2 text-black font-bold">
            <p >Student Name : {entry.student_name}</p>
            <p >Enrollment No : {entry.enrollment_no}</p>
            <p >Date : {entry.date}</p>
          </div>
        )
      }

  return (
    <div>
        
        {loading && <p className="text-center mt-10 text-lg">Loading...</p>}
          {error && <p className="text-center mt-10 text-red-500">{error}</p>}

          <button onClick={fetchStudents} type='button'>Show</button>

          {!loading && !error && transaction.length > 0 ? (
            <div className="p-4 mb-3 shadow-lg rounded-lg bg-purple-200 w-[1000px]  ml-[70px] mt-[70px]">
            {transaction}
          </div>
          ) : (
            !loading && <p></p>
          )}

    </div>
  )
}

export default Viewstudents