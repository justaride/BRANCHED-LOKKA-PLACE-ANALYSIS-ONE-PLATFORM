import nextConfig from "../../../../next.config";
import { getTenant, isCompanyTenantSlug } from "@/config/tenants";
import { getTenantPageContent } from "@/config/tenant-content";
import { getTenantPropertyIds } from "@/config/tenant-data-manifest";

describe("Aspelin Reitan tenant migration", () => {
  it("exposes Aspelin Reitan as the public tenant slug", () => {
    const tenant = getTenant("aspelin-reitan");

    expect(tenant).toMatchObject({
      slug: "aspelin-reitan",
      name: "Aspelin Reitan",
      displayName: "Eiendomsanalyse - Aspelin Reitan",
      websiteUrl: "https://www.aspelinreitan.no",
      emailsEnvVar: "ASPELIN_REITAN_EMAILS",
    });
    expect(isCompanyTenantSlug("aspelin-reitan")).toBe(true);
    expect(isCompanyTenantSlug("aspelin-ramm")).toBe(false);
  });

  it("keeps the Aspelin Reitan page content and property manifest wired", () => {
    const content = getTenantPageContent("aspelin-reitan");

    expect(content.home.heroTitle).toBe("Aspelin Reitan Vulkan");
    expect(content.home.heroDescription).toContain("Aspelin Reitans portefolje");
    expect(getTenantPropertyIds("aspelin-reitan")).toEqual([
      "bellonabygget",
      "mathallen",
      "nye-broverkstedet",
      "scandic-hotel-vulkan",
      "vulkan-arena",
      "vulkan-omradet",
    ]);
  });

  it("redirects old Aspelin Ramm URLs to Aspelin Reitan", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/aspelin-ramm",
          destination: "/aspelin-reitan",
          permanent: true,
        },
        {
          source: "/aspelin-ramm/:path*",
          destination: "/aspelin-reitan/:path*",
          permanent: true,
        },
      ]),
    );
  });
});
