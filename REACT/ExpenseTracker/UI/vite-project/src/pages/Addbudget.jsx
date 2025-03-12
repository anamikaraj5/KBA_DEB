import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'

const Addbudget = () => {
  const [category, setCategory] = useState("")
  const [limit, setLimit] = useState("")
  const [month, setDate] = useState("") 

  const handleBudget = async (e) => {
    e.preventDefault()


    try {
      const response = await fetch('/api/setbudget', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Category: category,
          Limit: Number(limit),
          Month: month, 
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(`Error adding budget: ${errorMessage}`)
      }
      

      alert("Budget added successfully!")

     
      setCategory("")
      setLimit("")
      setDate("")
    } 
    
    catch (err) {
      console.error(err)
      alert("Something went wrong: " + err.message)
    }
  }

  return (
    <div>
      <Nav />
      <div className="md:flex">
        <Sidebar />

        <div className="md:ml-[550px] mx-[15px] mt-[40px]">
          <p className="text-4xl text-purple-950 text-center mt-[20px] font-bold">Set Budget</p>
          <form onSubmit={handleBudget} className="bg-purple-200 h-[430px] w-[380px] md:w-[500px] pt-[10px] rounded-lg mt-[30px]">
            <div className="flex flex-col gap-4 mx-[20px] mt-[10px] text-2xl">
          
              <label>Category:</label>
              <select 
                className="h-[40px] md:w-[450px] bg-purple-300" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required
              >
                <option value="">Select Category</option>
                <option value="Shopping">Shopping</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transport">Transport</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Furniture">Furniture</option>
                <option value="Fruits">Fruits</option>
                <option value="Clothing">Clothing</option>
                <option value="Pets">Pets</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Phone">Phone</option>
                <option value="Salary">Salary</option>
                <option value="Others">Others</option>
              </select>

     
              <label>Limit:</label>
              <input 
                type="number" 
                className="h-[40px] md:w-[450px] bg-purple-300" 
                value={limit} 
                onChange={(e) => setLimit(e.target.value)} 
                required
              />

       
              <label>Month:</label>
              <input 
                type="month" 
                className="h-[40px] md:w-[450px] bg-purple-300" 
                value={month} 
                onChange={(e) => setDate(e.target.value)}
                required 
              />
            </div>

      
            <div className="flex justify-between mt-[50px] mx-[30px]">
              <button type="button" className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl pt-[10px] border border-4 border-purple-950 hover:bg-purple-400">
                <a href="budget.html">CANCEL</a>
              </button>
              <button type="submit" className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl pt-[10px] border border-4 border-purple-950 hover:bg-purple-400">
                SET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addbudget
