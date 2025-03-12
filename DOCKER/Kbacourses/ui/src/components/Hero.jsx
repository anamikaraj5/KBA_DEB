import React from 'react'

const Hero = () => {
  return (
    <div>   
            <div className='bg-purple-100 text-purple-950 p-10 rounded shadow-xl flex flex-col items-center justify-center mt-1 text-center'>
                <h1 className='font-bold text-xl md:text-3xl lg:text-4xl'>Learn Blockchain Technology From Kerala's First Dedicated Facility for Blockchain Education</h1>
                <h2 className='mt-4 text-lg md:text-xl lg:text-2xl'>Since 2017</h2>
            </div>

            <div className='bg-purple-100 flex flex-col items-center justify-center my-10 p-10 text-center'>
                <h1 className='font-bold text-2xl md:text-4xl text-purple-800'>BROWSE OUR TOP COURSES</h1>
                <h2 className='font-medium text-lg md:text-xl text-purple-400 mt-4'>Choose the course that's right for your career goals.</h2>
            </div>

            {/* <div class='flex justify-center mb-40'>
        <button class='w-80 h-10 rounded-full bg-purple-500 text-white font-medium  hover:bg-purple-600' >View all Courses</button>
    </div> */}
  </div>
  )
}

export default Hero