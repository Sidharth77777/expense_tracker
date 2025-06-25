"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddExpense({budgetId,reFetchTrigger}){

    const [openCard, setOpenCard] = useState(false)

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const createTheExpense = async(expenseName, expenseAmount) => {
        try{
            const res = await fetch('/api/createExpense',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name : expenseName,
                    expense : expenseAmount,
                    budgetId : budgetId,
                })

            })

            const data = await res.json()

            if (!res.ok) {
                if(data.error=='Expense already exists in the same budget category ⚠️'){
                    toast.error('Expense name already exists in this category ⚠️');
                } else{
                    toast.error('Failed to create expense ❌..');
                    setTimeout(() => {
                        toast.error('Check your internet connection')
                    },2000)
                }
                
            } else{
                reFetchTrigger?.()
                toast("Expense Created Succesfully ✅")
            }
            setAmount(''); setName('')
        } catch (error){
            console.error("Expense creation failed:", error)
            toast.error('Error creating expense ❌')
        }
    }

    return (
        <div className="bg-gradient-to-r rounded-xl from-[#160c27] via-[#240d39] to-[#230d38] px-6 py-3">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-base sm:text-2xl">Add a New Expense</h1>
                    <h2 className="lg:text-lg text-sm">Add a new expense to {"Food and Dining"}</h2>
                </div>
                <div>

                    <div onClick={() => setOpenCard(!openCard)} className="bg-purple-500 hover:bg-blue-500 flex items-center cursor-pointer rounded py-2 px-10">
                        {openCard ? <X className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                        <h2 className="text-base sm:text-xl ml-2">{openCard ? "Cancel" : "Add"}</h2>
                    </div>

                </div>
            </div>

            <AnimatePresence>
            {openCard && 
            <motion.div className="mt-3 w-full" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <div className="flex w-full gap-10 items-center">
                    <div className="w-1/2">
                        <Label className="mb-2 opacity-80 sm:text-md" htmlFor="Name">Expense Name</Label>
                        <Input className="w-full" value={name} onChange={(e) => setName(e.target.value)} id="Name" placeholder="Ex: Electricity Bill" />
                    </div>

                    <div className="w-1/2">
                        <Label className="mb-2 opacity-80 sm:text-md" htmlFor="Amount">Amount</Label>
                        <Input className="w-full" id="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} onKeyDown={(e) => {
                            const allowedKeys = [
                            "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete",
                            "Home", "End", "Enter", "Escape"
                            ];
                            const isNumberKey = e.key >= "0" && e.key <= "9";
                            const isDecimal = e.key === ".";
                            const input = e.currentTarget;
                            if (isDecimal && input.value.includes(".")) {e.preventDefault();}
                            if (!isNumberKey && !allowedKeys.includes(e.key) && !isDecimal) {e.preventDefault();}
                        }} min={0} placeholder="Ex: 600" />
                    </div>

                    
                    
                </div>
                <Button disabled={!name || !amount} onClick={async() => await createTheExpense(name,parseFloat(amount))} className="mt-3 cursor-pointer bg-green-500 hover:bg-purple-500 text-white sm:text-lg">Save Expense</Button>
            </motion.div>
            }
            </AnimatePresence>


        </div>
    )
}