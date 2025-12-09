# Properties Requiring Research

> Last Updated: December 9, 2025
> Total Properties: 44 | Need Research: 28

---

## Priority Legend

| Priority | Description |
|----------|-------------|
| **HIGH** | Missing critical data (næringsaktører, demographics, core metrics) |
| **MEDIUM** | Missing secondary data (byggeår, vernestatus, historical context) |
| **LOW** | Minor gaps (contact info, additional images, notes) |

---

## HIGH PRIORITY

### Carucel (1 property)

#### Olaf Ryes plass 4
- **Status:** GOOD (missing specific fields)
- **Missing Data:**
  - `nokkeldata.byggeaar` - Building year
  - `nokkeldata.areal` - Total area m²
  - `nokkeldata.energimerke` - Energy rating
  - `nokkeldata.arbeidsledighet` - Local unemployment rate
- **Research Sources:**
  - Oslo Byarkiv for building records
  - Enova energimerkeregister
  - SSB for local statistics

---

### Malling & Co (1 property)

#### Markveien 35 (Front Real Estate)
- **Status:** BASIC
- **Missing Data:**
  - All `nokkeldata` fields empty
  - `plaaceData` screenshots missing
  - Demographics incomplete
  - Næringsaktører limited data
- **Research Sources:**
  - Plaace.co for area analysis
  - Kartverket for property details
  - Proff.no for business actors

---

### Roger Vodal (3 properties)

#### Markveien 48
- **Status:** GOOD (profile complete, data gaps)
- **Missing Data:**
  - `plaaceData.nokkeldata` - All market metrics
  - `plaaceData.demografi` - Population data
  - `plaaceData.marked` - Market analysis
  - Current tenant verification
- **Research Sources:**
  - Plaace 1-min analysis needed
  - SSB demografi data
  - Finn.no for comparable rents

#### Markveien 53
- **Status:** GOOD (same gaps as Markveien 48)
- **Missing Data:**
  - Same as Markveien 48
- **Research Sources:**
  - Same as above

#### Thorvald Meyersgate 44
- **Status:** GOOD (same gaps)
- **Missing Data:**
  - Same as Markveien 48
- **Research Sources:**
  - Same as above

---

### SiO (3 properties)

#### Brenneriveien 11
- **Status:** GOOD (profile complete, data gaps)
- **Missing Data:**
  - `plaaceData` - No Plaace analysis
  - `nokkeldata.prisniva` - Price level
  - `nokkeldata.leieinntekter` - Rental income
  - Student capacity numbers (verify 80 units)
- **Research Sources:**
  - SiO official property database
  - Student housing statistics
  - OsloMet campus planning docs

#### Marselis gate 24
- **Status:** GOOD (same pattern)
- **Missing Data:**
  - Same as Brenneriveien 11
  - Verify student unit count (40 units claimed)
- **Research Sources:**
  - Same as above

#### Trondheimsveien 25-29
- **Status:** GOOD (same pattern)
- **Missing Data:**
  - Same as Brenneriveien 11
  - Verify 120 student units
  - Building year verification
- **Research Sources:**
  - Same as above

---

### Eiendomsspar (2 properties)

#### Nedre Foss Gård (Mathallen)
- **Status:** COMPLETE (minor gaps)
- **Missing Data:**
  - `nokkeldata.prisniva` - Current price level
  - `nokkeldata.leieinntekter` - Rental rates
  - Updated Mathallen tenant list
- **Research Sources:**
  - Mathallen.no official site
  - Eiendomsspar årsrapport
  - Commercial real estate listings

#### Thorvald Meyers gate 2
- **Status:** COMPLETE (minor gaps)
- **Missing Data:**
  - Same as Nedre Foss Gård
- **Research Sources:**
  - Same as above

---

## MEDIUM PRIORITY

### Brødrene Evensen (3 properties)

#### Thorvaldmeyers gate 18
- **Status:** GOOD
- **Missing Data:**
  - `nokkeldata.byggeaar` - Building year (estimate 1890s)
  - `vernestatus` - Heritage protection status
  - Historical photos
- **Research Sources:**
  - Oslo Byarkiv
  - Byantikvaren verneliste
  - Nasjonalbiblioteket bildearkiv

#### Thorvaldmeyers gate 53
- **Status:** GOOD
- **Missing Data:**
  - Same as TMG 18
- **Research Sources:**
  - Same as above

#### Thorvaldmeyers gate 55
- **Status:** GOOD
- **Missing Data:**
  - Same as TMG 18
- **Research Sources:**
  - Same as above

---

### Spabo (22 properties - selected gaps)

#### Properties with Missing byggeår:
- Fredensborgveien 24
- Grüners gate 6
- Helgesens gate 82
- Korsgata 27
- Markveien 28
- Seilduksgata 25-31
- Seildusgata 32
- Seildusgata 34
- Sofienberggata 7

#### Properties Needing Vernestatus Research:
- Fredensborgveien 24 (pre-1900 building)
- Helgesens gate 82 (historic area)
- Toftes gate 69 (corner property)

---

### Maya Eiendom (4 properties)

#### Markveien 57
- **Status:** BASIC
- **Missing Data:**
  - `naringsaktorer` - Business actor data empty
  - `plaaceData` limited
- **Research Sources:**
  - Plaace analysis needed
  - Proff.no for tenants

#### Other properties (Markveien 54, 56A, 56B)
- **Status:** COMPLETE
- **Minor gaps:** Verify current tenant info

---

### Aspelin Ramm (5 properties)

All properties are COMPLETE status. Minor research needed:
- Verify 2024/2025 tenant changes at Mathallen
- Update Vulkan area development status
- Cross-reference with Plaace 2025 data when available

---

## LOW PRIORITY

### General Research Tasks

1. **All properties:** Verify `gnr`/`bnr` against Kartverket
2. **Historic buildings:** Research Byantikvaren status
3. **Commercial properties:** Update tenant lists annually
4. **Student housing (SiO):** Verify capacity numbers with SiO

---

## Research Sources Quick Reference

| Source | URL | Data Type |
|--------|-----|-----------|
| Kartverket | seeiendom.kartverket.no | Property records, gnr/bnr |
| Oslo Byarkiv | byarkivet.oslo.kommune.no | Historical records |
| Byantikvaren | byantikvaren.oslo.kommune.no | Heritage status |
| Plaace | plaace.co | Area analysis, demographics |
| Proff.no | proff.no | Business information |
| Finn.no | finn.no/realestate | Market comparisons |
| SSB | ssb.no | Demographics, statistics |
| Enova | energimerking.no | Energy certificates |
| SiO | sio.no | Student housing data |

---

## Action Items

### Immediate (This Week)
- [ ] Run Plaace 1-min analysis for Roger Vodal properties
- [ ] Run Plaace 1-min analysis for SiO properties
- [ ] Complete Malling-Co/Markveien 35 nokkeldata

### Short-term (This Month)
- [ ] Research byggeår for 9 Spabo properties
- [ ] Verify vernestatus for historic buildings
- [ ] Update Maya Eiendom/Markveien 57 næringsaktører

### Ongoing
- [ ] Annual tenant verification (all properties)
- [ ] Quarterly Plaace data refresh
- [ ] Update market metrics as available

---

## Notes

- Properties rated COMPLETE may still have minor data gaps
- Plaace analyses should be refreshed annually
- Priority based on data impact for platform functionality
- Some fields (arbeidsledighet, energimerke) are optional enhancements

---

*Generated from Property Profile Audit - December 9, 2025*
