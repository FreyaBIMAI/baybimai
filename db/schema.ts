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

export const newsPublications = sqliteTable("news_publications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  language: text("language").notNull(),
  issueDate: text("issue_date").notNull(),
  headline: text("headline").notNull(),
  summary: text("summary").notNull(),
  signals: text("signals").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const newsFeedback = sqliteTable("news_feedback", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  language: text("language").notNull(),
  issueDate: text("issue_date").notNull(),
  signal: text("signal").notNull(),
  note: text("note"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
