"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import Spinner from "../../budgets/_components/spinner"
import { Plus, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function CreateExpense({onExpenseCreated}){
    const [open, setOpen] = useState(false)
    const [budgetIndicator, setBudgetIndicator] = useState("")
    const [creatingExpense, setCreatingExpense] = useState(false)
    const {user, isLoaded} = useUser()
    const [budgetCategories, setBudgetCategories] = useState([])
    
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [selectedBudgetInfo, setSelectedBudgetInfo] = useState([])

    const [selectedBudget, setSelectedBudget] = useState("Choose a Budget Category")

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            fetchBudgets(user.primaryEmailAddress.emailAddress);
        }
    },[isLoaded,user])

    const fetchBudgets = async (email) => {
        try {
            const res = await fetch(`/api/budgets?email=${email}`);
            const data = await res.json();
            
            const names = data.map((budget) => ({
                id: budget.id,
                name: budget.name,
                budget: budget.budget,
            }));
            console.log(data)
            console.log(names)
            setBudgetCategories(names)
            } catch (error) {
            console.error("Failed to fetch budgets:", error);
            toast("Failed to fetch budget categories")
        }
    };

    const createTheExpense = async(expenseName,expenseAmount,budgetId) => {
        setCreatingExpense(true)

        const res = await fetch('/api/createExpense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : expenseName,
            expense : expenseAmount,
            budgetId : budgetId,
        }),
        });

        const data = await res.json()
        setTimeout(() => {
            if(res.ok){
                toast("Expense Created Succesfully ✅")
                onExpenseCreated?.()
                setOpen(false)
            } else {
                if (data?.error?.includes("already exists")) {
                    toast("Expense category already exists ❗");
                } else {
                    toast("Error creating expense ❌");
                }}
            
                setCreatingExpense(false)
                setExpenseName('')
                setExpenseAmount('')
        },500);

    }
    
    return(
        <div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >            
                <div className="bg-[#9333ea] sm:text-xl rounded cursor-pointer px-3 py-2 hover:bg-blue-600 gap-2 flex justify-between items-center"> 
                    <Plus />
                    Add Expense
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create your New Expense</DialogTitle>

                <div>
                    <div className="mt-2">
                    <span>Expense Name</span>
                    <Input value={expenseName} placeholder="Ex: Electricity Bill" onChange={(e) => setExpenseName(e.target.value)} />
                    </div>

                    <div className="mt-2">
                        <span>
                        Expense Amount {'(in Rs)'}{" "}
                        <span className="text-red-500 font-bold">
                            {(parseFloat(expenseAmount) >= parseFloat(selectedBudgetInfo?.budget)) &&
                            selectedBudgetInfo?.budget &&
                            ` Budget only ₹${selectedBudgetInfo.budget} !`}
                        </span>
                        </span>
                        <Input value={expenseAmount} min={0} placeholder="Ex: 500" type="number" onChange={(e) => setExpenseAmount(e.target.value)} onKeyDown={(e) => {
                            const allowedKeys = [
                            "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete",
                            "Home", "End", "Enter", "Escape"
                            ];

                            const isNumberKey = e.key >= "0" && e.key <= "9";
                            const isDecimal = e.key === ".";

                            const input = e.currentTarget;

                            if (isDecimal && input.value.includes(".")) {
                            e.preventDefault();
                            }

                            if (!isNumberKey && !allowedKeys.includes(e.key) && !isDecimal) {
                            e.preventDefault();
                            }
                        }} />
                    </div>

                    <div className="mt-2">
                        <span>Budget Category</span>
                            <div className="w-full">
                            <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            variant="outline"
                            className="w-full h-10 bg-[#0f0f0f] text-white text-base flex items-center justify-between 
                                border-none outline-none focus:outline-none focus:ring-0 
                                active:outline-none active:ring-0 focus-visible:outline-none focus-visible:ring-0 
                                ring-0 shadow-none cursor-pointer rounded-2xl px-3"
                            >
                            {!selectedBudget ? selectedBudgetInfo.name : selectedBudget}
                            <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-full bg-[#0f0f0f] text-white text-base border-none rounded-2xl shadow-md">
                            <DropdownMenuLabel>
                            <Link
                                href="/dashboard/budgets"
                                className="text-blue-400 bg-black hover:text-blue-300 text-sm"
                            >
                                <span>Create New Budget</span> <Plus className="inline w-4 h-4 ml-1" />
                            </Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />

                            {budgetCategories.map((b) => (
                            <DropdownMenuItem
                                key={b.id}
                                onClick={() => {setSelectedBudget(""); setSelectedBudgetInfo(b)}}
                                className="cursor-pointer hover:bg-[#1f1f1f] bg-black text-base px-3 py-2 rounded"
                            >
                                {b.name}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                        </DropdownMenu>

                </div>
                    </div>
                </div>    
                </DialogHeader>

                 <DialogFooter className="sm:justify-start">
                   
                        <Button type="button" disabled={!expenseName || !expenseAmount || selectedBudget==="Choose a Budget Category"} variant="secondary" onClick={async() => await createTheExpense(expenseName,parseFloat(expenseAmount),selectedBudgetInfo.id)} className="cursor-pointer mt-5 w-full bg-purple-600 hover:bg-blue-600 h-10 rounded text-white sm:text-xl">
                            {creatingExpense ? <Spinner /> : "Add the Expense"}
                        </Button>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    )
}