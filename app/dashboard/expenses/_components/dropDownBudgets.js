"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, MoveRight, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownBudgets({onChangingBudgetCategory, onBudgetCategoryChangeRenderRemove}) {
  const { user, isLoaded } = useUser();

  const [selectedBudget, setSelectedBudget] = useState("Budget Category")
  const [budgetCategories, setBudgetCategories] = useState([])

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      fetchBudgets(user.primaryEmailAddress.emailAddress);
    }
  },[user,isLoaded])

  useEffect(() => {
    if (onBudgetCategoryChangeRenderRemove) {
      setSelectedBudget("Budget Category")
    }
  }, [onBudgetCategoryChangeRenderRemove])


  const fetchBudgets = async (email) => {
    try {
      const res = await fetch(`/api/budgets?email=${email}`);
      const data = await res.json();
      
      const names = data.map((budget) => ({
        id: budget.id,
        name: budget.name,
        budget: budget.budget,
      }));

      setBudgetCategories(names)
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
      toast("Failed to fetch budgets ")
    }
  };


  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-full flex items-center justify-between placeholder:text-muted-foreground 
              border-none outline-none focus:outline-none focus:ring-0 
              active:outline-none active:ring-0 focus-visible:outline-none focus-visible:ring-0 
              ring-0 shadow-none xl:text-xl cursor-pointer rounded-2xl"
          >
            {selectedBudget}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <Link
              href="/dashboard/budgets"
              className="text-blue-500 hover:text-blue-300"
            >
              <span className="sm:text-md">Create New Budget</span> <Plus className="inline w-5 h-5" />
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {budgetCategories.map((b) => (
            <DropdownMenuItem key={b.id} onClick={() => {setSelectedBudget(b.name) ;  onChangingBudgetCategory(b.name) }} className={'cursor-pointer'}>
              {b.name}
          </DropdownMenuItem>
          ))}



        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
