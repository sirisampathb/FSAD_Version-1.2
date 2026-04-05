import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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
