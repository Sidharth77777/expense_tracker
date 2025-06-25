import { db } from "@/utils/dbConfig";
import { Budgets, Expense } from "@/utils/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request){
    const { searchParams } = new URL(request.url)
    const budgetId = searchParams.get('budgetId')
    const userEmail = searchParams.get('userEmail')

    const acceptHeader = request.headers.get('accept');
    if (acceptHeader && acceptHeader.includes('text/html')) {
        return NextResponse.redirect(new URL('/dashboard/budgets', request.url));
    }

    if (!budgetId || !userEmail) {
        return NextResponse.json({error: 'budgetId and userEmail is required'} , {status: 400})
    }

    try{

        const BudgetInfo = await db.select().from(Budgets).where(and(eq(Budgets.id, budgetId), eq(Budgets.createdBy, userEmail)))
        if (!BudgetInfo || BudgetInfo.length === 0) {
            return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
        }

        const ExpenseInfo = await db.select().from(Expense).where(eq(Expense.budgetId, budgetId)).orderBy(desc(Expense.createdAt))

        return NextResponse.json({budget:BudgetInfo[0], expense:ExpenseInfo})

    } catch (error) {
        return NextResponse.json(
            {error : 'Failed fetching', details : error.message},
            {status : 500}
        )
    }
}