"use client"

import { useUser } from "@clerk/nextjs"
import { IndianRupee, Target ,TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function DashOne ({setChartData}){
    const {isLoaded,user} = useUser()
    const [totalSpent, setTotalSpent] = useState('')
    const [totalBudget, setTotalBudget]= useState('')
    const [budgetUsed, setBudgetUsed] = useState('')
    const [netSavingsRate, setNetSavingsRate] = useState('')
    const [spentChange, setSpentChange] = useState('')
    const [savingsChange, setSavingsChange] = useState('')

    useEffect(() => {
        user && fetchDashBoardInfo(user?.primaryEmailAddress?.emailAddress)
        //if (user) testWithDummyData()
    },[isLoaded,user])

    const Calculations = async(data) => {

      const chartData = data.map((item) => ({
        date: new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        budget: Number(item.budget).toFixed(2)%1==0 ? Number(item.budget) : Number(item.budget).toFixed(2),
        expense: Array.isArray(item.expenses)
          ? item.expenses.reduce((sum, e) => sum + Number(e.expense), 0).toFixed(2)%1==0 ? item.expenses.reduce((sum, e) => sum + Number(e.expense), 0) : item.expenses.reduce((sum, e) => sum + Number(e.expense), 0).toFixed(2)
          : 0
      }));

      //console.log(chartData)
      setChartData(chartData)

        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()
        const lastMonth = currentMonth===0 ? 11 : currentMonth-1
        const lastMonthYear = currentMonth===0 ? currentYear-1 : currentYear

        const isInMonth = (dateStr,month,year) => {
            const d = new Date(dateStr)
            return d.getMonth() === month && d.getFullYear() === year
        }
        
        const currentData = data.filter((b) => isInMonth(b.createdAt,currentMonth,currentYear))
        const lastMonthData = data.filter((b) => isInMonth(b.createdAt,lastMonth,lastMonthYear))

        const summarize = (entries) => {
            const expenses = entries.flatMap((b) => b.expenses)
            const budgets = entries.map(({expenses,...rest}) => rest)

            const totalExpense = expenses.reduce((sum, e) => sum + Number(e.expense), 0)
            const totalBudget = budgets.reduce((sum, e) => sum + Number(e.budget), 0)

            const budgetUsed = totalBudget === 0 ? 0 : (totalExpense / totalBudget) * 100
            const savings = 100 - budgetUsed

            return { totalExpense, totalBudget, budgetUsed, savings }
        }

        const current = summarize(currentData)
        const all = summarize(data);
        
        //setTotalSpent(current.totalExpense % 1 === 0 ? current.totalExpense.toFixed(0) : current.totalExpense.toFixed(2))
        //setTotalBudget(current.totalBudget % 1 === 0 ? current.totalBudget.toFixed(0) : current.totalBudget.toFixed(2))
        //setBudgetUsed(current.budgetUsed % 1 === 0 ? current.budgetUsed.toFixed(0) : current.budgetUsed.toFixed(2))
        //setNetSavingsRate(current.savings % 1 === 0 ? current.savings.toFixed(0) : current.savings.toFixed(2))
        
        setTotalSpent(all.totalExpense % 1 === 0 ? all.totalExpense.toFixed(0) : all.totalExpense.toFixed(2));
        setTotalBudget(all.totalBudget % 1 === 0 ? all.totalBudget.toFixed(0) : all.totalBudget.toFixed(2));
        setBudgetUsed(all.budgetUsed % 1 === 0 ? all.budgetUsed.toFixed(0) : all.budgetUsed.toFixed(2));
        setNetSavingsRate(all.savings % 1 === 0 ? all.savings.toFixed(0) : all.savings.toFixed(2));

        const last = summarize(lastMonthData)
        let spentDiff = null
        let savingsDiff = null

        if (last.totalExpense > 0) {
        spentDiff = ((current.totalExpense - last.totalExpense) / last.totalExpense) * 100
        setSpentChange(spentDiff % 1 === 0 ? spentDiff.toFixed(0) : spentDiff.toFixed(2))
        } else {
        setSpentChange("New")
        }

        if (last.totalBudget > 0 && last.totalExpense >= 0) {
        savingsDiff = ((current.savings - last.savings) / last.savings) * 100
        setSavingsChange(savingsDiff % 1 === 0 ? savingsDiff.toFixed(0) : savingsDiff.toFixed(2))
        } else {
        setSavingsChange("New")
}

        // const allExpenses = data.flatMap((b) => b.expenses)

        // const allBudgets = data.map(({expenses,...rest}) => rest)
        
        // const expenseSum = allExpenses.reduce((sum,e) => sum+Number(e.expense),0)
        // setTotalSpent(expenseSum%1===0 ? expenseSum.toFixed(0)  : expenseSum.toFixed(2))

        // const totalBudget = allBudgets.reduce((sum,e) => sum+Number(e.budget),0)
        // setTotalBudget(totalBudget%1===0 ? totalBudget.toFixed(0) :  totalBudget.toFixed(2))

        // const usedBudgetPercent = (expenseSum/totalBudget)*100>100 ? 100 : (expenseSum/totalBudget)*100
        // setBudgetUsed(usedBudgetPercent%1===0 ? usedBudgetPercent.toFixed(0) : usedBudgetPercent.toFixed(2))

        // const savingsRate = ((totalBudget - expenseSum) / totalBudget) * 100;
        // setNetSavingsRate(savingsRate % 1 === 0 ? savingsRate.toFixed(0) : savingsRate.toFixed(2))

    }
    const testWithDummyData = () => {
  const dummyData = [
    // ✅ This Month: June (LOWER values)
    {
      createdAt: "2025-06-10T12:00:00Z", // June
      budget: 8000,
      expenses: [
        { expense: 1000 },
        { expense: 2000 },
      ],
    },
    {
      createdAt: "2025-06-15T12:00:00Z", // June
      budget: 4000,
      expenses: [
        { expense: 1000 },
      ],
    },

    // ✅ Last Month: May (HIGHER values)
    {
      createdAt: "2025-05-05T12:00:00Z", // May
      budget: 10000,
      expenses: [
        { expense: 2500 },
        { expense: 3000 },
      ],
    },
    {
      createdAt: "2025-05-18T12:00:00Z", // May
      budget: 5000,
      expenses: [
        { expense: 2000 },
        { expense: 1000 },
      ],
    },
    {
      createdAt: "2025-05-25T12:00:00Z", // May
      budget: 3000,
      expenses: [
        { expense: 1000 },
      ],
    },
  ]

  Calculations(dummyData)
}

    const fetchDashBoardInfo = async(email) => {
        try{
            const res = await fetch(`/api/getInfo?email=${email}`)
            const data = await res.json()
            Calculations(data)
        } catch (error){
            toast("Failed fetching informations ❌")
        }
    }

    const cards = [
      {
          id: 1,
          head: "TOTAL SPENT",
          value: `₹${totalSpent}`,
          stats: spentChange === "New"
          ? <span className="text-gray-400">New this month</span>
          : (
              <span className={Number(spentChange) >= 0 ? "text-green-500" : "text-red-500"}>
              {Number(spentChange) >= 0 ? "⬆️" : "⬇️"} {Math.abs(spentChange)}% from last month
              </span>
          ),
          icon: IndianRupee,
          color: "text-purple-500",
      },
      {
          id: 2,
          head: "BUDGET USED",
          value: `${budgetUsed}%`,
          stats: `₹${totalSpent} of ₹${totalBudget}`,
          icon: Target,
          color: "text-green-500",
      },
      {
          id: 3,
          head: "SAVINGS RATE",
          value: `${netSavingsRate}%`,
          stats: savingsChange === "New"
          ? <span className="text-gray-400">New this month</span>
          : (
              <span className={Number(savingsChange) >= 0 ? "text-green-500" : "text-red-500"}>
              {Number(savingsChange) >= 0 ? "⬆️" : "⬇️"} {Math.abs(savingsChange)}% from last month
              </span>
          ),
          icon: TrendingUp,
          color: "text-blue-500"
      }
    ]

    return (
<div className="w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap mb-8">
  {cards.map((c, id) => (
    <div
      key={id}
      className="flex justify-between items-center p-4 rounded-2xl bg-[#291043] w-full sm:w-[48%] lg:w-1/3"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-sm sm:text-base font-semibold">{c.head}</h2>
        <h1 className={`${c.color} text-xl sm:text-2xl font-bold`}>{c.value}</h1>
        <p className="text-sm opacity-80">{typeof c.stats === "string" ? c.stats : c.stats}</p>
      </div>
      <div className="ml-4">
        <c.icon className={`w-6 h-6 ${c.color}`} />
      </div>
    </div>
  ))}
</div>

    )
}