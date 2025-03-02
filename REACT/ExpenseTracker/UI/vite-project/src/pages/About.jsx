import React from 'react'
import Nav from '../components/Nav'

const About = () => {
  return (
    <div>

        <Nav/>

        <div className="text-white mt-[70px] md:ml-[630px] ml-[5px] md:h-[500px] h-fit w-[400px] md:w-[700px] flex flex-col text-center rounded-lg border-purple-900 shadow-purple-700 shadow-lg bg-purple-950" >
            <p className="text-5xl mt-[20px]">About</p>
            <p className="text-xl mt-[30px] mx-[30px] text-left leading-loose">Budget Buddy is your smart and simple expense tracker designed to help you manage your finances effortlessly. Easily add your daily expenses and income, and visualize them through interactive charts. Set personalized budgets to track your spending habits and stay on top of your financial goals. Budget Buddy empowers you to make informed decisions and build better money management skills.</p>
        </div>

    </div>
  )
}

export default About