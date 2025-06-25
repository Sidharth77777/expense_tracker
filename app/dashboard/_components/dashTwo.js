"use client"

import './../../globals.css'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { formatDistanceToNowStrict } from "date-fns";
import SpinnerMain from '../budgets/_components/spinnerMain'
import Chart from './chart'

export default function DashTwo (){

    const {isLoaded, user} = useUser()
    const [loadRecentExpenses, setLoadRecentExpenses] = useState(false)
    const [recentTransactions, setRecentTransactions] = useState([])

    const [totalData, setTotalData] = useState([])
    const [budgetData, setBudgetData] = useState([])
    const [expenseData, setExpenseData] = useState([])
    const [chartDataGot, setChartDataGot] = useState(false)

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            fetchRecentExpenses(user.primaryEmailAddress.emailAddress);
        }
    },[isLoaded,user])

    const dataForCharts = async(data) => {
        setTotalData(data)
        const allExpenses = data.flatMap((b) => b.expenses)
        const allBudgets = data.map(({expenses,...rest}) => rest)

        const transformedData = allBudgets.map((b) => ({
            name : b.name,
            budget : Number(b.budget)
        }))
        setBudgetData(transformedData)
        //
        //setExpenseData(allExpenses)
        //setBudgetData(allBudgets)

        //console.log(allBudgets)

        setChartDataGot(true)
    }

    const fetchRecentExpenses = async(email) => {
        setLoadRecentExpenses(true)
        try{
            const res = await fetch(`/api/getInfo?email=${email}`)
            const data = await res.json()

            dataForCharts(data)

            const allItems = []
            data.forEach((budget) => {
                allItems.push({
                    id : `budget-${budget.id}`,
                    name : budget.name,
                    netValue : budget.budget,
                    stats: formatDistanceToNowStrict(new Date(budget.updatedAt)),
                    createdAt : budget.updatedAt,
                    condition : true,
                    category: new Date(budget.updatedAt).getTime() === new Date(budget.createdAt).getTime() ? 'Created New Budget' : 'Budget Increased',
                    categoryBgColor: '#0c2f2e',
                    categoryTextColor: '#4ade80',
                })
                budget.expenses.forEach((exp) => {
                    allItems.push({
                        id : `expense-${exp.id}`,
                        name : exp.name,
                        netValue : exp.expense,
                        stats: formatDistanceToNowStrict(new Date(exp.createdAt)),
                        createdAt: exp.createdAt,
                        condition: false,
                        category: budget.name,
                        categoryBgColor: '#3e1a3a',
                        categoryTextColor: '#f87171'
                    })})})
            
            const recentSortedArray = allItems.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,20)

            setRecentTransactions(recentSortedArray)
        } catch (error) {
            console.error("Error fetching recent expenses:",data.error)
        }
        setLoadRecentExpenses(false)
    }

    // const recentTransactionsList = [
    //     {   
    //         id : 1,
    //         name : "Grocery Shopping",
    //         category : "Food and Dining" , categoryBgColor : "#421b62" , categoryTextColor : "#7c03df",
    //         stats : "2 hours",
    //         condition : true , netValue : "650",
    //     },
    //     {   
    //         id : 2,
    //         name : "Tomato Bought",
    //         category : "Food and Dining" , categoryBgColor : "#421b62" , categoryTextColor : "#7c03df",
    //         stats : "5 hours",
    //         condition : false , netValue : "256",
    //     },
    //     {   
    //         id : 3,
    //         name : "Tomato Bought",
    //         category : "Entertainment" , categoryBgColor : "#273144" , categoryTextColor : "#86efac",
    //         stats : "12 hours",
    //         condition : true , netValue : "123",
    //     },
    //     {   
    //         id : 4,
    //         name : "Gas Station",
    //         category : "Transportation" , categoryBgColor : "#202e5a" , categoryTextColor : "#67e8f9",
    //         stats : "1 day",
    //         condition : false , netValue : "65",
    //     },
        
    // ]

    return (
        <div className="flex flex-wrap xl:flex-nowrap justify-center gap-4 items-center">
            <div className="w-full md:w-full xl:w-1/2 h-120 bg-[#291043] rounded-xl p-5">
                <h1 className='text-base sm:text-3xl'>Expense Categories</h1>
                <h2 className='text-base sm:text-lg'>Current Month Breakdown</h2>
                <div className='overflow-auto scrollNone h-[400px]'>
                <Chart chartDataGot={chartDataGot} totalData={totalData} budgetData={budgetData} expenseData={expenseData}  />
                </div>
            </div>


            <div className="w-full md:w-full xl:w-1/2 h-120 bg-[#291043] rounded-xl p-5 overflow-y-scroll scrollNone">
                <div className='flex items-center gap-3'>
                    <Clock className='text-purple-500' />
                    <h1 className='text-base sm:text-3xl'>Recent Activity</h1>
                </div>
                <h2 className='text-base sm:text-lg'>Your Recent Transactions</h2>

                <div className='mt-3 mb-2 border-b-1 border-[#412958]'>

                    {loadRecentExpenses ? (<SpinnerMain />) : recentTransactions.map((r) => (
                        <div key={r.id} className="w-full h-20 bg-[#260d3c] rounded-xl px-6 py-3 mb-3 flex justify-between items-center" style={{ outline: `2px solid ${r.categoryBgColor}` }}>
                        <div>
                            <h3 className="text-base font-bold mb-2">{r.name}</h3>
                            <div className="flex items-center gap-3">
                            <div className="px-3 rounded-3xl" style={{ backgroundColor: r.categoryBgColor }}>
                                <span style={{ color: r.categoryTextColor }}>{r.category}</span>
                            </div>
                            <span className="sm:text-sm opacity-50">{r.stats} ago</span>
                            </div>
                        </div>
                        <div>
                            <h2
                            className={`text-base sm:text-xl ${r.condition ? "text-green-600" : "text-red-600"}`}>
                            {!r.condition ? `- ₹${Number(r.netValue)%1===0 ? Number(r.netValue) : Number(r.netValue).toFixed(2)}` : `+ ₹${Number(r.netValue)%1===0 ? Number(r.netValue) : Number(r.netValue).toFixed(2)}`}
                            </h2>
                        </div>
                        </div>
                    ))}



                </div>
                <Link href="/dashboard/expenses"><h2 className='text-base sm:text-md hover:text-blue-800 cursor-pointer text-center mt-1 mb-2 text-blue-400'>View All Expenses</h2></Link>
            </div>

        </div>
    )
}