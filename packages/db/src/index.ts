import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg';

import { meeting } from './schema'; 

const connectionString = process.env.DATABASE_URL;

const globalForDb = globalThis as unknown as { conn: Pool | undefined }

const pool = 
    globalForDb.conn ??
    new Pool({
        connectionString,
        max: 10,
    });

if (process.env.NODE_ENV !== 'production') globalForDb.conn = pool;

export const db = drizzle(pool, {
    schema: {
        meeting,
    }
});
