import fs from 'node:fs';
import path from 'node:path';

const EIENDOMSRUTER = [
  'src/app/[company]/eiendommer/[id]/page.tsx',
  'src/app/brodrene-evensen/eiendommer/[id]/page.tsx',
  'src/app/carucel/eiendommer/[id]/page.tsx',
  'src/app/eiendomsspar/eiendommer/[id]/page.tsx',
  'src/app/front-real-estate/eiendommer/[id]/page.tsx',
  'src/app/front-real-estate/eiendommer/markveien-35/page.tsx',
  'src/app/maya-eiendom/eiendommer/[id]/page.tsx',
  'src/app/roger-vodal/eiendommer/[id]/page.tsx',
  'src/app/sio/eiendommer/[id]/page.tsx',
  'src/app/spabo/eiendommer/[id]/page.tsx',
] as const;

describe('eiendomsruter bruker maskert data etter maskerEiendom', () => {
  test.each(EIENDOMSRUTER)('%s sender ikke originale aktører videre', (relativePath) => {
    const source = fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');

    expect(source).toContain('maskerEiendom(eiendom, tilgang)');
    expect(source).not.toContain('actors={eiendom.naringsaktorer.actors}');
  });
});
