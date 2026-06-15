/**
 * Migrasjonskjører. Speiler Funding Map: leser nummererte .sql-filer i
 * rekkefølge og kjører hver setning. Migrasjonene er idempotente
 * (IF NOT EXISTS), så det finnes ingen egen migrasjonstabell.
 *
 * Kjør lokalt:  DATABASE_URL=... npm run migrate
 * (laster også .env.local / .env automatisk)
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { getPool } from "../lib/db";

function splitStatements(sql: string): string[] {
  return sql
    .split(/;\s*(?:\r?\n|$)/g)
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);
}

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL mangler. Sett den før du kjører migrate.");
    process.exit(1);
  }

  const pool = getPool();
  const migrationsDir = join(__dirname, "migrations");
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  try {
    for (const file of files) {
      console.log(`Kjører migrasjon: ${file}`);
      const sql = readFileSync(join(migrationsDir, file), "utf-8");
      const statements = splitStatements(sql);
      for (const statement of statements) {
        await pool.query(statement);
      }
      console.log(`  Ferdig: ${file} (${statements.length} setning(er))`);
    }
    console.log("Alle migrasjoner fullført.");
  } catch (error) {
    console.error("Migrasjon feilet:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
