"use client"

import { BadgeIndianRupee, IndianRupee, SignalHigh } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ExpensesOne({refreshTrigger}){
    const {isLoaded, user} = useUser()
    const [budgetInfo, setBudgetInfo] = useState([])
    const [expenseInfo, setExpenseInfo] = useState([])
    const [selectedRange, setSelectedRange] = useState("all_time");

    const [totalExpenses, setTotalExpenses] = useState('')
    const [highestSpendCategory, setHighestSpendCategory] = useState('...')
    const [netBalance, setNetBalance] = useState('')

    useEffect(() => {
        user && fetchDetails(user?.primaryEmailAddress?.emailAddress)
    },[isLoaded,user,refreshTrigger,selectedRange])

    const calculations = async (data) => {
    const today = new Date();

    const filteredData = data.map((b) => {
        const filteredExpenses = b.expenses.filter((e) => {
            const expenseDate = new Date(e.createdAt); 
            if (selectedRange === "this_month") {
                return (
                    expenseDate.getMonth() === today.getMonth() &&
                    expenseDate.getFullYear() === today.getFullYear()
                );
            } else if (selectedRange === "this_week") {
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay()); 
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6); 
                return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
            } else {
                return true; 
            }
        });

        return {
            ...b,
            expenses: filteredExpenses
        };
    });

    const allExpenses = filteredData.flatMap((b) => b.expenses);
    setExpenseInfo(allExpenses);

    const allBudgets = filteredData.map(({ expenses, ...rest }) => rest);
    setBudgetInfo(allBudgets);

    const total = allExpenses.reduce((sum, e) => sum + Number(e.expense), 0);
    setTotalExpenses(total.toFixed(2));

    let categoryMap = {};
    filteredData.forEach((b) => {
        const categoryTotal = b.expenses.reduce((sum, e) => sum + Number(e.expense), 0);
        categoryMap[b.name] = categoryTotal;
    });

    const highestCategory = Object.entries(categoryMap).reduce(
        (max, cur) => (cur[1] > max[1] ? cur : max),
        ["None", 0]
    );
    setHighestSpendCategory(highestCategory);

    const totalBudget = filteredData.reduce((sum, e) => sum + Number(e.budget), 0);
    const balance = (totalBudget - total).toFixed(2);
    setNetBalance(balance);
};


    const fetchDetails = async(email) => {
        try{
            const res = await fetch(`/api/getInfo?email=${email}`)
            const data = await res.json()
            calculations(data)
            
        } catch(error) {
            toast("Failed fetching data ❌")
        }
    }

    const expensesCardList = [
        {
            id : 1,
            head : "TOTAL EXPENSES",
            value : totalExpenses,
            stats : "This Month",
            icon : IndianRupee,
            color : "text-red-500"
        },
        {
            id : 2,
            head : "HIGHEST SPENT CATEGORY",
            value : highestSpendCategory[0],
            stats : "This Month", //need to get the %
            icon : SignalHigh,
            color : "text-purple-500"
        },
        {
            id : 3,
            head : "NET BALANCE",
            value : netBalance,
            stats : "Net This Month",
            icon : BadgeIndianRupee,
            color : "text-green-500"
        },
    ]
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-300 mb-1 w-1/2 ">
                Showing data for:{" "}
                <span className="font-semibold text-white capitalize inline">
                    {selectedRange.replace("_", " ")}
                </span>
                </div>
            <div className="w-full mb-2">
            
            <div className="w-full flex justify-end mb-1">
            <select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="rounded-lg bg-purple-800 text-white focus:outline-none p-2"
            >
                <option value="all_time">All Time</option>
                <option value="this_month">This Month</option>
                <option value="this_week">This Week</option>
            </select>
            </div>
            </div>
            </div>

<div className="w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap mb-8">
  {expensesCardList.map((c, id) => (
    <div
      key={id}
      className="flex justify-between items-center p-4 rounded-2xl bg-[#291043] w-full sm:w-[48%] lg:w-1/3"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-sm sm:text-base font-semibold">{c.head}</h2>
        <h1 className={`${c.color} text-xl sm:text-2xl font-bold`}>
          {c.id === 2 ? `${c.value}` : c.value ? `₹ ${c.value}` : ''}
        </h1>
        <p className={`text-sm opacity-80 ${c.color}`}>
          {c.stats}
        </p>
      </div>
      <div className="ml-4">
        <c.icon className={`w-6 h-6 ${c.color}`} />
      </div>
    </div>
  ))}
</div>

      </div>

    )
}