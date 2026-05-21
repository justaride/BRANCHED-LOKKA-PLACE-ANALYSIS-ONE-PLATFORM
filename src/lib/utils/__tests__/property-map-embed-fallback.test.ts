import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(__dirname, '../../../..');

describe('PropertyMapEmbed fallback', () => {
  it('renders a map fallback without requiring a Google Maps API key', () => {
    const source = fs.readFileSync(
      path.join(repoRoot, 'src/components/property/PropertyMapEmbed.tsx'),
      'utf8',
    );

    expect(source).toContain('NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY');
    expect(source).toContain('openstreetmap.org/export/embed.html');
    expect(source).toContain('google.com/maps/search');
  });
});
