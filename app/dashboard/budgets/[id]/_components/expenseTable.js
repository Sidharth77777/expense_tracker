"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DeleteTheExpense from "@/app/dashboard/expenses/_components/deleteTheExpense"

export default function ExpenseTable({ expenseDetails, reFetchTrigger, user, budgetName }) {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (expenseDetails) {
      setTimeout(() => setIsLoading(false), 800) // optional delay
    }
  }, [expenseDetails])

  const totalPages = Math.ceil(expenseDetails?.length / itemsPerPage || 1)

  const paginatedExpenses = expenseDetails?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || []

  const totalAmount = expenseDetails?.reduce((sum, e) => sum + Number(e.expense), 0).toFixed(2)

  return (
    <div className="mt-5 bg-gradient-to-r rounded-xl from-[#160c27] via-[#240d39] to-[#230d38] px-4 sm:px-6 py-4">
      <h1 className="text-base sm:text-2xl">Expenses</h1>
      <h2 className="text-base sm:text-lg mb-3">All expenses for {budgetName}</h2>

      {/* Table for Desktop */}
      <div className="hidden sm:block">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-[#3f2a58] rounded w-1/3 mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-700 py-3">
                <div className="h-4 w-24 bg-[#3f2a58] rounded"></div>
                <div className="h-4 w-32 bg-[#3f2a58] rounded"></div>
                <div className="h-4 w-16 bg-[#3f2a58] rounded text-right"></div>
                <div className="h-4 w-8 bg-[#3f2a58] rounded text-right"></div>
              </div>
            ))}
            <div className="mt-3 h-4 w-24 bg-[#3f2a58] rounded"></div>
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your recent expenses.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Expense Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedExpenses.map((expense, idx) => (
                <TableRow key={idx} className="border-b border-slate-300">
                  <TableCell className="py-4 text-base">
                    {new Date(expense.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-4 text-base">{expense.name}</TableCell>
                  <TableCell className="py-4 text-base text-right">₹ {expense.expense}</TableCell>
                  <TableCell className="py-4 text-base text-right">
                    <DeleteTheExpense
                      budgetName={budgetName}
                      createdBy={user}
                      expenseName={expense.name}
                      reFetchTrigger={reFetchTrigger}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-base font-semibold" colSpan={2}>Total</TableCell>
                <TableCell className="text-base font-semibold text-right" colSpan={2}>₹ {totalAmount}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="border border-slate-700 rounded-lg px-4 py-3 bg-[#1f1b2e] animate-pulse">
              <div className="h-3 w-1/3 bg-[#3f2a58] rounded mb-2"></div>
              <div className="h-3 w-2/3 bg-[#3f2a58] rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-[#3f2a58] rounded mb-2"></div>
              <div className="h-4 w-10 bg-[#3f2a58] rounded ml-auto mt-2"></div>
            </div>
          ))
        ) : (
          <>
            {paginatedExpenses.map((expense, idx) => (
              <div
                key={idx}
                className="border border-slate-700 rounded-lg px-4 py-3 bg-[#1f1b2e]"
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-400">Date</span>
                  <span className="text-sm">{new Date(expense.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-400">Name</span>
                  <span className="text-sm">{expense.name}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-400">Amount</span>
                  <span className="text-sm">₹ {expense.expense}</span>
                </div>
                <div className="flex justify-end">
                  <DeleteTheExpense
                    budgetName={budgetName}
                    createdBy={user}
                    expenseName={expense.name}
                    reFetchTrigger={reFetchTrigger}
                  />
                </div>
              </div>
            ))}

            <div className="text-right mt-2 text-sm text-gray-300">
              <span className="font-semibold">Total: </span>₹ {totalAmount}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          <PaginationItem>
            <span className="text-sm text-white">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
