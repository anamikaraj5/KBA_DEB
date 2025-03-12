import React from "react"

const StudentCard = ({ course, transactions }) => {
  let transaction = []

  for (let i = 0; i < transactions.length; i++) {
    const entry = transactions[i]

    transaction.push(
      <div key={i} className="flex justify-between items-center  py-2 text-black font-bold">
        <p >Student Name : {entry.student_name}</p>
        <p >Enrollment No : {entry.enrollment_no}</p>
        <p >Date : {entry.date}</p>
      </div>
    )
  }

  return (
    <div className="p-4 mb-3 shadow-lg rounded-lg bg-purple-200 w-[1000px]  ml-[70px] mt-[70px]">
      <h3 className="text-lg font-semibold mb-2 text-red-950">{course}</h3>
      {transaction}
    </div>
  )
}

export default StudentCard