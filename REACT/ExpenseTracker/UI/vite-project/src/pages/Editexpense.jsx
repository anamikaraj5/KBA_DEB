import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"

const EditExpense = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Extract query parameters (existing expense details)
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [amount, setAmount] = useState(searchParams.get("amount") || "")
  const [date, setDate] = useState(searchParams.get("date") || "")
  const [error, setError] = useState("")



  const handleUpdate = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/updateexpense", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          Category: category,
          Expense: amount,
          Date: date,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to update expense")
      } 
      else {
        alert("Expense updated successfully!")
        navigate("/viewexpense") 
      }
    }
    
    catch (err) {
      console.error("Error:", err)
      setError("Something went wrong")
    }
  }

  return (

    <div>

    <Nav/>
    <div className="md:flex ">
            <Sidebar/>

            <div>
                <p className="md:mt-[20px] md:ml-[700px] mt-[40px] mx-[160px] text-5xl text-purple-950 font-bold">Edit Expense</p>

                <form onSubmit={handleUpdate} className="flex flex-col gap-2 md:ml-[590px] mt-[50px] px-[20px] pt-[30px] bg-purple-200 h-[460px] w-[380px] md:w-[500px] pt-[10px] rounded-lg text-2xl border-4 border-purple-950 shadow-lg shadow-purple-900">
                <label>
                        Category:
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                </label>
                    
                <label>
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                </label>

                <label>
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                </label>
                
                        <div className="flex justify-between mt-[30px] mx-[30px]">
                            <button className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl  border border-4 border-purple-950 hover:bg-purple-400"><a href="records.html">Cancel</a></button>
                            <button className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl border border-4 border-purple-950 hover:bg-purple-400">Submit</button>
                        </div>
                </form>
                
            </div>
    </div>
</div>

  )
}

export default EditExpense
