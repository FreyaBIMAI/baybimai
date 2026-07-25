import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  stripeSessionId: text("stripe_session_id").notNull().unique(),
  customerEmail: text("customer_email"),
  productId: text("product_id").notNull(),
  priceId: text("price_id").notNull(),
  amountTotal: integer("amount_total").notNull(),
  currency: text("currency").notNull(),
  paymentStatus: text("payment_status").notNull(),
  fulfilledAt: text("fulfilled_at").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
