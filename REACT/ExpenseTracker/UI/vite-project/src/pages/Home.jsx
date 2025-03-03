import React from 'react'
import Nav from "../components/Nav"
import records from '../assets/images/Records.svg'
import add from '../assets/images/Plus.png'
import charts from '../assets/images/charts.png'
import budgets from '../assets/images/Wallet.svg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>

        <Nav/>

        <div className="grid md:grid-cols-2 md:gap-9 gap-7 md:ml-[340px] md:mt-[150px] ml-[5px] mt-[40px] ">
            <div className="bg-purple-300 md:w-[500px] md:h-[250px] h-[150px] w-[400px] flex flex-col items-center justify-center border-[10px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg">
                <img src={records} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><Link to={'/viewexpense'}>RECORDS</Link></p>
            </div>

            <div className="bg-purple-300 md:w-[500px] md:h-[250px] h-[150px] w-[400px] flex flex-col items-center justify-center border-[10px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg">
                <img src={add} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><Link to={'/addexpense'}>ADD</Link></p>
            </div>

            <div className="bg-purple-300 md:w-[500px] md:h-[250px] h-[150px] w-[400px] flex flex-col items-center justify-center border-[10px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg">
                <img src={charts} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><a href="charts.html">CHARTS</a></p>
            </div>

            <div className="bg-purple-300 md:w-[500px] md:h-[250px] h-[150px] w-[400px] flex flex-col items-center justify-center border-[10px] border-purple-900 shadow-lg shadow-purple-700 rounded-lg">
                <img src={budgets} className="md:h-[80px] h-[60px]"/>
                <p className="md:text-5xl text-4xl font-bold"><a href="budget.html">BUDGETS</a></p>
            </div>
        </div>


    </div>
  )
}

export default Home