import { translateHistorieText } from '../translate-historie';

describe('translateHistorieText', () => {
  it('does not corrupt already Norwegian timeline text', () => {
    const text =
      'Våren 1861 teller det hastig oppførte trehusstrøket Ny York 69 bygninger og om lag 1500 innbyggere, et symbol på eksplosiv vekst med lav standard.';

    expect(translateHistorieText(text)).toBe(text);
  });

  it('still translates exact English history strings', () => {
    expect(translateHistorieText('Grünerløkka incorporated into Christiania')).toBe(
      'Grünerløkka innlemmet i Christiania',
    );
  });
});
