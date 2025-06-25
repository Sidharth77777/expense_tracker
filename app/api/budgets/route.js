import { NextResponse } from 'next/server';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('email');

  const acceptHeader = request.headers.get('accept');
  if (acceptHeader && acceptHeader.includes('text/html')) {
    return NextResponse.redirect(new URL('/dashboard/budgets', request.url));
  }

  if (!userEmail) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, userEmail)).orderBy(desc(Budgets.createdAt));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'DB query failed', details: error.message },
      { status: 500 }
    );
  }
}
