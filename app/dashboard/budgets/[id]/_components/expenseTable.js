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

export default function ExpenseTable({expenseDetails, reFetchTrigger, user, budgetName}) {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  if (!expenseDetails) {
  return <div className="text-white mt-5">Loading expenses...</div>
}

  const totalPages = Math.ceil(expenseDetails.length / itemsPerPage)

  const paginatedExpenses = expenseDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalAmount = expenseDetails.reduce((sum, e) => sum + Number(e.expense), 0).toFixed(2)

  return (
    <div className="mt-5 bg-gradient-to-r rounded-xl from-[#160c27] via-[#240d39] to-[#230d38] px-6 py-3">
      <h1 className="text-base sm:text-2xl">Expenses</h1>
      <h2 className="text-base sm:text-lg">All expenses for {"Food and Dining"}</h2>

      <div className="mt-3">
        <Table>
          <TableCaption>A list of your recent expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Expense Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExpenses.map((expense, idx) => (
              <TableRow key={idx} className="border-b border-slate-300">
                <TableCell className="py-4 text-lg">{new Date(expense.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}</TableCell>
                <TableCell className="py-4 text-lg">{expense.name}</TableCell>
                <TableCell className="py-4 text-lg text-right">{expense.expense}</TableCell>
                <TableCell className="py-4 text-lg text-right">
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
              <TableCell className="text-lg" colSpan={2}>Total</TableCell>
              <TableCell className="text-lg text-right">₹ {totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Pagination Controls */}
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
