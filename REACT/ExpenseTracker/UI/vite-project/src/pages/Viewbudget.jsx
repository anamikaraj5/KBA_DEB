import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import BudgetCard from "../components/Budgetcard.jsx";

const BudgetTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch budget data from backend
  const fetchBudgets = async (month) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/viewbudget1?dates=${month}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch budgets");
        setBudgets([]);
        setTotalBudget(0);
        setTotalSpent(0);
        setTotalBalance(0);
      } else {
        setBudgets(data.categories);
        setTotalBudget(data.total_budget);
        setTotalSpent(data.total_spent);
        setTotalBalance(data.total_balance);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchBudgets(selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />

      <div className="md:flex">
        <Sidebar />

        <div className="w-full p-6">
          <div className="flex justify-between items-center ml-[70px]">
            {/* Month Selector */}
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border rounded-md h-[70px] text-2xl"
            />

            {/* Total Budget Details */}
            <div className="text-3xl flex gap-8 font-bold">
              <p>Total Budget: ${totalBudget}</p>
              <p>Total Spent: ${totalSpent}</p>
              <p>Remaining Balance: ${totalBalance}</p>
            </div>
          </div>

          {/* Loading & Error Messages */}
          {loading && <p className="text-center mt-10 text-lg">Loading...</p>}
          {error && <p className="text-center mt-10 text-red-500">{error}</p>}

          {/* Budget List */}
          {!loading && !error && budgets.length > 0 ? (
            <BudgetCard date={selectedMonth} transactions={budgets} />
          ) : (
            !loading && <p className="text-center mt-10">Please select any month....</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
