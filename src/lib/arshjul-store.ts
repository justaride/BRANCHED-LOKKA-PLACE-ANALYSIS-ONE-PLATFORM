/**
 * Server-side lese- og skrivekilde for årshjulet.
 * Leser fra Postgres når DATABASE_URL finnes; ellers (eller ved tom DB /
 * lesefeil) faller den tilbake til statisk JSON — så koden kan deployes trygt
 * før databasen er provisjonert.
 *
 * Skriving (create/update/delete) krever DB og kalles kun fra API-rutene,
 * som returnerer 503 når DATABASE_URL mangler.
 *
 * NB: kun server (importerer pg). Klientkomponenten bruker geometri fra
 * "@/lib/arshjul" og typer fra "@/types/arshjul" — ikke denne filen.
 */
import { randomUUID } from "crypto";
import { getPool, hasDatabase, query } from "./db";
import staticData from "@/data/main-board/arshjul-2026.json";
import type { HjulAr, HjulHendelse } from "@/types/arshjul";
import type { HendelseInput, HendelsePatch } from "./arshjul-schema";

const STATIC_YEARS: HjulAr[] = [staticData as HjulAr];

interface Row {
  id: string;
  ar: number;
  tittel: string;
  start: string;
  slutt: string | null;
  kategori: HjulHendelse["kategori"];
  status: HjulHendelse["status"];
  beskrivelse: string | null;
  lenke: string | null;
  ansvarlig: string | null;
  tenant: string | null;
}

const SELECT_COLS = `id, ar, tittel,
  to_char(start_dato, 'YYYY-MM-DD') AS start,
  to_char(slutt_dato, 'YYYY-MM-DD') AS slutt,
  kategori, status, beskrivelse, lenke, ansvarlig, tenant`;

function rowToHendelse(r: Row): HjulHendelse {
  return {
    id: r.id,
    tittel: r.tittel,
    start: r.start,
    kategori: r.kategori,
    status: r.status,
    ...(r.slutt ? { slutt: r.slutt } : {}),
    ...(r.beskrivelse ? { beskrivelse: r.beskrivelse } : {}),
    ...(r.lenke ? { lenke: r.lenke } : {}),
    ...(r.ansvarlig ? { ansvarlig: r.ansvarlig } : {}),
    ...(r.tenant ? { tenant: r.tenant } : {}),
  };
}

export async function getArshjulYears(): Promise<HjulAr[]> {
  if (!hasDatabase()) return STATIC_YEARS;

  try {
    const rows = await query<Row>(
      `SELECT ${SELECT_COLS}
         FROM arshjul_hendelse
        ORDER BY ar DESC, start_dato ASC`,
    );

    if (rows.length === 0) return STATIC_YEARS; // tom DB → bruk seed-data

    const byYear = new Map<number, HjulHendelse[]>();
    for (const r of rows) {
      const list = byYear.get(r.ar) ?? [];
      list.push(rowToHendelse(r));
      byYear.set(r.ar, list);
    }

    return [...byYear.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([ar, hendelser]) => ({ ar, hendelser }));
  } catch (err) {
    console.error(
      "[arshjul] DB-lesing feilet — faller tilbake til statisk JSON:",
      err,
    );
    return STATIC_YEARS;
  }
}

export async function getHendelse(id: string): Promise<HjulHendelse | null> {
  if (!hasDatabase()) return null;
  const rows = await query<Row>(
    `SELECT ${SELECT_COLS} FROM arshjul_hendelse WHERE id = $1`,
    [id],
  );
  return rows[0] ? rowToHendelse(rows[0]) : null;
}

export async function createHendelse(input: HendelseInput): Promise<HjulHendelse> {
  const id = randomUUID();
  const ar = Number(input.start.slice(0, 4));
  await query(
    `INSERT INTO arshjul_hendelse
       (id, ar, tittel, start_dato, slutt_dato, kategori, status,
        beskrivelse, lenke, ansvarlig, tenant, sist_oppdatert)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, now())`,
    [
      id,
      ar,
      input.tittel,
      input.start,
      input.slutt ?? null,
      input.kategori,
      input.status,
      input.beskrivelse ?? null,
      input.lenke ?? null,
      input.ansvarlig ?? null,
      input.tenant ?? null,
    ],
  );
  const created = await getHendelse(id);
  if (!created) throw new Error("Opprettet hendelse ble ikke funnet");
  return created;
}

export async function updateHendelse(
  id: string,
  patch: HendelsePatch,
): Promise<HjulHendelse | null> {
  const existing = await getHendelse(id);
  if (!existing) return null;

  const start = patch.start ?? existing.start;
  const ar = Number(start.slice(0, 4));
  const keep = <T>(p: T | null | undefined, e: T | undefined): T | null =>
    p !== undefined ? (p ?? null) : (e ?? null);

  await query(
    `UPDATE arshjul_hendelse SET
       tittel = $2, start_dato = $3, slutt_dato = $4, kategori = $5, status = $6,
       beskrivelse = $7, lenke = $8, ansvarlig = $9, tenant = $10, ar = $11,
       sist_oppdatert = now()
     WHERE id = $1`,
    [
      id,
      patch.tittel ?? existing.tittel,
      start,
      keep(patch.slutt, existing.slutt),
      patch.kategori ?? existing.kategori,
      patch.status ?? existing.status,
      keep(patch.beskrivelse, existing.beskrivelse),
      keep(patch.lenke, existing.lenke),
      keep(patch.ansvarlig, existing.ansvarlig),
      keep(patch.tenant, existing.tenant),
      ar,
    ],
  );

  return getHendelse(id);
}

export async function deleteHendelse(id: string): Promise<boolean> {
  if (!hasDatabase()) return false;
  const res = await getPool().query(
    `DELETE FROM arshjul_hendelse WHERE id = $1`,
    [id],
  );
  return (res.rowCount ?? 0) > 0;
}
