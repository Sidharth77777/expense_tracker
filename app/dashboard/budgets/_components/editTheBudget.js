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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EmojiPicker from "emoji-picker-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Edit } from "lucide-react"

export default function EditTheBudget({ id, name, budget, emoji: initialEmoji, createdBy ,onBudgetEdited,refreshAll}) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

  const [emoji, setEmoji] = useState(initialEmoji)
  const [budgetName, setBudgetName] = useState(name)
  const [budgetAmount, setBudgetAmount] = useState(budget)

  useEffect(() => {
    setEmoji(initialEmoji);
    setBudgetName(name);
    setBudgetAmount(budget);
  }, [initialEmoji, name, budget]);

  const editTheBudget = async () => {
    const res = await fetch('/api/editBudget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        createdBy,
        oldName: name, // original name for matching
        oldAmount: budget,
        oldEmoji: initialEmoji,
        emoji,
        budgetName,
        budgetAmount
      })
    });

    const data = await res.json();

    if (res.ok) {
        if (data.message === "No changes were made.") {
        toast("No changes were made !");
    } else {
      toast("Budget Edited Successfully ✅");
      refreshAll?.()
      onBudgetEdited?.()
    }
    } else {
      toast(data?.error || "Failed to update budget ❌");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          <div title="Edit this Budget">
            <Edit className="opacity-70 cursor-pointer hover:opacity-100 text-blue-700" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your Current Budget!</DialogTitle>
            <div className="mt-4">
              <div
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="w-5 h-5 dark:bg-white flex justify-center items-center p-5 cursor-pointer rounded-xl outline-2 outline-purple-500"
              >
                {emoji}
              </div>

              {openEmojiPicker && (
                <div className="absolute z-50">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <div className="mt-2">
                <span className="text-sm opacity-80">Budget Category</span>
                <Input
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  placeholder="Ex: Shopping"
                />
              </div>
              <div className="mt-5">
                <span className="text-sm opacity-80">Budget Amount (in Rs)</span>
                <Input
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  placeholder="Ex: 600"
                  type="number"
                />
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={editTheBudget}
                disabled={!(budgetAmount && budgetName)}
                className="cursor-pointer mt-5 w-full bg-purple-600 hover:bg-blue-600 h-10 rounded text-white sm:text-xl"
              >
                Edit the Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
