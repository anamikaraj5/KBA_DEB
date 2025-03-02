import React from 'react'

import records from '../assets/images/Records.svg'
import add from '../assets/images/Plus.png'
import charts from '../assets/images/charts.png'
import budgets from '../assets/images/Wallet.svg'

const Sidebar = () => {
  return (
    <div>

                <div className="mt-[10px] flex gap-9 md:flex md:flex-col md:gap-6 md:ml-[20px] ml-[60px]">
                    <div className="flex flex-col text-center">
                        <img src={records} className="md:h-12 md:w-12 h-8 w-8"/>
                        <a href="records.html" >Records</a>
                    </div>
                    <div className="flex flex-col">
                        <img src={add} className="md:h-12 md:w-12 h-8 w-8"/>
                        <a href="addexpense.html" className="ml-[10px] ">Add</a>
                    </div>
                    <div className="flex flex-col">
                        <img src={charts} className="md:h-12 md:w-12 h-8 w-8"/>
                        <a href="charts.html">Charts</a>
                    </div>
                    <div className="flex flex-col">
                        <img src={budgets} className="md:h-12 md:w-12 h-8 w-8"/>
                        <a href="budget.html">Budgets</a>
                    </div>
                </div>

    </div>
  )
}

export default Sidebar