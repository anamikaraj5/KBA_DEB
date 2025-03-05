import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

const Charts = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (selectedMonth) {
            fetchExpenses(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchExpenses = async (month) => {
        try {
            const response = await fetch(`/api/getexpenses?month=${month}`, {
                method: "GET",
                credentials: "include"
            });
            
            const data = await response.json();
            if (!response.ok) {
                setError("Failed to fetch expenses");
            } else {
                setExpenses(data);
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Nav />
            <div className="md:flex">
                <Sidebar />
                <div className="w-full p-5">
                    <p className="text-4xl text-purple-950 font-bold text-center">Expenses</p>
                    <div className="flex justify-center mt-5">
                        <input 
                            type="month" 
                            className="p-2 border rounded-md h-[50px] text-2xl" 
                            value={selectedMonth} 
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mt-3">{error}</p>}
                    <div className="mt-10 flex justify-center">
                    <BarChart width={600} height={300}>...</BarChart>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
