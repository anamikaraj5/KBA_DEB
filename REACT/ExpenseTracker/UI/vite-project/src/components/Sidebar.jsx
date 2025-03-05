import React from 'react'
import { Link } from 'react-router-dom'

import records from '../assets/images/Records.svg'
import add from '../assets/images/Plus.png'
import charts from '../assets/images/charts.png'
import budgets from '../assets/images/Wallet.svg'
import addexp from '../assets/images/addexp.svg'
import addbudg from '../assets/images/addbudg.svg'

const Sidebar = () => {
  return (
    <div>

                <div className="mt-[10px] flex gap-9 md:flex md:flex-col md:gap-6 md:mt-[20px]">
                    
                    <div className="flex flex-col">
                        <img src={addexp} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[60px]  "/>
                        <Link to={'/addexpense'} className="ml-[10px] md:ml-[20px] ml-[60px] ">Add Expense</Link>
                    </div>

                    <div className="flex flex-col ">
                        <img src={records} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[60px]"/>
                        <Link to={'/viewexpense'} className='md:ml-[20px] ml-[60px]'>Records</Link>
                    </div>
                    
                    <div className="flex flex-col">
                        <img src={addbudg} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[60px]"/>
                        <Link to={'/addbudget'} className='md:ml-[20px] ml-[60px]'>Add Budget</Link>
                    </div>

                    <div className="flex flex-col">
                        <img src={budgets} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[60px]"/>
                        <Link to={'/viewbudget'} className='md:ml-[20px] ml-[60px]'>Budgets</Link>
                    </div>

                    <div className="flex flex-col">
                        <img src={charts} className="md:h-12 md:w-12 h-8 w-8 md:ml-[20px] ml-[60px]"/>
                        <a href="charts.html" className='md:ml-[20px] ml-[60px]'>Charts</a>
                    </div>
                </div>

    </div>
  )
}

export default Sidebar