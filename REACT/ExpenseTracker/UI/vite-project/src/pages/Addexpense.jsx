import React,{useState} from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'

const Addexpense = () => {

  const [category, setCategory] = useState("")
  const [expense, setExpense] = useState("")
  const [date, setDate] = useState("")

  const handleExpense = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/addexpense',{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({Category:category,Expense:expense,Date:date}),
        });

      if (!response.ok) {
        throw new Error("Error adding expense");
      }

      alert("Expense added successfully!!!");
     
      setCategory("")
      setExpense("");
      setDate("");
    } 
    catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    }
  }


  return (
    <div>

        <Nav/>
        <div class="md:flex ">
                <Sidebar/>

                <div>
                    <p class="md:mt-[20px] md:ml-[700px] mt-[40px] mx-[160px] text-5xl text-purple-950 font-bold">Add Expense</p>

                    <form onSubmit={handleExpense} class="flex flex-col gap-2 md:ml-[590px] mt-[50px] px-[20px] pt-[30px] bg-purple-200 h-[460px] w-[380px] md:w-[500px] pt-[10px] rounded-lg text-2xl border-4 border-purple-950 shadow-lg shadow-purple-900">
                            <label>Category</label>
                            <select class="h-[40px] md:w-[450px] bg-purple-300"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required>
                            
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
                        
                            <label class="mt-[20px]">Expense</label>
                            <input type="text" 
                                    class="h-[40px] md:w-[450px] bg-purple-300"
                                    value={expense}
                                    onChange={(e) => setExpense(e.target.value)}
                                    required
                            /> 


                            <label class="mt-[20px]">Date</label>
                            <input type="date" 
                                    class="h-[40px] md:w-[450px] bg-purple-300"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                            />

                            <div class="flex justify-between mt-[30px] mx-[30px]">
                                <button class="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl  border border-4 border-purple-950 hover:bg-purple-400"><a href="records.html">Cancel</a></button>
                                <button class="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl border border-4 border-purple-950 hover:bg-purple-400">Submit</button>
                            </div>
                    </form>
                    
                </div>
        </div>

    </div>
  )
}

export default Addexpense