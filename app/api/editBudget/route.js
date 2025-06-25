import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const acceptHeader = request.headers.get("accept");
  if (acceptHeader && acceptHeader.includes("text/html")) {
    return NextResponse.redirect(new URL("/dashboard/budgets", request.url));
  }

  try {
    const body = await request.json();
    const { createdBy, oldName, oldAmount , oldEmoji ,emoji, budgetName, budgetAmount } = body;

    if (!createdBy || !emoji || !budgetName || !budgetAmount || !oldName) {
      return NextResponse.json(
        { error: 'All fields are required: createdBy, oldName, emoji, budgetName, budgetAmount' },
        { status: 400 }
      );
    }

    if (oldName==budgetName && emoji==oldEmoji && budgetAmount==oldAmount){
        return NextResponse.json(
        { message: "No changes were made." },
        { status: 200 }
      );
    }

    const existingBudget = await db
      .select()
      .from(Budgets)
      .where(and(eq(Budgets.name, oldName), eq(Budgets.createdBy, createdBy)))

    if (existingBudget.length === 0) {
      return NextResponse.json(
        { error: "Original budget not found." },
        { status: 404 }
      );
    }

    const result = await db
      .update(Budgets)
      .set({
        name: budgetName,
        budget: parseFloat(budgetAmount),
        icon: emoji,
        updatedAt: new Date()
      })
      .where(and(eq(Budgets.name, oldName), eq(Budgets.createdBy, createdBy)))

    return NextResponse.json(
      { message: "Budget updated successfully ✅", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update budget", details: error.message },
      { status: 500 }
    );
  }
}
