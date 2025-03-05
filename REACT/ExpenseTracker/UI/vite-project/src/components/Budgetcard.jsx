import React from "react";
import edit from '../assets/images/edit.svg'
import { Link } from "react-router-dom";
import DeleteBudget from "../pages/Deletebudget";

const BudgetCard = ({ date, transactions }) => {
  let transactionElements = []

  for (let i = 0; i < transactions.length; i++) {
    const entry = transactions[i]

    transactionElements.push(
      <div key={i} className="flex justify-between items-center border-b py-2 text-white">
        <p>{entry.category}</p>
        <p className="font-bold text-white">${entry.budget}</p>
        
        {entry.message && (
          <p className="text-red-500 font-semibold">{entry.message}</p>
        )}

        <div class="flex items-center gap-4">
            <Link to={`/editbudget?category=${entry.category}&month=${entry.month}&amount=${entry.budget}`}>
                <img src={edit} className="h-[25px]" alt="Edit" />
            </Link>

            <DeleteBudget category={entry.category} month={entry.month}/>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 mb-3 shadow-lg rounded-lg bg-purple-950 w-[1000px]  ml-[70px] mt-[70px]">
      <h3 className="text-lg font-semibold mb-2 text-white">{date}</h3>
      {transactionElements}
    </div>
  )
}

export default BudgetCard