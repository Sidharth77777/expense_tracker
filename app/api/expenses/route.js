import { NextResponse } from "next/server";
import { Expense, Budgets } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { db } from '@/utils/dbConfig';

export async function GET(request) {
  const { searchParams } = new URL(request.url); 
  const userEmail = searchParams.get('email');

  const acceptHeader = request.headers.get('accept');
  if (acceptHeader && acceptHeader.includes('text/html')) {
    return NextResponse.redirect(new URL('/dashboard/expenses', request.url));
  }

  if (!userEmail) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await db
      .select({
        id: Expense.id,
        name: Expense.name,
        expense: Expense.expense,
        budgetName: Budgets.name,
        budgetId : Expense.budgetId,
        createdAt: Expense.createdAt,
      })
      .from(Expense)
      .innerJoin(Budgets, eq(Expense.budgetId, Budgets.id))
      .where(eq(Budgets.createdBy, userEmail))
      .orderBy(desc(Expense.createdAt));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'DB query failed', details: error.message },
      { status: 500 }
    );
  }
}
