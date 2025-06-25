"use client";

import { useRef, useState } from "react";
import { Calendar } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUser } from "@clerk/nextjs";
import DeleteTheExpense from "./deleteTheExpense";

export default function ExpensesList({ expenseList, onExpenseDeleted }) {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(expenseList.length / itemsPerPage);
  const windowSize = 3;
  const [visibleStart, setVisibleStart] = useState(1);
  const visibleEnd = Math.min(visibleStart + windowSize - 1, totalPages);
  const listRef = useRef(null);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    if (page < visibleStart || page > visibleEnd) {
      const newStart = Math.floor((page - 1) / windowSize) * windowSize + 1;
      setVisibleStart(newStart);
    }
    scrollToTop();
  };

  const paginatedExpenses = expenseList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-5" ref={listRef}>
      {paginatedExpenses.length === 0 ? (
        <div className="flex justify-center items-center mb-5">
          <h1 className="sm:text-xl text-sm text-center px-4">
            📉 Nothing spent so far. Great start!
          </h1>
        </div>
      ) : (
        paginatedExpenses.map((e) => (
          <div
            key={e.id}
            className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 bg-[#240d39] rounded-xl p-4 sm:p-6"
          >
            <div className="w-full sm:w-auto">
              <div className="flex flex-wrap items-center mb-2 gap-2">
                <h2 className="text-base sm:text-lg font-medium">{e.name}</h2>
                <div className="px-3 py-0.5 rounded-3xl bg-purple-500 text-xs sm:text-sm flex justify-center items-center">
                  {e.budgetName}
                </div>
              </div>
              <div className="opacity-80 flex items-center gap-2 text-sm sm:text-base">
                <Calendar className="h-4 w-4" />
                <span>{e.createdDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5 sm:gap-8">
              <h1 className="font-bold text-sm sm:text-lg whitespace-nowrap">₹ {e.expense}</h1>
              <DeleteTheExpense
                budgetName={e.budgetName}
                createdBy={user?.primaryEmailAddress?.emailAddress}
                expenseName={e.name}
                onExpenseDeleted={onExpenseDeleted}
              />
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <Pagination className="mt-4 flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) goToPage(currentPage - 1);
              }}
            />
          </PaginationItem>

          {visibleStart > 1 && (
            <PaginationItem>
              <button
                className="cursor-pointer hover:bg-[#271b36] p-2 rounded-lg text-white"
                onClick={() => setVisibleStart(visibleStart - windowSize)}
              >
                ...
              </button>
            </PaginationItem>
          )}

          {[...Array(visibleEnd - visibleStart + 1)].map((_, i) => {
            const page = visibleStart + i;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {visibleEnd < totalPages && (
            <PaginationItem>
              <button
                className="cursor-pointer hover:bg-[#271b36] p-2 rounded-lg text-white"
                onClick={() => setVisibleStart(visibleStart + windowSize)}
              >
                ...
              </button>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) goToPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
