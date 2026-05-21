import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(__dirname, '../../../..');

describe('Next proxy file convention', () => {
  it('uses the Next 16 proxy.ts convention instead of middleware.ts', () => {
    const middlewarePath = path.join(repoRoot, 'src/middleware.ts');
    const proxyPath = path.join(repoRoot, 'src/proxy.ts');

    expect(fs.existsSync(middlewarePath)).toBe(false);
    expect(fs.existsSync(proxyPath)).toBe(true);
    expect(fs.readFileSync(proxyPath, 'utf8')).toMatch(
      /export\s+async\s+function\s+proxy\(/,
    );
  });
});
