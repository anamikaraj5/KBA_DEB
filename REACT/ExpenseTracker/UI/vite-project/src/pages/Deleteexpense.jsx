import React from "react";
import delete1 from '../assets/images/delete.svg'
import { useNavigate } from "react-router-dom";


const DeleteExpense = ({ category, date }) => {

    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;

        try {
        const response = await fetch("/api/deleteexpense", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ Category: category, Date: date }),
        });

        if (!response.ok) {
            alert("Failed to delete expense");
        } 

        alert("Expense deleted successfully!");
        navigate('/viewexpense')
        } 
        
        catch (error) {
        console.error("Error:", error);
        alert("Error deleting expense");
        }
    };

    return (
        <button onClick={handleDelete}>
        <img src={delete1} className="h-[30px]" alt="Delete" />
        </button>
    );
};

export default DeleteExpense;
