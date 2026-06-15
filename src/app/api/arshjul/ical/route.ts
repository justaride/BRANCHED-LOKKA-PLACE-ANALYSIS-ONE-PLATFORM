import { NextResponse } from "next/server";
import { getArshjulYears } from "@/lib/arshjul-store";
import { byggICal } from "@/lib/arshjul-ical";

export const dynamic = "force-dynamic";

/**
 * Kalenderfeed (.ics). ?ar=2026 begrenser til ett år.
 * Leser samme kilde som hjul/agenda (DB med JSON-fallback).
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const arParam = searchParams.get("ar");

  const years = await getArshjulYears();
  const valgteAr = arParam
    ? years.filter((y) => y.ar === Number(arParam))
    : years;
  const hendelser = valgteAr.flatMap((y) => y.hendelser);

  const ics = byggICal(hendelser, {
    kalendernavn: `Årshjul Grünerløkka${arParam ? ` ${arParam}` : ""}`,
  });
  const filnavn = `arshjul${arParam ? `-${arParam}` : ""}.ics`;

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filnavn}"`,
      "Cache-Control": "no-store",
    },
  });
}
