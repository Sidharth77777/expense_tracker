"use client"

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function DeleteTheExpense({reFetchTrigger,expenseName, onExpenseDeleted,budgetName,createdBy}){
    

    const deleteThisExpense = async() => {
        const res = await fetch(`/api/deleteExpense`,{
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({name : expenseName, budgetName:budgetName, createdBy:createdBy})
        })
        
        const data = await res.json()

        if(res.ok){
            toast("Expense Deleted Successfully ✅")
            onExpenseDeleted?.()
            reFetchTrigger?.()
        } else {
            console.error("Error:", data.error);
            toast(data?.error || "Something went wrong while deleting ❌");
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div title="Delete this expense">
                <Trash2 className="opacity-70 cursor-pointer hover:opacity-100 text-red-700" />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently{" "}
                    <span className="text-red-600">
                    delete this expense{" "}
                    </span>
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => deleteThisExpense()}
                    className="bg-red-500 hover:bg-red-700 cursor-pointer text-white"
                >
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
    )
}