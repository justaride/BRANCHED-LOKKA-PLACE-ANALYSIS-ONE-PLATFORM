import {
  getNedreLokkaBevegelseData,
  getNedreLokkaKonkurransebildeData,
  getNedreLokkaKorthandelData,
} from "@/lib/analyser/nedre-lokka-utsnitt-data";

describe("nedre lokka utsnitt data adapter", () => {
  it("loads bevegelse datasets behind named fields", () => {
    const data = getNedreLokkaBevegelseData();

    expect(data.besokPerTime).toHaveLength(24);
    expect(data.besokPerUkedag).toHaveLength(7);
    expect(data.bevegelsesmonster).toHaveLength(3);
  });

  it("loads korthandel datasets behind named fields", () => {
    const data = getNedreLokkaKorthandelData();

    expect(data.korthandelPerUkedag).toHaveLength(7);
    expect(data.arligVekst).toHaveLength(7);
    expect(data.korthandelTidsrom).toHaveLength(87);
  });

  it("loads konkurransebilde datasets behind named fields", () => {
    const data = getNedreLokkaKonkurransebildeData();

    expect(data.konseptmiks).toHaveLength(15);
    expect(data.kjederVsUavhengige).toHaveLength(11);
    expect(data.utviklingPerAr).toHaveLength(11);
    expect(data.estimertOmsetning.actors.length).toBeGreaterThan(100);
  });
});
