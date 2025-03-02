import React from 'react'
import logo from '../assets/images/logo1.png'
import { Link } from 'react-router-dom'
import useProfile from "../hooks/Userprofile.js"

const Nav = () => {

    const { profile } = useProfile()

  return (
    <div>

        <div className="flex items-center gap-3 bg-purple-300 px-[5px] h-[90px] w-full text-sm md:h-[90px] md:text-3xl md:justify-between md:pr-[50px]">

            <div className="flex items-center gap-2">
            <img className='m-1p-2 size-12' src={logo} alt="logo" />
                <p className="text-white font-bold">Budget Buddy</p>
            </div>

            <div className="flex gap-2 md:gap-6">
                <Link to={'/home'} className="hover:text-5xl hover:bg-purple-500">Home</Link>
                <Link to={'/about'} className="hover:text-5xl hover:bg-purple-500">About</Link>
                <Link to={'/contact'} className="hover:text-5xl hover:bg-purple-500">Contact</Link>
                <Link to={'/logout'} className="hover:text-5xl hover:bg-purple-500">Logout</Link>
            </div>  

            <div className="flex justify-end gap-1  md:gap-3">
                <p className="text-white md:mt-[10px] mt-[5px] font-bold hover:bg-red-700"><Link to ={'/viewprofile'}>Welcome , {profile ? profile.fullname : "Guest"}!</Link></p>
            </div>
        </div>

    </div>
  )
}

export default Nav