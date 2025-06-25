"use client";

import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import EditTheBudget from "../_components/editTheBudget";
import DeleteThisBudget from "../_components/deleteTheBudget";
import AddExpense from "./_components/addExpense";
import { Calendar, IndianRupee, Target } from "lucide-react";
import ExpenseTable from "./_components/expenseTable";
import { motion } from "framer-motion";

export default function BudgetDetails({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const budgetId = params.id;

  const { isLoaded, user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isDeletedBudget, setIsDeletedBudget] = useState(false)
  const [budgetsLoaded, setBudgetsLoaded] = useState(false);
  const [reFetchTrigger, setReFetchTrigger] = useState(false);

  const [spent, setSpent] = useState(0) ; const [budget, setBudget] = useState(0) ; const [remaining, setRemaining] = useState(0) ; 
  const [progress, setProgress] = useState(0) ; const [warner, setWarner] = useState(0);

  const [budgetExpenseInfo, setBudgetExpenseInfo] = useState(null);
  const [expenseDetails, setExpenseDetails] = useState(null)

  useEffect(() => {
    if (isLoaded && user && budgetId) {
      fetchBudgetsExpensesInfo(
        params.id,
        user?.primaryEmailAddress?.emailAddress
      );
    }
  }, [isLoaded, user, budgetId, reFetchTrigger]);

  useEffect(() => {
    if (budgetsLoaded) {
      const timer = setTimeout(() => {
        setMounted(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [budgetsLoaded]);

  const calculateBudgetDetails = (data) => {
      const totalSpent = data?.expense?.reduce((sum, e) => sum + Number(e.expense), 0) || 0;
      const totalBudget = Number(data?.budget?.budget) || 0;
      const totalRemaining = (totalBudget - totalSpent).toFixed(2);
      const progressPercent = totalBudget > 0 ? Math.min(100, ((totalSpent / totalBudget) * 100).toFixed(1)) : 0;
      const warnerPercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    setSpent(totalSpent);
    setBudget(totalBudget);
    setRemaining(totalRemaining);
    setProgress(progressPercent);
    setWarner(warnerPercent);
  }

  const fetchBudgetsExpensesInfo = async (budgetId, userEmail) => {
    try {
      const res = await fetch(
        `/api/getBudgetById?budgetId=${budgetId}&userEmail=${userEmail}`
      );
      const data = await res.json();
       if (!data?.budget) {
      setIsDeletedBudget(true);
      return;
    }
      setBudgetExpenseInfo(data);
      setExpenseDetails(data.expense)
      calculateBudgetDetails(data);
      setBudgetsLoaded(true);
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  // const budgetCategoriesData = [
  //   {
  //     id: 1,
  //     name: "Food and Dining",
  //     color: "bg-purple-500",
  //     warner: 60,
  //     progress: 60,
  //     expense: 200,
  //     budget: 300,
  //     remaining: 100,
  //     icon: "😊",
  //   },
  // ];

  if (isDeletedBudget) {
  return (
    <motion.div initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }} className="text-center sm:text-5xl font-serif  mt-10">
      This budget no longer exists..
    </motion.div>
    );
  }
  return  (
    <motion.div initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }} className="w-full">
      <h1 className="capitalize sm:text-2xl mb-2 font-extrabold">{budgetExpenseInfo?.budget?.name}</h1>

<div className={`w-full mb-3 bg-gradient-to-r from-[#160c27] via-[#240d39] to-[#230d38] rounded-xl sm:px-6 sm:py-3 p-2 outline-2 ${
  progress < 90
    ? "outline-purple-800 xl:hover:shadow-[0_0_20px_4px_rgba(147,51,234,0.4)]"
    : "outline-red-800 xl:hover:shadow-[0_0_20px_4px_rgba(239,68,68,0.4)]"
} transition-shadow duration-300 ease-in-out`}>

  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-full flex justify-center items-center h-6 w-6">{budgetExpenseInfo?.budget?.icon}</div>
        <h2 className="text-base sm:text-lg">{budgetExpenseInfo?.budget?.name}</h2>
        <div className={`px-3 py-1 rounded-2xl ${
          progress <= 60
            ? "bg-green-300"
            : progress <= 90
            ? "bg-orange-500"
            : "bg-red-500"
        }`}>
          <span className="text-black">
            {warner <= 60
              ? "On Track"
              : warner <= 90
              ? "Warning"
              : warner < 100
              ? "Alert"
              : warner == 100
              ? "Full"
              : "Exceeded ! Increase the budget"}
          </span>
        </div>
      </div>

      <div className="flex flex-row sm:flex-row justify-between items-center gap-4 sm:gap-6 w-full">
        <div className="flex items-center mt-2 mb-2 gap-2">
          <Target className="sm:w-10 sm:h-10 text-[#446daa]" />
          <div>
            <span className="opacity-80 text-[12px] sm:text-xl">Allocated</span>
            <h1 className="text-[#446daa] text-[12px] sm:text-xl">₹{Number(budget) % 1 === 0 ? Number(budget) : Number(budget).toFixed(2)}</h1>
          </div>
        </div>
        <div className="flex items-center mt-2 mb-2 gap-2">
          <IndianRupee className="sm:w-10 sm:h-10 text-[#d8b4fe]" />
          <div>
            <span className="opacity-80 text-[12px] sm:text-xl">Spent</span>
            <h1 className="text-[#d8b4fe] text-[12px] sm:text-xl">₹{Number(spent) % 1 === 0 ? Number(spent) : Number(spent).toFixed(2)}</h1>
          </div>
        </div>
        <div className="flex items-center mt-2 mb-2 gap-2">
          <Calendar className="sm:w-10 sm:h-10 text-[#4ade80]" />
          <div>
            <span className="opacity-80 text-[12px] lg:text-xl">Remaining</span>
            <h1 className="text-[#4ade80] text-[12px] sm:text-xl">₹{Number(remaining) % 1 === 0 ? Number(remaining) : Number(remaining).toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center mb-5 gap-5">
      <EditTheBudget
        onBudgetEdited={() =>
          fetchBudgetsExpensesInfo(budgetId,user.primaryEmailAddress.emailAddress)
        }
        id={budgetExpenseInfo?.budget?.id}
        name={budgetExpenseInfo?.budget?.name}
        budget={budgetExpenseInfo?.budget.budget}
        emoji={budgetExpenseInfo?.budget?.icon}
        createdBy={budgetExpenseInfo?.budget?.createdBy}
      />
      <DeleteThisBudget
        onBudgetDeleted={() =>
          fetchBudgetsExpensesInfo(budgetId,user.primaryEmailAddress.emailAddress)
        }
        name={budgetExpenseInfo?.budget?.name}
        createdBy={budgetExpenseInfo?.budget?.createdBy}
      />
    </div>
  </div>

  <div className="mt-2">
    <span className={`opacity-90 ${warner > 100 ? "text-red-500" : ""}`}>
      {progress}% {warner > 100 ? "‼️" : ""}
    </span>
  </div>

  <div className="w-full mt-2 h-4 bg-gray-700 rounded-full overflow-hidden mb-6">
    <div
      className={`${
        warner > 100
          ? "bg-red-600"
          : warner > 60
          ? "bg-orange-500"
          : warner > 40
          ? "bg-yellow-500"
          : warner > 0
          ? "bg-green-500"
          : "bg-purple-600"
      } h-full rounded-full transition-all duration-500 delay-150 ease-out`}
      style={{ width: mounted ? `${progress}%` : `0%` }}
    ></div>
  </div>
</div>

      <div>
        <AddExpense budgetId={budgetId} reFetchTrigger={() => setReFetchTrigger(!reFetchTrigger)} />
      </div>

      <div>
        <ExpenseTable expenseDetails={expenseDetails} budgetName={budgetExpenseInfo?.budget?.name} user={user?.primaryEmailAddress?.emailAddress} reFetchTrigger={() => setReFetchTrigger(!reFetchTrigger)} />
      </div>
      
    </motion.div>
  );
}
