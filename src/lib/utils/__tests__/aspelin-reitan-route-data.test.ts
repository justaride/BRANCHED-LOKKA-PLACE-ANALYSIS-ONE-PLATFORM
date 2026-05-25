import { getTenantLoader } from "@/lib/loaders/tenant-registry";
import { getTenantPropertyIds } from "@/config/tenant-data-manifest";
import { hasOneMinAnalysisData } from "@/lib/loaders/one-min-loader";

describe("Aspelin Reitan route data", () => {
  it("loads the legacy Aspelin data through the new public slug", async () => {
    const loader = getTenantLoader("aspelin-reitan");
    const properties = await loader.loadAllEiendommer();

    expect(properties.map((property) => property.id)).toEqual(
      getTenantPropertyIds("aspelin-reitan"),
    );
    expect(properties).toHaveLength(6);
  });

  it("keeps Mathallen and Vulkan one-minute data available under the new slug", () => {
    expect(hasOneMinAnalysisData("aspelin-reitan", "mathallen")).toBe(true);
    expect(hasOneMinAnalysisData("aspelin-reitan", "vulkan-omradet")).toBe(true);
  });
});
