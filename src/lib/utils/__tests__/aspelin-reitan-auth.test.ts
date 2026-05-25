import { getAllowedEmails } from "@/lib/tenant-emails";

describe("Aspelin Reitan auth allowlist migration", () => {
  const originalAspelinReitan = process.env.ASPELIN_REITAN_EMAILS;
  const originalAspelinRamm = process.env.ASPELIN_RAMM_EMAILS;

  afterEach(() => {
    process.env.ASPELIN_REITAN_EMAILS = originalAspelinReitan;
    process.env.ASPELIN_RAMM_EMAILS = originalAspelinRamm;
  });

  it("falls back to the old Aspelin Ramm email env during migration", () => {
    process.env.ASPELIN_REITAN_EMAILS = "";
    process.env.ASPELIN_RAMM_EMAILS = "kontakt@example.com";

    expect(getAllowedEmails("aspelin-reitan")).toEqual(["kontakt@example.com"]);
  });

  it("prefers the new Aspelin Reitan email env when configured", () => {
    process.env.ASPELIN_REITAN_EMAILS = "ny@example.com";
    process.env.ASPELIN_RAMM_EMAILS = "gammel@example.com";

    expect(getAllowedEmails("aspelin-reitan")).toEqual(["ny@example.com"]);
  });
});
