import pg from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to add a .env file?",
  );
}

// Since we are using Supabase (PostgreSQL), we use node-postgres for direct connection
// In a serverless environment (like Vercel), we could use neon-serverless if it was Neon,
// but for standard Postgres/Supabase, pg is robust.
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzlePg(pool, { schema });
