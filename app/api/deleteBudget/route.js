import { db } from "@/utils/dbConfig"
import { Budgets, Expense } from "@/utils/schema"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function DELETE(request) {

    const acceptHeader = request.headers.get('accept')
    if (acceptHeader && acceptHeader.includes('text/html')) {
        return NextResponse.redirect(new URL('/dashboard/budgets', request.url))
    } 
    try{
        const body = await request.json()
        const {name,createdBy} = body

        if (!name || !createdBy){
            return NextResponse.json(
                {error : "Fields 'name' and 'createdBy' are required!" },
                {status : 400}
            )
        }

        const budget = await db.select().from(Budgets).where(and(eq(Budgets.name, name), eq(Budgets.createdBy, createdBy)))
        if (!budget.length) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 });
        }

        const budgetId = budget[0].id;

        const deletedExpenses = await db.delete(Expense).
            where(eq(Expense.budgetId, budgetId))

        const deletedBudget = await db.delete(Budgets).
            where(and(eq(Budgets.name,name),eq(Budgets.createdBy,createdBy)))

        return NextResponse.json(
            {message : "Budget Deleted Successfully ✅",deletedBudget, deletedExpenses},
            {status : 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error : 'Delete Failed ❌',details: error.message},
            {status : 500}
        )
    }
}