import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[role,setRole] = useState('user')
    const[password,setPassword] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()

    const handlesignup = async(e)=>
        {
            e.preventDefault()
            try
            {
                const response = await fetch('/api/signup',{
                    method:'POST',
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({Name:name,Email:email,Password:password,Roles:role})  //body name in route : mele declare cheytha variable
                })
    
                if(!response.ok)
                {
                    const errData = await response.json()
                    throw new Error(errData.msg|| 'Signup failed')
                }
    
                navigate('/login')
            }
    
            catch(err)
            {
                setError(err.message || 'signup failed')
            }
        }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded shadow">
    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    {error && <p className='text-red-500 mb-4'>{error}</p>}
    <form onSubmit={handlesignup}>
      <div className="mb-4">
        <label  className="block text-gray-700">Name</label>
        <input
          type="text"
          id="Name"
          // name="Name"
          className="w-full p-2 border rounded mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="text"
          id="email"
          name="Email"
          className="w-full p-2 border rounded mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="Password"
          className="w-full p-2 border rounded mt-1"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Role</label>
        <select
          id="role"
          name="Role"
          className="w-full p-2 border rounded mt-1"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user" >User</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Sign Up
      </button>

      
    </form>
  </div>
</div>
  )
}

export default Signup