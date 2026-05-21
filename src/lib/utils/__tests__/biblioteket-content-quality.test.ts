import fs from 'fs';
import path from 'path';

import ildsjeler from '@/data/biblioteket/ildsjeler/ildsjeler.json';

describe('Biblioteket content quality', () => {
  it('does not reference missing local Ildsjeler images', () => {
    const missingImages = ildsjeler
      .filter((ildsjel) => ildsjel.imageUrl?.startsWith('/'))
      .filter((ildsjel) => !fs.existsSync(path.join(process.cwd(), 'public', ildsjel.imageUrl)))
      .map((ildsjel) => `${ildsjel.id}: ${ildsjel.imageUrl}`);

    expect(missingImages).toEqual([]);
  });

  it('uses renderable Ildsjeler link values', () => {
    const invalidLinks = ildsjeler.flatMap((ildsjel) =>
      ildsjel.links
        .map((link, index) => ({ link, index }))
        .filter(({ link }) => {
          if (typeof link === 'string') return link.length === 0;
          return typeof link.url !== 'string' || link.url.length === 0;
        })
        .map(({ index }) => `${ildsjel.id}: links[${index}]`),
    );

    expect(invalidLinks).toEqual([]);
  });
});
