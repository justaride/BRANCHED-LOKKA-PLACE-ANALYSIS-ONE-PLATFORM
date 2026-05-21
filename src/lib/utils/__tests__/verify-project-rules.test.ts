import path from 'path';
import fs from 'fs';
import { TENANTS } from '@/config/tenants';
import { verifyPropertyData } from '../../../../scripts/verify-project-rules';

const repoRoot = path.resolve(__dirname, '../../../..');

function dataFile(relativePath: string): string {
  return path.join(repoRoot, relativePath);
}

describe('verify-project data rules', () => {
  it('accepts Norwegian property fields and path-derived tenant context', () => {
    const issues = verifyPropertyData(
      { id: 'mathallen', navn: 'Mathallen Oslo', adresse: 'Vulkan 5' },
      dataFile('src/data/aspelin-ramm/mathallen.json'),
      repoRoot,
    );

    expect(issues).toEqual([]);
  });

  it('allows missing property names when the loader can derive them from the id', () => {
    const issues = verifyPropertyData(
      { id: 'markveien-55', adresse: 'Markveien 55' },
      dataFile('src/data/spabo/markveien-55.json'),
      repoRoot,
    );

    expect(issues).toEqual([]);
  });

  it('does not treat place analysis ids as property ids', () => {
    const issues = verifyPropertyData(
      { id: '2025-arsrapport', title: 'Grünerløkka 2025 - Årsrapport' },
      dataFile('src/data/main-board/analyser/2025-arsrapport.json'),
      repoRoot,
    );

    expect(issues).toEqual([]);
  });

  it('allows sparse nulls in tabular Plaace exports', () => {
    const issues = verifyPropertyData(
      [{ DateTime: 'Monday', '2018': null, '2025': 12.4 }],
      dataFile('src/data/main-board/nederst-i-markveien/korthandel/korthandel-per-ukedag.json'),
      repoRoot,
    );

    expect(issues).toEqual([]);
  });

  it('keeps unresolved coordinates visible as actionable data gaps', () => {
    const issues = verifyPropertyData(
      { 'ØSTRE AKER VEI 17': null },
      dataFile('src/data/main-board/aktorer/2025-arsrapport-coordinates.json'),
      repoRoot,
    );

    expect(issues).toEqual(['Missing coordinate: ØSTRE AKER VEI 17']);
  });

  it('does not treat locality-only actor addresses as coordinate gaps', () => {
    const issues = verifyPropertyData(
      { OSLO: null },
      dataFile('src/data/main-board/aktorer/2025-arsrapport-coordinates.json'),
      repoRoot,
    );

    expect(issues).toEqual([]);
  });
});

describe('tenant smoke script', () => {
  it('uses the current dev port and tenant registry slugs', () => {
    const script = fs.readFileSync(
      path.join(repoRoot, 'scripts/test-all-tenants.sh'),
      'utf8',
    );

    expect(script).toContain('http://localhost:3001');
    expect(script).not.toContain('malling-co');
    expect(script).not.toContain('spabo-eiendom');

    for (const tenant of Object.keys(TENANTS)) {
      expect(script).toContain(tenant);
    }
  });
});
