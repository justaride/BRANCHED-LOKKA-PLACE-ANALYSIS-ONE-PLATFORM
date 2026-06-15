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

  it('does not expose the removed in-app login surface', () => {
    expect(fs.existsSync(path.join(repoRoot, 'src/app/login/page.tsx'))).toBe(false);
    expect(fs.existsSync(path.join(repoRoot, 'src/app/api/auth/route.ts'))).toBe(false);
  });

  it('does not redirect tenant traffic to an in-app login route', () => {
    const proxyPath = path.join(repoRoot, 'src/proxy.ts');
    const source = fs.readFileSync(proxyPath, 'utf8');

    expect(source).not.toContain('/login');
    expect(source).not.toContain('lokka-session');
    expect(source).not.toContain('DISABLE_TENANT_AUTH');
  });
});
