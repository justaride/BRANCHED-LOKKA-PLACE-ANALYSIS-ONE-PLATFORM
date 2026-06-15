/**
 * Seeder årshjul-tabellen fra src/data/main-board/arshjul-2026.json.
 * Idempotent (UPSERT på id), så den kan kjøres på nytt uten duplikater.
 *
 * Kjør:  DATABASE_URL=... npm run seed:arshjul
 */
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { getPool } from "../lib/db";
import type { HjulAr } from "../types/arshjul";
import data from "../data/main-board/arshjul-2026.json";

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL mangler. Sett den før du seeder.");
    process.exit(1);
  }

  const hjul = data as HjulAr;
  const pool = getPool();

  try {
    for (const h of hjul.hendelser) {
      await pool.query(
        `INSERT INTO arshjul_hendelse
           (id, ar, tittel, start_dato, slutt_dato, kategori, status,
            beskrivelse, lenke, ansvarlig, tenant, gjentakelse, sist_oppdatert)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, now())
         ON CONFLICT (id) DO UPDATE SET
           ar = EXCLUDED.ar,
           tittel = EXCLUDED.tittel,
           start_dato = EXCLUDED.start_dato,
           slutt_dato = EXCLUDED.slutt_dato,
           kategori = EXCLUDED.kategori,
           status = EXCLUDED.status,
           beskrivelse = EXCLUDED.beskrivelse,
           lenke = EXCLUDED.lenke,
           ansvarlig = EXCLUDED.ansvarlig,
           tenant = EXCLUDED.tenant,
           gjentakelse = EXCLUDED.gjentakelse,
           sist_oppdatert = now()`,
        [
          h.id,
          hjul.ar,
          h.tittel,
          h.start,
          h.slutt ?? null,
          h.kategori,
          h.status,
          h.beskrivelse ?? null,
          h.lenke ?? null,
          h.ansvarlig ?? null,
          h.tenant ?? null,
          h.gjentakelse ?? null,
        ],
      );
    }
    console.log(`Seedet ${hjul.hendelser.length} hendelser for ${hjul.ar}.`);
  } catch (error) {
    console.error("Seeding feilet:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
