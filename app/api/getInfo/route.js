import { db } from "@/utils/dbConfig";
import { Budgets, Expense } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    const acceptHeader = request.headers.get('accept');
        if (acceptHeader && acceptHeader.includes('text/html')) {
        return NextResponse.redirect(new URL('/dashboard/', request.url));
    }

    if (!userEmail) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try{
        const budgets = await db.select().from(Budgets).where(eq(Budgets.createdBy, userEmail)).orderBy(desc(Budgets.createdAt))
        
        const expenses = await db.select({
            id : Expense.id,
            name : Expense.name,
            expense : Expense.expense,
            budgetId : Expense.budgetId,
            createdAt : Expense.createdAt
        }).from(Expense).innerJoin(Budgets, eq(Expense.budgetId, Budgets.id)).where(eq(Budgets.createdBy, userEmail))

        const userInfo = budgets.map(budget => {
            const relatedExpenses = expenses.filter(exp => exp.budgetId === budget.id);
            return {
                ...budget,
                expenses: relatedExpenses
        }});

        return NextResponse.json(userInfo)

    } catch (error) {
        return NextResponse.json(
            { error: "Couldn't retreive data from database", details: error.message },
            { status: 500 }
        )
    }

    
}