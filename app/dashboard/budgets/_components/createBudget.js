"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import Spinner from "./spinner"

export default function CreateBudget({onBudgetCreated,refreshAll}) {

    const {user} = useUser()
    const [creatingBudget, setCreatingBudget] = useState(false)

    const [open, setOpen] = useState(false)

    const [emoji, setEmoji] = useState('😊')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState('')

    const createTheBudget = async() => {
        setCreatingBudget(true)

        const res = await fetch('/api/addBudget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : budgetName,
            budget: parseFloat(budgetAmount),
            icon: emoji,
            createdBy: user?.emailAddresses[0]?.emailAddress, // Clerk email
        }),
        });

        const data = await res.json();
        setTimeout(() => {
            if (res.ok) {
                toast("Budget Created Successfully ✅");
                onBudgetCreated?.();
                refreshAll?.()
                setOpen(false)
            } else {
                if (data?.error?.includes("already exists")) {
                    setBudgetName('')
                    toast("Budget category already exists ❗");
                } else {
                toast("Error creating budget ❌");
                }
            }
            setCreatingBudget(false);
            setBudgetName('')
            setBudgetAmount('')
        }, 500);
    }

    return(
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="cursor-pointer"><h3 className="text-base lg:text-lg">Add Budget</h3></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create your New Budget !</DialogTitle>

                    <div className="mt-4">
                        <div className="flex items-center gap-2">
                            <span>Choose Avatar</span>
                        <div onClick={() => setOpenEmojiPicker(!openEmojiPicker)} className="w-10 h-10 dark:bg-black flex justify-center items-center p-5 cursor-pointer rounded-xl outline-2 outline-purple-500">{emoji}</div>
                        
                        </div>

                        {openEmojiPicker && <div className="absolute z-50"><EmojiPicker onEmojiClick={(e) => {setEmoji(e.emoji), setOpenEmojiPicker(false)}} /></div>}

                        <div className="mt-2">
                            <span>Budget Category</span>
                            <Input value={budgetName} onChange={(e) => setBudgetName(e.target.value) } placeholder="Ex: Shopping" />
                        </div>
                        <div className="mt-2">
                            <span>Budget Amount {"(in Rs)"}</span>
                            <Input value={budgetAmount} onChange={(e) => {const value = e.target.value ; setBudgetAmount(value)}} placeholder="Ex: 600" type="number" min={0} onKeyDown={(e) => {
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
                    </div>
                    
                </DialogHeader>

                 <DialogFooter className="sm:justify-start">
                    
                        <Button type="button" variant="secondary" onClick={async() =>  await createTheBudget()} disabled={!(budgetAmount && budgetName)} className="cursor-pointer mt-5 w-full bg-purple-600 hover:bg-blue-600 h-10 rounded text-white sm:text-xl">
                            {creatingBudget ? <Spinner /> : "Create the Budget"}
                        </Button>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
            
        </div>
    )
}