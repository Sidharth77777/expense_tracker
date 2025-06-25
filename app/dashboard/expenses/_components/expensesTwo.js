"use client"

import { useState, useEffect } from "react"
import { Plus, RefreshCcw, RotateCw, Search } from "lucide-react"
import { DropdownBudgets } from "./dropDownBudgets"
import ExpensesList from "./expensesList"
import CreateExpense from "./createExpense"
import { useUser } from "@clerk/nextjs";
import SpinnerMain from "../../budgets/_components/spinnerMain"

export default function ExpensesTwo({refreshTrigger}){

    const {user, isLoaded} = useUser()
    const [expenseList, setExpenseList] = useState([])
    const [expensesLoaded, setExpensesLoaded] = useState(false)

    const [onSearchChange, setOnSearchChange] = useState('')
    const [onBudgetCategoryChange, setOnBudgetCategoryChange] = useState('')
    const [onBudgetCategoryChangeRenderRemove, setOnBudgetCategoryChangeRenderRemove] = useState(false)
    const [refreshList, setRefreshList] = useState(false)

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            fetchExpenses(user.primaryEmailAddress.emailAddress);
        }
    },[isLoaded,user])

    const fetchExpenses = async(email) => {
        setExpensesLoaded(false)
        try{
            const res = await fetch(`/api/expenses?email=${email}`);
            const data = await res.json();
            refreshTrigger?.()

            const formattedData = data.map((item) => {
                const date = new Date(item.createdAt);
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                return {
                    ...item,
                    createdDate: formattedDate,
                }
            })
            setExpenseList(formattedData)
            setOnBudgetCategoryChangeRenderRemove(false)
            setExpensesLoaded(true)
        } catch (error){
            console.error("Failed to fetch budgets ❌:", error);
        }}

        const getBudgetCategoryFromChild = (data) => {
            setOnBudgetCategoryChange(data)
        }

        const filteredExpenses = expenseList.filter((expense) => {
            const nameMatch = onSearchChange === "" || expense.name?.toLowerCase().includes(onSearchChange.toLowerCase());
            const categoryMatch = onBudgetCategoryChange === "" || expense.budgetName?.toLowerCase() === onBudgetCategoryChange.toLowerCase();
            
            return nameMatch && categoryMatch;
        });

        const handleRefresh = () => {
            setRefreshList(true)
            setTimeout(() => {
                setRefreshList(false)
            },800)
            setOnBudgetCategoryChange('')
            setOnBudgetCategoryChangeRenderRemove(true)
            setOnSearchChange('')
            fetchExpenses(user.primaryEmailAddress.emailAddress);
        }

    
    return (
        <div className="w-full bg-[#291043] rounded-xl p-6">
                <div className="flex justify-between items-center w-full">
                <div>
                    <h1 className="text-base lg:text-2xl font-bold">EXPENSE CATEGORIES</h1>
                    <h2 className="text-base sm:text-sm lg:text-lg">Add , Edit and Track all of your expenses</h2>
                </div>
                
                <div className="flex justify-center items-center gap-3">
                <div title="Refresh"><RotateCw  className={`cursor-pointer opacity-60 hover:opacity-100 ${refreshList && 'animate-spin'}`} onClick={() => handleRefresh() } /></div>
                <CreateExpense onExpenseCreated={() => fetchExpenses(user.primaryEmailAddress.emailAddress)} />
                </div>

            </div>
                <div className="flex justify-between items-center mt-5 mb-3">
                    <div className="flex items-center lg:w-6/8 sm:w-3/5 h-10 outline-1 outline-[#503c66] bg-[#432d5a] rounded-2xl px-3 gap-2 mr-3">
                    <label htmlFor="searchExpense" className="flex items-center justify-center">
                        <Search className="text-muted-foreground w-5 h-5" />
                    </label>
                    <input id="searchExpense" value={onSearchChange} onChange={(e) => setOnSearchChange(e.target.value)} type="text" placeholder="Search Expenses..." className="w-full h-full sm:text-lg px-0 py-0 text-sm bg-transparent text-white placeholder:text-muted-foreground border-none outline-none focus:outline-none focus:ring-0"/>

                    </div>
                    
                    <div className="flex items-center lg:w-2/8 sm:w-2/5 h-10 outline-1 outline-[#503c66] bg-[#432d5a] rounded-xl">
                        <DropdownBudgets onChangingBudgetCategory={getBudgetCategoryFromChild} onBudgetCategoryChangeRenderRemove={onBudgetCategoryChangeRenderRemove} />
                    </div>

                </div>

                {!expensesLoaded ? <SpinnerMain /> :<ExpensesList expenseList={filteredExpenses} onExpenseDeleted={() => fetchExpenses(user.primaryEmailAddress.emailAddress)} />}
                
        </div>
    )
}