import {
  ARSHJUL_KANDIDAT_STATUSER,
  arshjulKandidater2026,
} from "@/data/main-board/arshjul-kandidater-2026";
import arshjul2026 from "@/data/main-board/arshjul-2026.json";
import { KATEGORI_REKKEFOLGE } from "@/components/arshjul/arshjulShared";

describe("arshjulKandidater2026", () => {
  it("keeps discussion candidates separate from approved calendar events", () => {
    const kalenderIds = new Set(arshjul2026.hendelser.map((hendelse) => hendelse.id));

    expect(arshjulKandidater2026.length).toBeGreaterThan(10);
    expect(arshjulKandidater2026.every((kandidat) => !kalenderIds.has(kandidat.id))).toBe(true);
  });

  it("uses valid decision statuses and calendar categories", () => {
    const gyldigeStatuser = new Set(ARSHJUL_KANDIDAT_STATUSER);
    const gyldigeKategorier = new Set(KATEGORI_REKKEFOLGE);

    for (const kandidat of arshjulKandidater2026) {
      expect(gyldigeStatuser.has(kandidat.vurdering)).toBe(true);
      expect(gyldigeKategorier.has(kandidat.kategori)).toBe(true);
      expect(kandidat.kilde).toMatch(/^https?:\/\//);
    }
  });
});
