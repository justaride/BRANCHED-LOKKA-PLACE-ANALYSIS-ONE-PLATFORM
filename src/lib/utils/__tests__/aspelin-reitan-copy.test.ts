import fs from "fs";
import path from "path";

const repoRoot = process.cwd();

describe("Aspelin Reitan visible copy and assets", () => {
  it("has clean Aspelin Reitan logo and company hero assets", () => {
    expect(fs.existsSync(path.join(repoRoot, "public/images/logos/aspelin-reitan.svg"))).toBe(true);
    expect(fs.existsSync(path.join(repoRoot, "public/images/companies/aspelin-reitan.webp"))).toBe(true);

    const logo = fs.readFileSync(
      path.join(repoRoot, "public/images/logos/aspelin-reitan.svg"),
      "utf8",
    );
    expect(logo).toContain("<svg");
    expect(logo).not.toContain("<html");
    expect(logo).not.toContain("<script");
  });

  it("does not expose old Aspelin Ramm branding in active tenant files", () => {
    const activeFiles = [
      "src/config/tenants.ts",
      "src/config/tenant-content.ts",
      "src/app/page.tsx",
      "src/app/main-board/page.tsx",
    ];

    for (const file of activeFiles) {
      const content = fs.readFileSync(path.join(repoRoot, file), "utf8");
      expect(content).not.toContain("Aspelin Ramm");
    }
  });
});
