import React from "react";
import edit from '../assets/images/edit.svg'
import delete1 from '../assets/images/delete.svg'
import { Link } from "react-router-dom";
import DeleteExpense from "../pages/Deleteexpense.jsx"

const ExpenseCard = ({ date, transactions }) => {
  let transactionElements = []

  for (let i = 0; i < transactions.length; i++) {
    const entry = transactions[i]

    transactionElements.push(
      <div key={i} className="flex justify-between items-center border-b py-2 text-white">
        <p>{entry.category}</p>
        <p className="font-bold text-white">${entry.amount}</p>
        {/* <a
          href={`/updateexpense?category=${entry.category}&date=${entry.date}&amount=${entry.amount}`}
          className="text-blue-500 underline"
        >
          Edit
        </a> */}

        <div class="flex items-center gap-4">
        <Link to={`/editexpense?category=${entry.category}&date=${entry.date}&amount=${entry.amount}`}>
              <img src={edit} className="h-[25px]" alt="Edit" />
        </Link>
        <DeleteExpense category={entry.category} date={entry.date}/>
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

export default ExpenseCard

  
