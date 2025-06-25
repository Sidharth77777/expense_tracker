"use client"

import { Target, TrendingUp, TriangleAlert } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export default function BudgetOne({refreshAll}) {
    const {isLoaded,user} = useUser()
    const [totalBudget, setTotalBudget] = useState('')
    const [totalExpense, setTotalExpense] = useState('')
    const [percentUsed, setPercentUsed] = useState('')
    const [netRemaining, setNetRemaining] = useState('')

    useEffect(() => {
        user && fetchBudgetInfo(user?.primaryEmailAddress?.emailAddress)
    },[isLoaded, user,refreshAll])

    const calculationsBudget = async(data) => {
        const allExpenses = data.flatMap((b) => b.expenses)

        const allBudgets = data.map(({expenses, ...rest}) => rest)

        const totalBudgetSum = allBudgets.reduce((sum,e) => sum+Number(e.budget),0)
        setTotalBudget(totalBudgetSum.toFixed(2))

        const totalExpenseSum = allExpenses.reduce((sum,e) => sum+Number(e.expense),0)
        setTotalExpense(totalExpenseSum.toFixed(2))

        const percentBudgetUsed = ((totalExpenseSum/totalBudgetSum)*100).toFixed(2)
        setPercentUsed(percentBudgetUsed)

        const remaining = totalBudgetSum - totalExpenseSum
        setNetRemaining(Number(remaining)<0 ? '0.00' : remaining.toFixed(2))

    }

    const fetchBudgetInfo = async(email) => {
        try{
            const res = await fetch(`/api/getInfo?email=${email}`)
            const data = await res.json()

            calculationsBudget(data)
        } catch(error){
            toast('Error fetching informations ❌')
        }
        
    }

    const budgetCardsList = [
        {
            id : 1,
            head : "TOTAL BUDGET",
            value : totalBudget,
            stats : "Allocated",
            icon : Target,
            color : "text-green-500"
        },
        {
            id : 2,
            head : "TOTAL SPENT",
            value : totalExpense,
            stats : percentUsed, //need to get the %
            icon : TrendingUp,
            color : "text-purple-500"
        },
        {
            id : 3,
            head : "REMAINING",
            value : netRemaining,
            stats : "Available to spend",
            icon : TriangleAlert,
            color : "text-red-500"
        },
    ]
    return (
<div className="w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap mb-8">
    {budgetCardsList.map((c) => (
      <div
        key={c.id}
        className="flex justify-between items-center p-4 rounded-2xl bg-[#291043] w-full sm:w-[48%] lg:w-1/3"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-sm sm:text-base font-semibold">{c.head}</h2>
          <h1 className={`${c.color} text-xl sm:text-2xl font-bold`}>₹{c.value}</h1>
          <p className={`text-sm opacity-80 ${c.color}`}>
            {c.id === 2 ? `${c.stats}% of budget used` : c.stats}
          </p>
        </div>
        <div className="ml-4">
          <c.icon className={`w-6 h-6 ${c.color}`} />
        </div>
      </div>
    ))}
  </div>
    )
}