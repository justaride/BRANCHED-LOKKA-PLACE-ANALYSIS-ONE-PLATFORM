/**
 * Postgres-tilkobling for plattformen.
 * Speiler mønsteret fra Funding Map (apps/api/src/db/index.ts): rå `pg` Pool
 * + tynne query-helpere, ingen ORM. Lazy init slik at import uten DATABASE_URL
 * ikke oppretter en pool (lese-stien faller tilbake til statisk JSON).
 */
import { Pool } from "pg";

let _pool: Pool | null = null;

type PgSslConfig = false | { rejectUnauthorized: false };

/** Er en database konfigurert? Brukes til å velge DB vs. JSON-fallback. */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function isPrivateIpv4(host: string): boolean {
  return (
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  );
}

export function databaseSslConfig(connectionString: string): PgSslConfig {
  if (!connectionString) return false;

  let host = "";
  let sslmode: string | null = null;
  try {
    const parsed = new URL(connectionString);
    host = parsed.hostname.toLowerCase();
    sslmode = parsed.searchParams.get("sslmode");
  } catch {
    return false;
  }

  if (sslmode === "disable") return false;

  const isLocalhost =
    host === "localhost" || host === "127.0.0.1" || host === "::1";
  const isDockerInternalName = host.length > 0 && !host.includes(".");

  if (isLocalhost || isPrivateIpv4(host) || isDockerInternalName) {
    return false;
  }

  // External managed Postgres endpoints often require SSL with self-signed certs.
  return { rejectUnauthorized: false };
}

export function getPool(): Pool {
  if (!_pool) {
    const url = process.env.DATABASE_URL || "";
    // Coolify/Hetzner-Postgres bruker ofte selvsignert sert → no-verify utenfor localhost.
    const connectionString = url.replace("sslmode=require", "sslmode=no-verify");
    _pool = new Pool({
      connectionString: connectionString || undefined,
      ssl: databaseSslConfig(connectionString),
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
