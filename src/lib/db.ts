/**
 * Postgres-tilkobling for plattformen.
 * Speiler mønsteret fra Funding Map (apps/api/src/db/index.ts): rå `pg` Pool
 * + tynne query-helpere, ingen ORM. Lazy init slik at import uten DATABASE_URL
 * ikke oppretter en pool (lese-stien faller tilbake til statisk JSON).
 */
import { Pool } from "pg";

let _pool: Pool | null = null;

/** Er en database konfigurert? Brukes til å velge DB vs. JSON-fallback. */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): Pool {
  if (!_pool) {
    const url = process.env.DATABASE_URL || "";
    const isLocalhost =
      !url || url.includes("localhost") || url.includes("127.0.0.1");
    // Coolify/Hetzner-Postgres bruker ofte selvsignert sert → no-verify utenfor localhost.
    const connectionString = url.replace("sslmode=require", "sslmode=no-verify");
    _pool = new Pool({
      connectionString: connectionString || undefined,
      ssl: isLocalhost ? false : { rejectUnauthorized: false },
    });
  }
  return _pool;
}

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const result = await getPool().query(text, params);
  return result.rows as T[];
}

export async function queryOne<T>(
  text: string,
  params?: unknown[],
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}
