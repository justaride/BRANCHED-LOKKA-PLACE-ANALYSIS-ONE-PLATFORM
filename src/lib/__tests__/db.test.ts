import { databaseSslConfig } from "../db";

describe("databaseSslConfig", () => {
  it("disables SSL for Docker-internal database hostnames", () => {
    expect(
      databaseSslConfig(
        "postgresql://lokka_arshjul:secret@osokwokwogso44gws0c0kwcw:5432/lokka_arshjul",
      ),
    ).toBe(false);
  });

  it("keeps no-verify SSL for external database hostnames", () => {
    expect(
      databaseSslConfig(
        "postgresql://user:secret@db.example.com:5432/app?sslmode=require",
      ),
    ).toEqual({ rejectUnauthorized: false });
  });
});
