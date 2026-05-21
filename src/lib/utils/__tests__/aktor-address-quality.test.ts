import arsrapport2024 from '@/data/main-board/aktorer/2024-arsrapport.json';
import arsrapport2025 from '@/data/main-board/aktorer/2025-arsrapport.json';
import lokka2024 from '@/data/main-board/aktorer/sammenligning-2024/lokka.json';

const unresolvedGenericAddressActors = new Set([
  'Lily Beauty Phan',
]);

describe('Løkka actor address quality', () => {
  it('only keeps generic OSLO addresses for explicitly unresolved actors', () => {
    const genericAddressActors = [
      ...arsrapport2024.actors,
      ...arsrapport2025.actors,
      ...lokka2024.actors,
    ]
      .filter(actor => actor.adresse === 'OSLO')
      .map(actor => actor.navn);

    expect(new Set(genericAddressActors)).toEqual(unresolvedGenericAddressActors);
  });
});
