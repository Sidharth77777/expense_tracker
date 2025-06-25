"use client"

import { Edit, Plus, Trash2, TriangleAlert } from "lucide-react"
import CreateBudget from "./createBudget";
import EditTheBudget from "./editTheBudget";
import DeleteThisBudget from "./deleteTheBudget";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SpinnerMain from "./spinnerMain";

export default function BudgetTwo({refreshAll}){

  const [refreshFlag, setRefreshFlag] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const [budgetList, setBudgetList] = useState([])
  const [budgetsLoaded, setBudgetsLoaded] = useState(false)

  useEffect(() => {
  if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
    setRefreshFlag(true); 
  }
}, [isLoaded, user]);

  useEffect(() => {
  if (refreshFlag && isLoaded && user?.primaryEmailAddress?.emailAddress) {
    fetchBudgets(user.primaryEmailAddress.emailAddress);
    setRefreshFlag(false);
  }
}, [refreshFlag, isLoaded, user]);


  useEffect(() => {
    if (budgetsLoaded) {
        const timer = setTimeout(() => {
        setMounted(true)
    },100)
    return () => clearTimeout(timer)
    }
    
  },[budgetsLoaded])

  const fetchBudgets = async (email) => {
    try {
      const res = await fetch(`/api/getInfo?email=${email}`);
      const data = await res.json();
      setBudgetList(data)
      setBudgetsLoaded(true)
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
    }
  };

    const budgetCategoriesData = [
        {
            id : 1,
            name : "Food and Dining",
            //color : "bg-purple-500",
            expense : 200 , budget : 300,
            icon : "😊",
        },
        {
            id : 2,
            name : "Transportation",
            //color : "bg-blue-500",
            expense : 810 , budget : 800,
            icon : "🚗",
        },
        {
            id : 3,
            name : "Entertainment",
            //color : "bg-green-500",
            expense : 290 , budget : 305,
            icon : "🎦",
        },
        {
            id : 4,
            name : "Shopping",
            //color : "bg-orange-500",
            expense : 120 , budget : 925,
            icon : "🛒",
        },
        {
            id : 5,
            name : "Bills and Utilities",
            //color : "bg-red-500",
            expense : 100 , budget : 120,
            icon : "🧾",
        },
    ]

    const budgetCategoriesList = budgetList.map((item) => {
        const totalExpense = item.expenses.reduce((sum,e) => sum+Number(e.expense),0)
        const budgetAmount = Number(item.budget)

        const warner = ((totalExpense / budgetAmount)*100).toFixed(2)
        const progress = Math.min((totalExpense / budgetAmount)*100, 100).toFixed(2)
        const remaining = (budgetAmount - totalExpense).toFixed(2)

        return {
            ...item,
            expense : totalExpense,
            warner,
            progress,
            remaining,
        }

    })

    return (
        <div className="w-full bg-[#291043] rounded-xl sm:p-6 p-2">
            <div className="flex justify-between items-center w-full">
                <div>
                    <h1 className="text-base lg:text-2xl font-bold">BUDGET CATEGORIES</h1>
                    <h2 className="text-base lg:text-sm">Manage your spending categories and limits</h2>
                </div>
                <div className="bg-[#9333ea] rounded cursor-pointer sm:px-3 sm:py-2 p-2 hover:bg-blue-600 gap-2 flex justify-between items-center"> 
                    <Plus />
                    <CreateBudget onBudgetCreated={() => setRefreshFlag(true)} refreshAll={refreshAll} />
                </div>
            </div>
               <div className="w-full grid grid-cols-1  xl:grid-cols-2 gap-4 mb-8 mt-6">


                    {!budgetsLoaded ? <div className="w-full flex justify-center items-center"><SpinnerMain /></div> : budgetsLoaded && budgetCategoriesList.length==0 ? <div className="w-full flex justify-center items-center"><h1 className="sm:text-xl text-xl">📝 No budgets yet – Tap the ➕ to create one!</h1></div> : budgetsLoaded && budgetCategoriesList.map((b) => (
                    <div
                    onClick={() => router.push(`/dashboard/budgets/${b.id}`)}
                    key={b.id}
                    className={`w-full h-60 bg-gradient-to-r from-[#160c27] via-[#240d39] to-[#230d38] rounded-xl cursor-pointer px-6 py-6 outline-2 ${
                        b.progress < 90
                        ? 'outline-purple-800 xl:hover:shadow-[0_0_20px_4px_rgba(147,51,234,0.4)]'
                        : 'outline-red-800 xl:hover:shadow-[0_0_20px_4px_rgba(239,68,68,0.4)]'
                    } transition-shadow duration-300 ease-in-out`}
                    >
                            <div className="flex justify-between items-center">
                                <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className={`rounded-full flex justify-center items-center h-6 w-6`}>{b.icon}</div>
                                    <h2 className="text-base sm:text-lg">{b.name}</h2>
                                    <div className={`sm:px-3 sm:py-1 px-2 rounded-2xl ${b.progress<=60 ? "bg-green-300 " : b.progress<=90 ? "bg-orange-500" : "bg-red-500"}`}>
                                        <span className="text-black">{b.warner<=60 ? "On Track" : b.warner<=90 ? "Warning" : b.warner<100 ? "Alert" : b.warner==100 ? "Full" : "Exceeded ! Increase the budget" }</span>
                                </div>
                                </div>
                               <p className="opacity-80">
                                ₹{Number(b.expense) % 1 === 0 ? Number(b.expense) : Number(b.expense).toFixed(2)} / 
                                {Number(b.budget) % 1 === 0 ? Number(b.budget) : Number(b.budget).toFixed(2)}
                                </p>

                                </div>

                                <div>
                                    <div className="flex items-center mb-5 gap-5">
                                        <div onClick={(e) => e.stopPropagation()}><EditTheBudget refreshAll={refreshAll} onBudgetEdited={() => setRefreshFlag(true)} id={b.id} name={b.name} budget={b.budget} emoji={b.icon} createdBy={b.createdBy} /></div>
                                        <div onClick={(e) => e.stopPropagation()}><DeleteThisBudget refreshAll={refreshAll} onBudgetDeleted={() => setRefreshFlag(true)} name={b.name} createdBy={b.createdBy} /></div>
                                        
                                    </div>
                                    <div>
                                        <span className={`opacity-90 ${b.warner>100 ? 'text-red-500' : ''}`}>{Number(b.progress)%1===0 ? Number(b.progress) : Number(b.progress).toFixed(2)}% {b.warner>100 ? "‼️" : ""}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-5 h-4 bg-gray-700 rounded-full overflow-hidden mb-6">
                            <div
                                className={`${b.warner>100 ? 'bg-red-600' : b.warner>60 ? 'bg-orange-500': b.warner>40? 'bg-yellow-500':  b.warner>0 ? 'bg-green-500': 'bg-purple-600'}  h-full rounded-full transition-all duration-500 delay-150 ease-out`}
                                style={{ width: mounted ? `${b.progress}%` : `0%` }}
                            ></div>
                            </div>

                            <span className={`${(b.remaining<0) ? 'text-red-600' : ""} opacity-50`}>₹ {Number(b.remaining)%1===0 ? Number(b.remaining) : Number(b.remaining).toFixed(2)} remaining {(b.remaining<0) ? <TriangleAlert className="inline" /> : ""}</span>
                        </div>
                    ))}

                        

                    
                    
                </div>
            
        </div>
    )
}