/**
 * Validering for årshjul-skriving (create/update). Brukes av API-rutene.
 * Holdes i synk med HjulKategori/HjulStatus i @/types/arshjul.
 */
import { z } from "zod";

export const KATEGORIER = [
  "arrangement",
  "marked",
  "kampanje",
  "visit-lokka",
  "kultur",
  "sesong",
  "apning",
  "annet",
] as const;

export const STATUSER = [
  "planlagt",
  "bekreftet",
  "gjennomfort",
  "avlyst",
] as const;

const isoDato = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Dato må være på formatet YYYY-MM-DD");

const baseObject = z.object({
  tittel: z.string().trim().min(1, "Tittel er påkrevd").max(200),
  start: isoDato,
  slutt: isoDato.nullable().optional(),
  kategori: z.enum(KATEGORIER),
  status: z.enum(STATUSER),
  beskrivelse: z.string().max(2000).nullable().optional(),
  lenke: z.string().max(500).nullable().optional(),
  ansvarlig: z.string().max(200).nullable().optional(),
  tenant: z.string().max(100).nullable().optional(),
  gjentakelse: z.string().max(500).nullable().optional(),
});

export const hendelseInputSchema = baseObject.refine(
  (d) => !d.slutt || d.slutt >= d.start,
  { message: "Sluttdato kan ikke være før startdato", path: ["slutt"] },
);

export const hendelsePatchSchema = baseObject.partial();

export type HendelseInput = z.infer<typeof hendelseInputSchema>;
export type HendelsePatch = z.infer<typeof hendelsePatchSchema>;
