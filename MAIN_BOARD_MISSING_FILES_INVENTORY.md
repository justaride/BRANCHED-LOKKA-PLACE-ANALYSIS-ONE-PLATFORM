# COMPREHENSIVE MISSING DATA INVENTORY
## Main Board Stedsanalyser - Complete File Audit

**Generated:** 2025-11-26
**Total Analyses:** 6
**Total Expected Files:** 150 (25 files × 6 analyses)
**Total Present:** 130 files
**Total Missing:** 20 files
**Completion Rate:** 86.7%

---

## SECTION 1: COMPLETE FILE INVENTORY

### Analysis Directory Structure

```
main-board/
├── ovre-thorvald-meyers-gate/          (21 files - MISSING: nokkeldata.json + visitor-origins image)
├── nedre-thorvald-meyers-gate/         (25 files - MISSING: besokende data + visitor-origins image)
├── midt-i-markveien/                   (20 files - MISSING: antall-husholdninger.json)
├── olaf-ryes-plass-7eleven/            (20 files - MISSING: 3 data files)
├── olaf-ryes-plass-boots/              (19 files - MISSING: 4 data files)
└── nederst-i-markveien/                (21 files - MISSING: 7 data files, different naming convention)
```

### File Structure Per Analysis

#### 1. Øvre Thorvald Meyers Gate (21/22 files - 95.5%)

```
ovre-thorvald-meyers-gate/
├── ✗ nokkeldata.json                              [MISSING - CRITICAL]
├── ✓ conversion-summary.json
├── ✓ README.json
├── besokende/
│   └── ✓ omrader-besokende-kommer-fra.json
├── bevegelse/
│   ├── ✓ besok-per-time.json
│   ├── ✓ besok-per-ukedag.json
│   └── ✓ bevegelsesmonster.json
├── demografi/
│   ├── ✓ aldersfordeling.json
│   ├── ✓ antall-hus.json
│   ├── ✓ antall-husholdninger.json
│   ├── ✓ demografi-over-tid.json
│   ├── ✓ inntektsfordeling.json
│   └── ✓ medianinntekt-per-husholdningstype.json
├── internasjonalt/
│   └── ✓ topp-20-land.json
├── konkurransebilde/
│   ├── ✓ kjeder-vs-uavhengige.json
│   ├── ✓ konseptmiks.json
│   ├── ✓ over-og-underandel-vs-kommune.json
│   └── ✓ utvikling-per-ar.json
└── korthandel/
    ├── ✓ arlig-vekst.json
    ├── ✓ indeksert-vekst.json
    ├── ✓ korthandel-per-ukedag.json
    └── ✓ korthandel-tidsrom.json

Images:
├── ✓ ovre-thorvald-meyers-gate-aerial.png
├── ✓ ovre-thorvald-meyers-gate-aerial-zoom.png
├── ✓ ovre-thorvald-meyers-gate-heatmap.png
├── ✓ ovre-thorvald-meyers-gate-streetmap.png
└── ✗ ovre-thorvald-meyers-gate-visitor-origins.png    [MISSING - HIGH]
```

#### 2. Nedre Thorvald Meyers Gate (25/26 files - 96.2%)

```
nedre-thorvald-meyers-gate/
├── ✓ nokkeldata.json
├── ✓ conversion-summary.json
├── besokende/
│   ├── ✓ antall-hus.json
│   ├── ✓ besokende-demografi.json
│   ├── ✓ husholdningstypefordeling.json
│   ├── ✓ inntektsfordeling.json
│   ├── ✓ medianinntekt-per-husholdningstype.json
│   └── ✗ omrader-besokende-kommer-fra.json           [MISSING - HIGH]
├── bevegelse/
│   ├── ✓ besok-per-time.json
│   ├── ✓ besok-per-ukedag.json
│   └── ✓ bevegelsesmonster.json
├── demografi/
│   ├── ✓ aldersfordeling.json
│   ├── ✓ antall-hus.json
│   ├── ✓ antall-husholdninger.json
│   ├── ✓ demografi-over-tid.json
│   ├── ✓ inntektsfordeling.json
│   └── ✓ medianinntekt-per-husholdningstype.json
├── internasjonalt/
│   └── ✓ topp-20-land.json
├── konkurransebilde/
│   ├── ✓ kjeder-vs-uavhengige.json
│   ├── ✓ konseptmiks.json
│   ├── ✗ over-og-underandel-vs-kommune.json          [MISSING - MEDIUM]
│   │   (File exists as: over-underandel-vs-kommune.json - naming inconsistency)
│   └── ✓ utvikling-per-ar.json
└── korthandel/
    ├── ✓ arlig-vekst.json
    ├── ✓ indeksert-vekst.json
    ├── ✓ korthandel-per-ukedag.json
    └── ✓ korthandel-tidsrom.json

Images:
├── ✓ nedre-thorvald-meyers-gate-aerial.png
├── ✓ nedre-thorvald-meyers-gate-aerial-zoom.png
├── ✓ nedre-thorvald-meyers-gate-heatmap.png
├── ✓ nedre-thorvald-meyers-gate-streetmap.png
└── ✗ nedre-thorvald-meyers-gate-visitor-origins.png  [MISSING - HIGH]
```

#### 3. Midt i Markveien (20/21 files - 95.2%)

```
midt-i-markveien/
├── ✓ nokkeldata.json
├── ✓ conversion-summary.json
├── besokende/
│   └── ✓ omrader-besokende-kommer-fra.json
├── bevegelse/
│   ├── ✓ besok-per-time.json
│   ├── ✓ besok-per-ukedag.json
│   └── ✓ bevegelsesmonster.json
├── demografi/
│   ├── ✓ aldersfordeling.json
│   ├── ✓ antall-hus.json
│   ├── ✗ antall-husholdninger.json                   [MISSING - MEDIUM]
│   ├── ✓ demografi-over-tid.json
│   ├── ✓ inntektsfordeling.json
│   └── ✓ medianinntekt-per-husholdningstype.json
├── internasjonalt/
│   └── ✓ topp-20-land.json
├── konkurransebilde/
│   ├── ✓ kjeder-vs-uavhengige.json
│   ├── ✓ konseptmiks.json
│   ├── ✓ over-og-underandel-vs-kommune.json
│   └── ✓ utvikling-per-ar.json
└── korthandel/
    ├── ✓ arlig-vekst.json
    ├── ✓ indeksert-vekst.json
    ├── ✓ korthandel-per-ukedag.json
    └── ✓ korthandel-tidsrom.json

Images:
├── ✓ midt-i-markveien-aerial.png
├── ✓ midt-i-markveien-heatmap.png
├── ✓ midt-i-markveien-map.png
└── ✓ midt-i-markveien-visitor-origins.png
```

#### 4. Olaf Ryes Plass 7Eleven (20/24 files - 83.3%)

```
olaf-ryes-plass-7eleven/
├── ✓ nokkeldata.json
├── ✓ conversion-summary.json
├── besokende/
│   └── ✗ omrader-besokende-kommer-fra.json           [MISSING - HIGH]
├── bevegelse/
│   ├── ✓ besok-per-time.json
│   ├── ✓ besok-per-ukedag.json
│   └── ✓ bevegelsesmonster.json
├── demografi/
│   ├── ✓ aldersfordeling.json
│   ├── ✓ antall-hus.json
│   ├── ✓ antall-husholdninger.json
│   ├── ✓ demografi-over-tid.json
│   ├── ✓ inntektsfordeling.json
│   └── ✓ medianinntekt-per-husholdningstype.json
├── internasjonalt/
│   └── ✓ topp-20-land.json
├── konkurransebilde/
│   ├── ✓ kjeder-vs-uavhengige.json
│   ├── ✓ konseptmiks.json
│   ├── ✗ over-og-underandel-vs-kommune.json          [MISSING - MEDIUM]
│   │   (File exists as: over-og-underandel.json - naming inconsistency)
│   └── ✓ utvikling-per-ar.json
└── korthandel/
    ├── ✓ arlig-vekst.json
    ├── ✓ indeksert-vekst.json
    ├── ✓ korthandel-per-ukedag.json
    ├── ✓ korthandel-i-valgt-tidsrom.json
    └── ✗ korthandel-tidsrom.json                      [MISSING - MEDIUM]

Images:
├── ✓ olaf-ryes-plass-7eleven-aerial.png
├── ✓ olaf-ryes-plass-7eleven-heatmap.png
├── ✓ olaf-ryes-plass-7eleven-map.png
└── ✓ olaf-ryes-plass-7eleven-visitor-origins.png
```

#### 5. Olaf Ryes Plass Boots (19/24 files - 79.2%)

```
olaf-ryes-plass-boots/
├── ✓ nokkeldata.json
├── ✓ conversion-summary.json
├── besokende/
│   └── ✗ omrader-besokende-kommer-fra.json           [MISSING - HIGH]
├── bevegelse/
│   ├── ✓ besok-per-time.json
│   ├── ✓ besok-per-ukedag.json
│   └── ✓ bevegelsesmonster.json
├── demografi/
│   ├── ✗ aldersfordeling.json                        [MISSING - MEDIUM]
│   ├── ✓ antall-hus.json
│   ├── ✓ antall-husholdninger.json
│   ├── ✓ demografi-over-tid.json
│   ├── ✓ inntektsfordeling.json
│   └── ✓ medianinntekt-per-husholdningstype.json
├── internasjonalt/
│   └── ✓ topp-20-land.json
├── konkurransebilde/
│   ├── ✓ kjeder-vs-uavhengige.json
│   ├── ✓ konseptmiks.json
│   ├── ✗ over-og-underandel-vs-kommune.json          [MISSING - MEDIUM]
│   │   (File exists as: over-og-underandel.json - naming inconsistency)
│   └── ✓ utvikling-per-ar.json
└── korthandel/
    ├── ✓ arlig-vekst.json
    ├── ✓ indeksert-vekst.json
    ├── ✓ korthandel-per-ukedag.json
    ├── ✓ korthandel-i-valgt-tidsrom.json
    └── ✗ korthandel-tidsrom.json                      [MISSING - MEDIUM]

Images:
├── ✓ olaf-ryes-plass-boots-aerial.png
├── ✓ olaf-ryes-plass-boots-heatmap.png
├── ✓ olaf-ryes-plass-boots-map.png
└── ✓ olaf-ryes-plass-boots-visitor-origins.png
```

#### 6. Nederst i Markveien (21/28 files - 75.0%)

**NOTE:** This analysis uses different file naming conventions in several categories.

```
nederst-i-markveien/
├── ✓ nokkeldata.json
├── ✓ conversion-summary.json
├── besokende/
│   └── (No besokende/ folder - file is in bevegelse/)
├── bevegelse/
│   ├── ✗ besok-per-time.json                         [MISSING - HIGH]
│   │   (File exists as: besok-per-time-i-tidsperioden-daglig-gjennomsnitt.json)
│   ├── ✗ besok-per-ukedag.json                       [MISSING - HIGH]
│   │   (File exists as: besok-per-ukedag-i-tidsperioden-daglig-gjennomsnitt.json)
│   ├── ✗ bevegelsesmonster.json                      [MISSING - HIGH]
│   │   (File exists as: bevegelsesmonster-gjennomsnittlig-daglige-besok.json)
│   └── ✓ omrader_besokende_kommer_fra.json (alternative location)
├── demografi/
│   ├── ✓ aldersfordeling.json
│   ├── ✓ antall-hus.json
│   ├── ✓ antall-husholdninger.json
│   ├── ✓ demografi-over-tid.json
│   ├── ✓ inntektsfordeling.json
│   └── ✓ medianinntekt-per-husholdningstype.json
├── internasjonalt/
│   └── ✗ topp-20-land.json                           [MISSING - MEDIUM]
│       (File exists as: topp-20-land-besokende-til-omradet-i.json)
├── konkurransebilde/
│   ├── ✗ kjeder-vs-uavhengige.json                   [MISSING - MEDIUM]
│   │   (File exists as: kjeder-vs-uavhengige-konsepter.json)
│   ├── ✓ konseptmiks.json
│   ├── ✓ over-og-underandel-vs-kommune.json
│   └── ✓ utvikling-per-ar.json
└── korthandel/
    ├── ✓ arlig-vekst.json
    ├── ✗ indeksert-vekst.json                        [MISSING - MEDIUM]
    │   (File exists as: indeksert-vekst-indeks-100.json)
    ├── ✓ korthandel-per-ukedag.json
    ├── ✓ korthandel-i-valgt-tidsrom.json
    └── ✗ korthandel-tidsrom.json                      [MISSING - MEDIUM]

Images:
├── ✓ nederst-i-markveien-aerial.png
├── ✓ nederst-i-markveien-heatmap.png
├── ✓ nederst-i-markveien-map.png
└── ✓ nederst-i-markveien-visitor-origins.png
```

---

## SECTION 2: MISSING DATA BY ANALYSIS

### Summary Table

| Analysis | Total Files | Present | Missing | Completion |
|----------|-------------|---------|---------|------------|
| Øvre Thorvald Meyers Gate | 25 | 23 | 2 | 92.0% |
| Nedre Thorvald Meyers Gate | 25 | 22 | 3 | 88.0% |
| Midt i Markveien | 25 | 24 | 1 | 96.0% |
| Olaf Ryes Plass 7Eleven | 25 | 21 | 4 | 84.0% |
| Olaf Ryes Plass Boots | 25 | 20 | 5 | 80.0% |
| Nederst i Markveien | 25 | 18 | 7 | 72.0% |
| **TOTAL** | **150** | **128** | **22** | **85.3%** |

### Detailed Missing Files

#### Øvre Thorvald Meyers Gate (2 missing)
- ✗ nokkeldata.json (CRITICAL)
- ✗ Images: visitor-origins.png

#### Nedre Thorvald Meyers Gate (3 missing)
- ✗ besokende/omrader-besokende-kommer-fra.json
- ✗ konkurransebilde/over-og-underandel-vs-kommune.json (exists as "over-underandel-vs-kommune.json")
- ✗ Images: visitor-origins.png

#### Midt i Markveien (1 missing)
- ✗ demografi/antall-husholdninger.json

#### Olaf Ryes Plass 7Eleven (4 missing)
- ✗ besokende/omrader-besokende-kommer-fra.json
- ✗ konkurransebilde/over-og-underandel-vs-kommune.json (exists as "over-og-underandel.json")
- ✗ korthandel/korthandel-tidsrom.json (has "korthandel-i-valgt-tidsrom.json" instead)

#### Olaf Ryes Plass Boots (5 missing)
- ✗ besokende/omrader-besokende-kommer-fra.json
- ✗ demografi/aldersfordeling.json
- ✗ konkurransebilde/over-og-underandel-vs-kommune.json (exists as "over-og-underandel.json")
- ✗ korthandel/korthandel-tidsrom.json (has "korthandel-i-valgt-tidsrom.json" instead)

#### Nederst i Markveien (7 missing - NAMING INCONSISTENCIES)
**Note:** This analysis has data but with different naming conventions
- ✗ bevegelse/besok-per-time.json (exists as "besok-per-time-i-tidsperioden-daglig-gjennomsnitt.json")
- ✗ bevegelse/besok-per-ukedag.json (exists as "besok-per-ukedag-i-tidsperioden-daglig-gjennomsnitt.json")
- ✗ bevegelse/bevegelsesmonster.json (exists as "bevegelsesmonster-gjennomsnittlig-daglige-besok.json")
- ✗ internasjonalt/topp-20-land.json (exists as "topp-20-land-besokende-til-omradet-i.json")
- ✗ konkurransebilde/kjeder-vs-uavhengige.json (exists as "kjeder-vs-uavhengige-konsepter.json")
- ✗ korthandel/indeksert-vekst.json (exists as "indeksert-vekst-indeks-100.json")
- ✗ korthandel/korthandel-tidsrom.json (has "korthandel-i-valgt-tidsrom.json" instead)

---

## SECTION 3: MISSING DATA BY CATEGORY

### Root Files
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| nokkeldata.json | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| conversion-summary.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

### Demografi Files
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| aldersfordeling.json | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| antall-hus.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| antall-husholdninger.json | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| demografi-over-tid.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| inntektsfordeling.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| medianinntekt-per-husholdningstype.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

### Bevegelse Files
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| besok-per-time.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✗* |
| besok-per-ukedag.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✗* |
| bevegelsesmonster.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✗* |

*Different naming in NiM

### Besokende Files
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| omrader-besokende-kommer-fra.json | ✓ | ✗ | ✓ | ✗ | ✗ | ✓** |

**In bevegelse/ folder in NiM

### Korthandel Files
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| arlig-vekst.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| indeksert-vekst.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✗* |
| korthandel-per-ukedag.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| korthandel-tidsrom.json | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |

*Different naming in NiM

### Konkurransebilde Files
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| kjeder-vs-uavhengige.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✗* |
| konseptmiks.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| over-og-underandel-vs-kommune.json | ✓ | ✗** | ✓ | ✗** | ✗** | ✓ |
| utvikling-per-ar.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*Different naming in NiM
**Different naming in NTMG, ORP7, ORPB

### Internasjonalt Files
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| topp-20-land.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✗* |

*Different naming in NiM

### Images
| File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM |
|------|------|------|-----|------|------|-----|
| aerial.png | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| heatmap.png | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| map.png | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| visitor-origins.png | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ |

---

## SECTION 4: CONSOLIDATED CHECKLIST

### File Types Matrix (6 analyses × 25 expected files each)

```
LEGEND:
✓ = Present
✗ = Missing
~ = Present with different naming
```

#### Data Files (21 files per analysis)

| Category | File | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM | Status |
|----------|------|------|------|-----|------|------|-----|--------|
| **ROOT** |
| | nokkeldata.json | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | 5/6 |
| | conversion-summary.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| **DEMOGRAFI** |
| | aldersfordeling.json | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | 5/6 |
| | antall-hus.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| | antall-husholdninger.json | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | 5/6 |
| | demografi-over-tid.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| | inntektsfordeling.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| | medianinntekt-per-husholdningstype.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| **BEVEGELSE** |
| | besok-per-time.json | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | 5/6 |
| | besok-per-ukedag.json | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | 5/6 |
| | bevegelsesmonster.json | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | 5/6 |
| **BESOKENDE** |
| | omrader-besokende-kommer-fra.json | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | 3/6 |
| **KORTHANDEL** |
| | arlig-vekst.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| | indeksert-vekst.json | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | 5/6 |
| | korthandel-per-ukedag.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| | korthandel-tidsrom.json | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | 3/6 |
| **KONKURRANSEBILDE** |
| | kjeder-vs-uavhengige.json | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | 5/6 |
| | konseptmiks.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| | over-og-underandel-vs-kommune.json | ✓ | ~ | ✓ | ~ | ~ | ✓ | 2/6 |
| | utvikling-per-ar.json | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| **INTERNASJONALT** |
| | topp-20-land.json | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | 5/6 |

#### Images (4 files per analysis)

| Image | ØTMG | NTMG | MiM | ORP7 | ORPB | NiM | Status |
|-------|------|------|-----|------|------|-----|--------|
| aerial.png | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| heatmap.png | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| map.png | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/6 |
| visitor-origins.png | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | 4/6 |

---

## SECTION 5: PRIORITY ACTION LIST

### CRITICAL Priority (Must have for basic functionality)

1. **Øvre Thorvald Meyers Gate**
   - [ ] Create nokkeldata.json
   - Path: `/Users/gabrielboen/Downloads/lokka-gardeierforening-platform/src/data/main-board/ovre-thorvald-meyers-gate/nokkeldata.json`

### HIGH Priority (Important for complete analysis)

2. **Visitor Origins Data - Missing in 3 analyses**
   - [ ] Nedre Thorvald Meyers Gate: besokende/omrader-besokende-kommer-fra.json
   - [ ] Olaf Ryes Plass 7Eleven: besokende/omrader-besokende-kommer-fra.json
   - [ ] Olaf Ryes Plass Boots: besokende/omrader-besokende-kommer-fra.json

3. **Visitor Origins Images - Missing in 2 analyses**
   - [ ] Create ovre-thorvald-meyers-gate-visitor-origins.png
   - [ ] Create nedre-thorvald-meyers-gate-visitor-origins.png
   - Path: `/Users/gabrielboen/Downloads/lokka-gardeierforening-platform/public/images/analyser/`

### MEDIUM Priority (Data gaps to fill)

4. **Demografi Data**
   - [ ] Midt i Markveien: demografi/antall-husholdninger.json
   - [ ] Olaf Ryes Plass Boots: demografi/aldersfordeling.json

5. **Konkurransebilde - Naming Standardization**
   - [ ] Nedre Thorvald Meyers Gate: Rename "over-underandel-vs-kommune.json" → "over-og-underandel-vs-kommune.json"
   - [ ] Olaf Ryes Plass 7Eleven: Rename "over-og-underandel.json" → "over-og-underandel-vs-kommune.json"
   - [ ] Olaf Ryes Plass Boots: Rename "over-og-underandel.json" → "over-og-underandel-vs-kommune.json"

6. **Korthandel Data**
   - [ ] Olaf Ryes Plass 7Eleven: korthandel/korthandel-tidsrom.json
   - [ ] Olaf Ryes Plass Boots: korthandel/korthandel-tidsrom.json

### LOW Priority (Naming standardization for Nederst i Markveien)

7. **Nederst i Markveien - File Naming Standardization**

   These files exist but with different naming. Consider:
   - Option A: Rename existing files to match standard naming
   - Option B: Create symlinks/copies with standard names
   - Option C: Update code to handle both naming conventions

   Files to standardize:
   - [ ] bevegelse/besok-per-time-i-tidsperioden-daglig-gjennomsnitt.json → besok-per-time.json
   - [ ] bevegelse/besok-per-ukedag-i-tidsperioden-daglig-gjennomsnitt.json → besok-per-ukedag.json
   - [ ] bevegelse/bevegelsesmonster-gjennomsnittlig-daglige-besok.json → bevegelsesmonster.json
   - [ ] internasjonalt/topp-20-land-besokende-til-omradet-i.json → topp-20-land.json
   - [ ] konkurransebilde/kjeder-vs-uavhengige-konsepter.json → kjeder-vs-uavhengige.json
   - [ ] korthandel/indeksert-vekst-indeks-100.json → indeksert-vekst.json
   - [ ] korthandel/korthandel-tidsrom.json (truly missing, unlike others)

---

## SECTION 6: SOURCE DATA LOCATIONS

For data conversion/creation, check these source folders:

### Midt i Markveien
- Source: `/Users/gabrielboen/Downloads/lokka-gardeierforening-platform/src/data/main-board/midt-i-markveien/`
- External: `/Users/gabrielboen/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/Midt i Markveien v: Polet/NØKKELDATA`

### Olaf Ryes Plass (Both analyses)
- Boots External: `/Users/gabrielboen/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/Olaf Ryes PlassV:Boots/Bilder til Analysen`
- 7Eleven External: `/Users/gabrielboen/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/Olaf Ryes Plass V:7Eleven/Bilder til analysen`

---

## SECTION 7: RECOMMENDATIONS

### Immediate Actions
1. Create nokkeldata.json for Øvre Thorvald Meyers Gate (CRITICAL)
2. Generate visitor-origins images for ØTMG and NTMG
3. Create/upload missing visitor origins JSON files (3 analyses)

### Short-term Actions
4. Fill demografi gaps (2 files)
5. Standardize konkurransebilde file naming (3 renames)
6. Create missing korthandel-tidsrom.json files (2 analyses)

### Long-term Considerations
7. Standardize file naming across all analyses
8. Consider creating a data validation script
9. Document naming conventions for future analyses
10. Update Nederst i Markveien to match standard naming conventions

---

## APPENDIX: File Paths Reference

### Data Directories
```
/Users/gabrielboen/Downloads/lokka-gardeierforening-platform/src/data/main-board/
├── ovre-thorvald-meyers-gate/
├── nedre-thorvald-meyers-gate/
├── midt-i-markveien/
├── olaf-ryes-plass-7eleven/
├── olaf-ryes-plass-boots/
└── nederst-i-markveien/
```

### Images Directory
```
/Users/gabrielboen/Downloads/lokka-gardeierforening-platform/public/images/analyser/
```

### External Source Directories
```
/Users/gabrielboen/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/
├── Midt i Markveien v: Polet/NØKKELDATA/
├── Olaf Ryes Plass V:7Eleven/Bilder til analysen/
└── Olaf Ryes PlassV:Boots/Bilder til Analysen/
```

---

**End of Report**
