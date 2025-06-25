import { db } from "@/utils/dbConfig"
import { Budgets, Expense } from "@/utils/schema"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function DELETE(request){
    const acceptHeader = request.headers.get('accept')
    if (acceptHeader && acceptHeader.includes('text/html')) {
        return NextResponse.redirect(new URL('/dashboard/expenses', request.url))
    } 

    try{
        const body = await request.json()
        const {name, budgetName, createdBy} = body

        if (!name || !budgetName || !createdBy){
            return NextResponse.json(
                {error : "Fields 'name' and 'budgetName' and 'createdBy' are required!" },
                {status : 400}
            )
        }

        const budgetInfo = await db.select().from(Budgets).where(and(eq(Budgets.name, budgetName),eq(Budgets.createdBy, createdBy)))
        if (!budgetInfo.length) {
            return NextResponse.json({ error: "Budget not found!" }, { status: 404 })
        }

        const budgetId = budgetInfo[0].id

        const deletedExpense = await db.delete(Expense).where(and(eq(Expense.name, name), eq(Expense.budgetId, budgetId)))

        return NextResponse.json(
            { message: "Expense Deleted Successfully ✅", deletedExpense },
            { status: 200 }
        )

    } catch (error){
        return NextResponse.json(
            {error : 'Delete Failed ❌',details: error.message},
            {status : 500}
        )
    }
}









// import { db } from "@/utils/dbConfig"
// import { Expense, Budgets } from "@/utils/schema"
// import { eq } from "drizzle-orm"
// import { NextResponse } from "next/server"

// export async function DELETE(request){


//     const acceptHeader = request.headers.get('accept')
//     if (acceptHeader && acceptHeader.includes('text/html')) {
//         return NextResponse.redirect(new URL('/dashboard/expenses', request.url))
//     } 

//     try{    
//         const body = await request.json()
//         const {name} = body

//         if (!name) {
//             return NextResponse.json(
//                 {error : "Fields Expense 'name' is required!" },
//                 {status : 400}
//             )
//         }

//         const data = await db.delete(Expense).where(eq(Expense.name, name))

//         return NextResponse.json(
//             {message : "Budget Deleted Successfully ✅",data},
//             {status : 200}
//         )


//     } catch (error){
//         return NextResponse.json(
//             {error : 'Delete Failed ❌',details: error.message},
//             {status : 500}
//         )
//     }
    
// }