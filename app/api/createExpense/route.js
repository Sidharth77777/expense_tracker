import { db } from "@/utils/dbConfig";
import { Expense } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request){

    const acceptHeader = request.headers.get('accept');
    if (acceptHeader && acceptHeader.includes('text/html')) {
        return NextResponse.redirect(new URL('/dashboard/expenses', request.url));
    }

    try{

        const body = await request.json();
        const {name,expense,budgetId} = body;

        if(!name || !expense || !budgetId){
            return NextResponse.json(
                { error: 'Fields "name", "expense", and "budgetId" are required.' },
                { status: 400 }
            )
        }

        const existingExpense = await db.select().
            from(Expense).
            where(and(eq(Expense.name,name),eq(Expense.budgetId,budgetId)));

        if (existingExpense.length > 0){
            return NextResponse.json(
                { error: 'Expense already exists in the same budget category ⚠️' },
                { status: 409 }
            )
        }

        const result = await db.insert(Expense).values({
            name,
            expense,
            budgetId,
            createdAt : new Date,
        })

        return NextResponse.json(
            { message: 'Expense created successfully ✅', result },
            { status: 201 }
        );
        

    } catch(error){
        return NextResponse.json(
            { error: 'Insert failed', details: error.message },
            { status: 500 }
        );
    }
}