import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password_hash").notNull(),
  role: text("role").default("enthusiast"),
  authToken: text("auth_token"),
  mobile: text("mobile").unique(),
  otp: text("otp"),
<<<<<<< HEAD
  otpExpiresAt: text("otp_expires_at"),
=======
  otpExpiresAt: text("otp_expires_at"), // Using text for simplicity as seen in some other fields, or timestamp if preferred
>>>>>>> 292f116bd585d7d43c1f56fd6a6864bb800a926d
});

export const monuments = pgTable("monuments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  builtYear: text("built_year").notNull(),
  dynasty: text("dynasty").notNull(),
  style: text("style").notNull(),
  unesco: boolean("unesco").default(false),
  image: text("image"),
  description: text("description").notNull(),
  timeline: jsonb("timeline").$type<{ year: string; event: string }[]>(),
  funFacts: jsonb("fun_facts").$type<string[]>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertMonumentSchema = createInsertSchema(monuments).pick({
  name: true,
  location: true,
  builtYear: true,
  dynasty: true,
  style: true,
  unesco: true,
  image: true,
  description: true,
  timeline: true,
  funFacts: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMonument = z.infer<typeof insertMonumentSchema>;
export type Monument = typeof monuments.$inferSelect;
