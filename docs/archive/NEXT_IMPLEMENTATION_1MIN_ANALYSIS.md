# NEXT IMPLEMENTATION: 1-Minutts Analyse - Interaktiv Datavisualisering

**Prioritet:** Høy (neste arbeidspunkt)
**Status:** Planlagt
**Estimert kompleksitet:** Middels-Høy

---

## 🎯 MÅL

Implementere 1-minutts analyse for Sofienberggata 6 (og potensielt andre eiendommer) med interaktive datavisualiseringer basert på JSON-data, akkurat som i det originale SPABO-prosjektet.

---

## 📊 NÅVÆRENDE STATUS

### ✅ Hva som fungerer nå:
- Property har `plaaceAnalyses` array med to analyser
- Brukere kan velge mellom "5 minutters gange" og "1 minutt gange"
- 5-minutters analyse viser 6 Plaace-screenshots
- 1-minutts analyse viser kun kart + nøkkeldata
- `AnalyseSelector` komponenten støtter multiple analyser

### ⚠️ Hva som mangler:
- Interaktive visualiseringer for 1-minutts analyse
- JSON data-filer ikke kopiert til nye prosjekt
- Komponenter for å rendre charts/grafer
- Integrasjon med Recharts eller lignende library

---

## 📁 LOKASJON AV ORIGINALE FILER

### JSON Data-filer (i backup):
```
../LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/place-analysis-lokka-SPABO-EIENDOM-backup-20251119-160804/

src/data/
├── demografi/sofienberggata-6-1min.json
├── bevegelse/sofienberggata-6-1min.json
├── konkurransebilde/sofienberggata-6-1min.json
├── marked/sofienberggata-6-1min-korthandel.json
└── aktorer/sofienberggata-6-1min.json
```

### Bilde:
```
public/images/sofienberggata-6/1min-kart.png
```

---

## 📋 IMPLEMENTERINGSPLAN

### FASE 1: Data Migration
**Oppgave:** Kopiere og strukturere JSON-filer

**Steg:**
1. Opprett mapper i nytt prosjekt:
   ```
   src/data/spabo/sofienberggata-6/1min/
   ```

2. Kopier JSON-filer:
   - `demografi.json` - Aldersfordeling (mann/kvinne)
   - `bevegelse.json` - Bevegelsesmønster data
   - `konkurransebilde.json` - Konkurransedata
   - `korthandel.json` - Tidsserie data (2019-2025)
   - `aktorer.json` - Næringsaktører i området

3. Kopier `1min-kart.png` (allerede gjort ✅)

### FASE 2: Type Definitions
**Oppgave:** Definere TypeScript types for dataene

**Fil:** `src/types/plaace-analysis.ts` (ny eller utvide eksisterende)

**Types som trengs:**
```typescript
// Demografi
interface AldersfordelingData {
  mann: { category: string; value: number }[];
  kvinne: { category: string; value: number }[];
}

// Korthandel tidsserie
interface KorthandelData {
  tidsserie: {
    date: string;
    mat_opplevelser: number;
    handel: number;
    tjenester: number;
  }[];
}

// Bevegelse
interface BevegelseData {
  // Bestemmes etter å ha sett på fil-innholdet
}

// Konkurransebilde
interface KonkurransebildeData {
  // Bestemmes etter å ha sett på fil-innholdet
}

// Aktører
interface AktorData {
  // Bestemmes etter å ha sett på fil-innholdet
}

// Main 1min analysis data type
interface OneMinAnalysisData {
  demografi: AldersfordelingData;
  korthandel: KorthandelData;
  bevegelse: BevegelseData;
  konkurransebilde: KonkurransebildeData;
  aktorer: AktorData;
}
```

### FASE 3: Data Loader
**Oppgave:** Lage loader funksjon for 1min data

**Fil:** `src/lib/loaders/plaace-1min-loader.ts` (ny)

```typescript
export async function load1MinAnalysisData(
  tenant: string,
  propertyId: string
): Promise<OneMinAnalysisData | null> {
  try {
    const [demografi, korthandel, bevegelse, konkurransebilde, aktorer] =
      await Promise.all([
        import(`@/data/${tenant}/${propertyId}/1min/demografi.json`),
        import(`@/data/${tenant}/${propertyId}/1min/korthandel.json`),
        import(`@/data/${tenant}/${propertyId}/1min/bevegelse.json`),
        import(`@/data/${tenant}/${propertyId}/1min/konkurransebilde.json`),
        import(`@/data/${tenant}/${propertyId}/1min/aktorer.json`),
      ]);

    return {
      demografi: demografi.default,
      korthandel: korthandel.default,
      bevegelse: bevegelse.default,
      konkurransebilde: konkurransebilde.default,
      aktorer: aktorer.default,
    };
  } catch (error) {
    console.error('Failed to load 1min analysis data:', error);
    return null;
  }
}
```

### FASE 4: Chart Components
**Oppgave:** Lage React-komponenter for visualiseringer

**Dependencies som trengs:**
- `recharts` (allerede installert? Sjekk package.json)

**Komponenter å lage:**

1. **`src/components/plaace-1min/AldersfordelingChart.tsx`**
   - Demografi visualisering (pyramid chart)
   - Input: `AldersfordelingData`
   - Output: Interaktiv bar chart med mann/kvinne

2. **`src/components/plaace-1min/KorthandelTidsserieChart.tsx`**
   - Tidsserie graf (line chart)
   - Input: `KorthandelData`
   - Output: Multi-line chart (mat_opplevelser, handel, tjenester)

3. **`src/components/plaace-1min/BevegelseChart.tsx`**
   - Bevegelsesmønster visualisering
   - Input: `BevegelseData`
   - Output: (bestemmes etter å se data)

4. **`src/components/plaace-1min/KonkurransebildeChart.tsx`**
   - Konkurransevisualisering
   - Input: `KonkurransebildeData`
   - Output: (bestemmes etter å se data)

5. **`src/components/plaace-1min/AktorerList.tsx`**
   - Liste over næringsaktører
   - Input: `AktorData`
   - Output: Tabell eller grid med aktører

### FASE 5: Main Viewer Component
**Oppgave:** Lage hovedkomponent for 1min analyse

**Fil:** `src/components/plaace-1min/OneMinAnalysisViewer.tsx`

```typescript
'use client';

interface OneMinAnalysisViewerProps {
  data: OneMinAnalysisData;
  kartImage: string;
}

export default function OneMinAnalysisViewer({
  data,
  kartImage
}: OneMinAnalysisViewerProps) {
  return (
    <div className="space-y-8">
      {/* Kart */}
      <section>
        <h3 className="text-xl font-bold mb-4">1-minutts område</h3>
        <Image src={kartImage} alt="1min kart" ... />
      </section>

      {/* Demografi */}
      <section>
        <h3 className="text-xl font-bold mb-4">Aldersfordeling</h3>
        <AldersfordelingChart data={data.demografi} />
      </section>

      {/* Korthandel */}
      <section>
        <h3 className="text-xl font-bold mb-4">Korthandelutvikling</h3>
        <KorthandelTidsserieChart data={data.korthandel} />
      </section>

      {/* Bevegelse */}
      <section>
        <h3 className="text-xl font-bold mb-4">Bevegelsesmønster</h3>
        <BevegelseChart data={data.bevegelse} />
      </section>

      {/* Konkurransebilde */}
      <section>
        <h3 className="text-xl font-bold mb-4">Konkurransebilde</h3>
        <KonkurransebildeChart data={data.konkurransebilde} />
      </section>

      {/* Aktører */}
      <section>
        <h3 className="text-xl font-bold mb-4">Næringsaktører</h3>
        <AktorerList data={data.aktorer} />
      </section>
    </div>
  );
}
```

### FASE 6: Integrere i Property Page
**Oppgave:** Oppdatere property page til å vise 1min data

**Fil:** `src/app/spabo/eiendommer/[id]/page.tsx`

**Endringer:**
1. Load 1min data hvis det finnes
2. Pass data til `AnalyseSelector` eller ny komponent
3. Conditional rendering basert på om data finnes

**Eksempel:**
```typescript
export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  const eiendom = await loadEiendom(id);

  // Load 1min data if available
  const oneMinData = await load1MinAnalysisData('spabo', id);

  return (
    <>
      {/* ... existing code ... */}

      <AnalyseSelector
        plaaceData={eiendom.plaaceData}
        plaaceAnalyses={eiendom.plaaceAnalyses}
        oneMinData={oneMinData} // NEW
      />
    </>
  );
}
```

### FASE 7: Oppdatere AnalyseSelector
**Oppgave:** Utvide `AnalyseSelector` til å håndtere 1min data

**Fil:** `src/components/property/AnalyseSelector.tsx`

**Endringer:**
```typescript
interface AnalyseSelectorProps {
  plaaceData?: PlaaceData;
  plaaceAnalyses?: PlaaceAnalyse[];
  oneMinData?: OneMinAnalysisData; // NEW
}

// Inne i komponenten:
if (currentAnalyse.id === '1min-gange' && oneMinData) {
  return (
    <OneMinAnalysisViewer
      data={oneMinData}
      kartImage="/images/spabo/sofienberggata-6/1min-kart.png"
    />
  );
}
```

---

## 🔍 DETALJERT UNDERSØKELSE SOM TRENGS

Før implementering må vi:

1. **Analysere alle JSON-filer** for å forstå nøyaktig datastruktur
2. **Finne originale komponenter** i backup-prosjekt for å se hvordan de var implementert
3. **Sjekke om Recharts er installert**, evt installere det
4. **Se på styling** fra originalt prosjekt

---

## 📦 DEPENDENCIES

**Må sjekkes/installeres:**
- `recharts` - For charts/grafer
- `date-fns` - For datoformattering (sannsynligvis allerede installert)

**Kommando:**
```bash
npm install recharts
```

---

## ⚙️ KONFIGURASJON

**Oppdater `sofienberggata-6.json`:**

I `plaaceAnalyses` arrayet, legg til flag for 1min data:
```json
{
  "id": "1min-gange",
  "tittel": "1 minutt gange",
  "beskrivelse": "...",
  "hasInteractiveData": true,  // NEW FLAG
  "dataPath": "/spabo/sofienberggata-6/1min",  // NEW
  ...
}
```

---

## 🧪 TESTING PLAN

1. **Test data loading** - Verifiser at alle JSON-filer laster korrekt
2. **Test hver komponent** - Sjekk at hver chart/graf renderer riktig
3. **Test switching** - Verifiser at bytte mellom 5min og 1min fungerer
4. **Test responsivt** - Sjekk på mobile, tablet, desktop
5. **Test performance** - Sjekk at charts ikke lagger

---

## 🎨 STYLING CONSIDERATIONS

- Konsistent med eksisterende design (lokka-primary, lokka-secondary)
- Charts skal ha samme rounding/shadows som resten av siden
- Hover-states på charts
- Loading states mens data hentes
- Error states hvis data mangler

---

## 📝 DOKUMENTASJON SOM TRENGS

Etter implementering:
- Oppdater README med info om 1min analyser
- Dokumentere hvordan man legger til nye 1min analyser
- Type definitions dokumentert i koden
- Kommentarer på komplekse visualiseringer

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Alle JSON-filer kopiert og verifisert
- [ ] TypeScript types definert
- [ ] Loader funksjoner implementert
- [ ] Alle chart-komponenter laget og testet
- [ ] OneMinAnalysisViewer komponent ferdig
- [ ] Property page integrert
- [ ] AnalyseSelector oppdatert
- [ ] Responsivt design verifisert
- [ ] Performance testet
- [ ] Error handling implementert
- [ ] Dokumentasjon oppdatert

---

## 💡 ALTERNATIV TILNÆRMING

**Hvis visualiseringer er for komplekse:**
Kan vurdere å bruke static screenshots generert fra dataene i stedet for live charts. Dette ville forenkle implementeringen betydelig men miste interaktivitet.

---

## 📌 NESTE STEG

1. **Les alle JSON-filer** for å forstå nøyaktig struktur
2. **Finn og analyser originale komponenter** i backup
3. **Start med Fase 1** (Data Migration)
4. **Implementer én chart om gangen** og test underveis

---

**Status:** 📋 KLAR FOR IMPLEMENTERING
**Neste sesjon:** Start med Fase 1 - Data Migration

*Opprettet: 20. november 2025 01:30*
*Sist oppdatert: 20. november 2025 01:30*
