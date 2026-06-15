/**
 * iCalendar (RFC 5545)-serializer for årshjulet.
 *
 * Håndskrevet og dependency-fri, i tråd med resten av årshjul-koden. Brukes av
 * API-ruten `/api/arshjul/ical` for å la kalender-apper laste ned / abonnere på
 * hendelsene. Alle hendelser er heldags (VALUE=DATE) med eksklusiv DTEND.
 */
import type { HjulHendelse } from "@/types/arshjul";
import { KATEGORI_LABEL } from "@/components/arshjul/arshjulShared";

/** VEVENT STATUS-verdier per RFC 5545 (gjennomført finnes ikke → CONFIRMED). */
const STATUS_ICAL: Record<HjulHendelse["status"], string> = {
  planlagt: "TENTATIVE",
  bekreftet: "CONFIRMED",
  gjennomfort: "CONFIRMED",
  avlyst: "CANCELLED",
};

/** Escaper tekst per RFC 5545 (backslash, semikolon, komma, linjeskift). */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** ISO «YYYY-MM-DD» → iCal DATE «YYYYMMDD». */
function tilICalDato(iso: string): string {
  return iso.replace(/-/g, "");
}

/** Neste dag (UTC) som iCal DATE — gir eksklusiv DTEND for heldagshendelser. */
function nesteDag(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

/** UTC-tidsstempel «YYYYMMDDTHHMMSSZ». */
function tidsstempel(now: Date): string {
  return now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

/** Fold linjer til ≤74 tegn (fortsettelse med CRLF + mellomrom), jf. RFC 5545. */
function foldLinje(linje: string): string {
  if (linje.length <= 74) return linje;
  const deler: string[] = [linje.slice(0, 74)];
  let rest = linje.slice(74);
  while (rest.length > 73) {
    deler.push(" " + rest.slice(0, 73));
    rest = rest.slice(73);
  }
  if (rest.length) deler.push(" " + rest);
  return deler.join("\r\n");
}

export interface ICalOpts {
  /** X-WR-CALNAME (visningsnavn i kalender-appen). */
  kalendernavn?: string;
  /** Overstyrbar «nå» for deterministisk DTSTAMP (test). */
  now?: Date;
}

/** Bygg en komplett iCalendar-streng (CRLF-linjeskift) fra hendelser. */
export function byggICal(hendelser: HjulHendelse[], opts: ICalOpts = {}): string {
  const dtstamp = tidsstempel(opts.now ?? new Date());

  const linjer: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lokka Gardeierforening//Arshjul//NO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  if (opts.kalendernavn) {
    linjer.push(`X-WR-CALNAME:${escapeText(opts.kalendernavn)}`);
  }

  for (const h of hendelser) {
    const sluttKilde = h.slutt && h.slutt !== h.start ? h.slutt : h.start;
    const beskrivelse = [
      h.beskrivelse,
      h.ansvarlig ? `Ansvarlig: ${h.ansvarlig}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    linjer.push("BEGIN:VEVENT");
    linjer.push(`UID:${h.id}@lokka-arshjul`);
    linjer.push(`DTSTAMP:${dtstamp}`);
    linjer.push(`DTSTART;VALUE=DATE:${tilICalDato(h.start)}`);
    linjer.push(`DTEND;VALUE=DATE:${nesteDag(sluttKilde)}`);
    linjer.push(`SUMMARY:${escapeText(h.tittel)}`);
    if (beskrivelse) linjer.push(`DESCRIPTION:${escapeText(beskrivelse)}`);
    linjer.push(`CATEGORIES:${escapeText(KATEGORI_LABEL[h.kategori])}`);
    linjer.push(`STATUS:${STATUS_ICAL[h.status]}`);
    if (h.lenke && /^https?:\/\//i.test(h.lenke)) {
      linjer.push(`URL:${h.lenke}`);
    }
    linjer.push("END:VEVENT");
  }

  linjer.push("END:VCALENDAR");
  return linjer.map(foldLinje).join("\r\n") + "\r\n";
}
