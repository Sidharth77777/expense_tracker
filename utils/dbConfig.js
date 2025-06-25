import { drizzle } from 'drizzle-orm/neon-http'; // ✅ HTTP-compatible driver
import { neon } from '@neondatabase/serverless'; // ✅ Matches the driver
import * as schema from './schema';              // ✅ Your schema
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL); // ✅ Make sure this env var is set correctly
export const db = drizzle(sql, { schema });
