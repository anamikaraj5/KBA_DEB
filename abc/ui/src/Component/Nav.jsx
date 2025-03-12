import React from "react"
import { Link} from "react-router-dom"

const Nav = () => {
   
    return (
        <div>
            <div className="flex items-center gap-5 bg-purple-950 text-white px-[5px] h-[50px] w-full text-2xl">
                    <Link to="/addstudent">Add Student</Link>
                    <Link to="/viewstudent">View Student</Link>
            </div>
        </div>
    )
}

export default Nav