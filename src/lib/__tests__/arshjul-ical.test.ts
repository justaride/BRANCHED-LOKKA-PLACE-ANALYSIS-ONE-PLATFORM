import { byggICal } from "@/lib/arshjul-ical";
import type { HjulHendelse } from "@/types/arshjul";

const NOW = new Date("2026-06-15T10:00:00.000Z");

function ev(p: Partial<HjulHendelse> = {}): HjulHendelse {
  return {
    id: "x",
    tittel: "Test",
    start: "2026-09-12",
    kategori: "marked",
    status: "planlagt",
    ...p,
  };
}

describe("byggICal", () => {
  it("pakker inn i VCALENDAR med CRLF-linjeskift", () => {
    const ics = byggICal([], { now: NOW });
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
    expect(ics).toContain("VERSION:2.0");
  });

  it("lager én VEVENT per hendelse med DTSTAMP", () => {
    const ics = byggICal([ev({ id: "a" }), ev({ id: "b" })], { now: NOW });
    expect(ics.match(/BEGIN:VEVENT/g)?.length).toBe(2);
    expect(ics).toContain("UID:a@lokka-arshjul");
    expect(ics).toContain("UID:b@lokka-arshjul");
    expect(ics).toContain("DTSTAMP:20260615T100000Z");
  });

  it("formatterer DTSTART som DATE og DTEND eksklusivt (+1 dag)", () => {
    const ics = byggICal([ev({ start: "2026-09-12" })], { now: NOW });
    expect(ics).toContain("DTSTART;VALUE=DATE:20260912");
    expect(ics).toContain("DTEND;VALUE=DATE:20260913");
  });

  it("setter flerdags DTEND til sluttdato + 1", () => {
    const ics = byggICal(
      [ev({ start: "2026-09-12", slutt: "2026-09-13" })],
      { now: NOW },
    );
    expect(ics).toContain("DTEND;VALUE=DATE:20260914");
  });

  it("escaper komma, semikolon og linjeskift", () => {
    const ics = byggICal([ev({ tittel: "Marked, Blå; kveld\nsein" })], {
      now: NOW,
    });
    expect(ics).toContain("SUMMARY:Marked\\, Blå\\; kveld\\nsein");
  });

  it("inkluderer beskrivelse og ansvarlig", () => {
    const ics = byggICal(
      [ev({ beskrivelse: "Fast marked", ansvarlig: "Visit Løkka" })],
      { now: NOW },
    );
    expect(ics).toContain("DESCRIPTION:Fast marked\\nAnsvarlig: Visit Løkka");
  });

  it("mapper status til iCal-status", () => {
    expect(byggICal([ev({ status: "avlyst" })], { now: NOW })).toContain(
      "STATUS:CANCELLED",
    );
    expect(byggICal([ev({ status: "bekreftet" })], { now: NOW })).toContain(
      "STATUS:CONFIRMED",
    );
    expect(byggICal([ev({ status: "planlagt" })], { now: NOW })).toContain(
      "STATUS:TENTATIVE",
    );
  });

  it("tar bare med absolutte http(s)-lenker som URL", () => {
    expect(
      byggICal([ev({ lenke: "https://visitlokka.no" })], { now: NOW }),
    ).toContain("URL:https://visitlokka.no");
    expect(
      byggICal([ev({ lenke: "/main-board/analyser" })], { now: NOW }),
    ).not.toContain("URL:");
  });

  it("legger til RRULE for gjentakende hendelser", () => {
    const ics = byggICal([ev({ gjentakelse: "FREQ=WEEKLY" })], { now: NOW });
    expect(ics).toContain("RRULE:FREQ=WEEKLY");
  });

  it("utelater RRULE når hendelsen ikke gjentas", () => {
    expect(byggICal([ev()], { now: NOW })).not.toContain("RRULE:");
  });
});
