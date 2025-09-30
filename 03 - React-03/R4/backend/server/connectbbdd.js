// connectbbdd.js
// Conexión a Supabase (PostgreSQL)

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Supabase te da una URL de conexión completa
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // necesario para Supabase en Render
    }
});

/**
 * Obtiene una conexión desde el pool.
 * @returns {Promise<pg.PoolClient>} Cliente de base de datos.
 */
export async function connectDB() {
    try {
        const client = await pool.connect();
        console.log('✅ Conexión a Supabase establecida.');
        return client;
    } catch (err) {
        console.error('❌ Error al conectar con Supabase:', err.message);
        return null;
    }
}