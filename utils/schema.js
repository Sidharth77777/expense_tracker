import { pgTable, serial, varchar,timestamp, integer,numeric } from "drizzle-orm/pg-core";

export const Budgets=pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    budget:numeric('budget').notNull(),
    icon:varchar('icon').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const Expense=pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    expense:numeric('expense').notNull().default(0),
    budgetId:integer('budgetId').references(()=>Budgets.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})