import {
  byggGjentakelse,
  gjentakelseLabel,
  lesGjentakelse,
} from "@/components/arshjul/arshjulShared";

describe("gjentakelse-hjelpere (RRULE)", () => {
  it("bygger RRULE fra forhåndsvalg", () => {
    expect(byggGjentakelse("ukentlig")).toBe("FREQ=WEEKLY");
    expect(byggGjentakelse("annenhver")).toBe("FREQ=WEEKLY;INTERVAL=2");
    expect(byggGjentakelse("manedlig")).toBe("FREQ=MONTHLY");
    expect(byggGjentakelse("arlig")).toBe("FREQ=YEARLY");
  });

  it("legger til UNTIL i komprimert datoformat", () => {
    expect(byggGjentakelse("ukentlig", "2026-12-31")).toBe(
      "FREQ=WEEKLY;UNTIL=20261231",
    );
  });

  it("tolker RRULE tilbake til forhåndsvalg + sluttdato", () => {
    expect(lesGjentakelse("FREQ=WEEKLY;INTERVAL=2;UNTIL=20261231")).toEqual({
      preset: "annenhver",
      until: "2026-12-31",
    });
    expect(lesGjentakelse("FREQ=MONTHLY")).toEqual({ preset: "manedlig" });
    expect(lesGjentakelse(undefined)).toBeNull();
    expect(lesGjentakelse("")).toBeNull();
    expect(lesGjentakelse("FREQ=HOURLY")).toBeNull();
  });

  it("gir kort etikett eller null", () => {
    expect(gjentakelseLabel("FREQ=WEEKLY")).toBe("Ukentlig");
    expect(gjentakelseLabel("FREQ=YEARLY")).toBe("Årlig");
    expect(gjentakelseLabel(undefined)).toBeNull();
  });
});
