import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/db";
import { deleteHendelse, updateHendelse } from "@/lib/arshjul-store";
import { hendelsePatchSchema } from "@/lib/arshjul-schema";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Oppdater hendelse. Krever DB. */
export async function PATCH(req: Request, { params }: Ctx) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database ikke konfigurert" },
      { status: 503 },
    );
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  const parsed = hendelsePatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validering feilet", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const updated = await updateHendelse(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: "Ikke funnet" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[arshjul] PATCH feilet:", err);
    return NextResponse.json({ error: "Lagring feilet" }, { status: 500 });
  }
}

/** Slett hendelse. Krever DB. */
export async function DELETE(_req: Request, { params }: Ctx) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database ikke konfigurert" },
      { status: 503 },
    );
  }

  const { id } = await params;

  try {
    const ok = await deleteHendelse(id);
    if (!ok) {
      return NextResponse.json({ error: "Ikke funnet" }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[arshjul] DELETE feilet:", err);
    return NextResponse.json({ error: "Sletting feilet" }, { status: 500 });
  }
}
