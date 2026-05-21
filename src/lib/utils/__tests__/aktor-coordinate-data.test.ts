import coordinates from '@/data/main-board/aktorer/2025-arsrapport-coordinates.json';

describe('main board actor coordinate data', () => {
  it('has coordinates for concrete street addresses', () => {
    const missingConcreteAddresses = Object.entries(coordinates)
      .filter(([address, coordinate]) => /\d/.test(address) && coordinate === null)
      .map(([address]) => address);

    expect(missingConcreteAddresses).toEqual([]);
  });
});
