import React, { useState } from 'react'
import Nav from '../Component/Nav'

const Addstudent = () => {

    const [studentname,setName] = useState('')
    const [enrollno,setNo] = useState('')
    const [course,setCourse] = useState('')
    const [date,setDate] = useState('')

    const handleadd = async(e) =>
    {
        e.preventDefault()
        try{

            const response = await fetch('/api/addstudent',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({Student_name:studentname,Enrollment_no:enrollno,Course:course,Date:date})
            })

            if(!response.ok)
            {
                throw new Error('Error adding student details!!!')
            }

            alert('Successfully added a student detail....')

            setName('')
            setNo('')
            setCourse('')
            setDate('')
        }

        catch(error)
        {
            console.error(error)
        }
    }

  return (
    <div>

        <Nav/>

        <form onSubmit={handleadd} className='rounded-lg flex flex-col bg-purple-300 mt-[60px] ml-[700px] w-[500px] pl-[40px] h-[400px]'>
            <p className='text-red-950 font-bold pt-[10px] text-3xl'>Add Student</p>
            <label className='pt-[20px]'>Student Name</label>
            <input className='bg-white w-[430px] rounded-md' type='text' value={studentname} onChange={(e)=> setName(e.target.value)}/>

            <label className='pt-[20px]'>Enrollment No</label>
            <input className='bg-white w-[430px] rounded-md' type='text' value={enrollno} onChange={(e)=> setNo(e.target.value)}/>

            <label className='pt-[20px]'>Course Name</label>
            <input className='bg-white w-[430px] rounded-md' type='text' value={course} onChange={(e)=> setCourse(e.target.value)}/>

            <label className='pt-[20px]'>Date</label>
            <input className='bg-white w-[430px] rounded-md' type='text' value={date} onChange={(e)=> setDate(e.target.value)}/>

            <button className='bg-red-900 w-[150px] mt-[20px] rounded-md text-white' type='submit'>Submit</button>
        </form>

    </div>
  )
}

export default Addstudent