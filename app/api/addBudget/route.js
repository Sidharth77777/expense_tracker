import { NextResponse } from 'next/server';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request) {
  // If accessed directly from browser, redirect
  const acceptHeader = request.headers.get('accept');
  if (acceptHeader && acceptHeader.includes('text/html')) {
    return NextResponse.redirect(new URL('/dashboard/budgets', request.url));
  }

  try {
    const body = await request.json();
    const { name, budget, createdBy, icon } = body;

    // Basic validation
    if (!name || !budget || !createdBy) {
      return NextResponse.json(
        { error: 'Fields "name", "amount", and "createdBy" are required.' },
        { status: 400 }
      );
    }

    // ✅ Check for duplicate category under same user
    const existingBudget = await db
      .select()
      .from(Budgets)
      .where(and(eq(Budgets.name, name), eq(Budgets.createdBy, createdBy)));

    if (existingBudget.length > 0) {
      return NextResponse.json(
        { error: 'Budget category already exists ⚠️' },
        { status: 409 }
      );
    }

    // ✅ Insert into Budgets table
    const result = await db.insert(Budgets).values({
      name,
      budget,
      createdBy,
      icon: icon,
    });

    return NextResponse.json(
      { message: 'Budget created successfully ✅', result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Insert failed', details: error.message },
      { status: 500 }
    );
  }
}
