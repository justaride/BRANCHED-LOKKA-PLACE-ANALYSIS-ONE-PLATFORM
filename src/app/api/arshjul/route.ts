import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/db";
import { createHendelse, getArshjulYears } from "@/lib/arshjul-store";
import { hendelseInputSchema } from "@/lib/arshjul-schema";

export const dynamic = "force-dynamic";

/** Liste hendelser. ?ar=2026 begrenser til ett år. Leser DB med JSON-fallback. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const arParam = searchParams.get("ar");
  const years = await getArshjulYears();

  if (arParam) {
    const year = years.find((y) => y.ar === Number(arParam));
    return NextResponse.json(year?.hendelser ?? []);
  }
  return NextResponse.json(years);
}

/** Opprett hendelse. Krever DB (returnerer 503 ellers). */
export async function POST(req: Request) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database ikke konfigurert" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  const parsed = hendelseInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validering feilet", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const created = await createHendelse(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("[arshjul] POST feilet:", err);
    return NextResponse.json({ error: "Lagring feilet" }, { status: 500 });
  }
}
