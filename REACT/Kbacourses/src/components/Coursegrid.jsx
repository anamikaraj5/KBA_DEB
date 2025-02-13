import React from 'react'
import Coursecard from './Coursecard'

const Coursegrid = ({courses}) => {
  return (
    <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
        {courses.map((course) =>( 
            <Coursecard key={courses.Courseid}
            course={course}/>
        ))
        }
    </div>
  )
}

export default Coursegrid