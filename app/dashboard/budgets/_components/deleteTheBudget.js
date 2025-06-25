"use client";

import { Trash2, Undo2 } from "lucide-react";
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
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

function ToastCountdown({ onUndo }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="flex items-center gap-2 bg-[#18181b] text-white px-20  py-3 rounded-xl">
      <span>{count}s... </span>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={onUndo}
      >
        Undo <Undo2 />
      </Button>
    </div>
  );
}

export default function DeleteThisBudget({ name, createdBy, onBudgetDeleted,refreshAll }) {
  const undoDeleteRef = useRef(false);

  const deleteTheBudget = async () => {
    undoDeleteRef.current = false;

    const toastId = toast.custom((t) => (
      <ToastCountdown
        onUndo={() => {
          undoDeleteRef.current = true;
          toast.dismiss(t.id);
          toast("Deletion cancelled 🚫");
        }}
      />
    ));

    setTimeout(async () => {
      if (!undoDeleteRef.current) {
        const res = await fetch("/api/deleteBudget", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, createdBy }),
        });

        const data = await res.json();

        if (res.ok) {
          toast("Deleted Budget Successfully ✅");
          onBudgetDeleted?.();
          refreshAll?.()
        } else {
          console.error("Error:", data.error);
          toast(data?.error || "Something went wrong while deleting ❌");
        }
      }
    }, 5000);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div title="Delete this budget">
          <Trash2 className="opacity-70 cursor-pointer hover:opacity-100 text-red-700" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently{" "}
            <span className="text-red-600">
              delete this budget category and the expenses under it{" "}
            </span>
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteTheBudget}
            className="bg-red-500 hover:bg-red-700 cursor-pointer text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
