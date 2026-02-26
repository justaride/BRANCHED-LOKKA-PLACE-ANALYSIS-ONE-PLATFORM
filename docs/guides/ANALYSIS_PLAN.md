# COMPREHENSIVE SITE ANALYSIS PLAN
## Pre-Autocompact Checklist & Post-Autocompact Action Plan

**Created:** November 19, 2025
**Autocompact:** Imminent (3% remaining)
**Purpose:** Systematic verification of all 42 properties across 8 developers

---

## 🔍 PHASE 1: DATA STRUCTURE ANALYSIS

### 1.1 JSON Schema Verification
**Goal:** Ensure all property JSON files have complete data structure

**Check for each property:**
- [ ] `id` matches filename
- [ ] `adresse` is present
- [ ] `gnr` and `bnr` exist (can be null)
- [ ] `beskrivelse` is populated
- [ ] `heroImage` path is correct
- [ ] `mapImage` path is correct
- [ ] `coordinates` {lat, lng} exist
- [ ] `plaaceData.rapportDato` is valid date
- [ ] `plaaceData.screenshots[]` array exists
- [ ] `plaaceData.nokkeldata` is populated
- [ ] `tilleggsinfo.historikk` exists (markdown content)
- [ ] `tilleggsinfo.kontaktperson` exists
- [ ] `tilleggsinfo.notater[]` array exists
- [ ] `metadata` is complete

**Script to create:**
```bash
# Verify JSON structure for all properties
for dir in aspelin-ramm sio brodrene-evensen roger-vodal eiendomsspar maya-eiendom malling-co spabo; do
  echo "=== $dir ==="
  for file in src/data/$dir/*.json; do
    # Run jq validation
    jq -e '.id, .adresse, .plaaceData.screenshots' "$file" > /dev/null || echo "MISSING DATA: $file"
  done
done
```

### 1.2 Missing Data Elements
**Known issues:**
- Some properties may have empty `notater[]`
- Some properties may have null `gnr/bnr`
- Some properties may be missing business actors data

**Action:** Create JSON schema validator script

---

## 🖼️ PHASE 2: IMAGE VERIFICATION

### 2.1 Hero Images
**Check:** All properties have working hero images

**Verification script:**
```bash
# Check if all hero images exist
for dir in aspelin-ramm sio brodrene-evensen roger-vodal eiendomsspar maya-eiendom malling-co spabo; do
  for json in src/data/$dir/*.json; do
    hero=$(jq -r '.heroImage' "$json")
    if [ ! -f "public$hero" ]; then
      echo "MISSING HERO: $json -> $hero"
    fi
  done
done
```

### 2.2 Map Images
**Check:** All properties have map images

### 2.3 Plaace Screenshots
**Check:** All 6 standard screenshots exist:
1. Nøkkeldata/Nøkkeltall
2. Demografi
3. Besøkende
4. Bevegelse
5. Korthandel
6. Konkurransebildet

**Expected path pattern:**
`/images/{tenant}/plaace/{property-id}/{screenshot-name}.jpg`

**Verification script:**
```bash
# Check if all Plaace screenshots exist
for dir in aspelin-ramm sio brodrene-evensen roger-vodal eiendomsspar maya-eiendom malling-co spabo; do
  for json in src/data/$dir/*.json; do
    screenshots=$(jq -r '.plaaceData.screenshots[].path' "$json")
    for img in $screenshots; do
      if [ ! -f "public$img" ]; then
        echo "MISSING SCREENSHOT: $json -> $img"
      fi
    done
  done
done
```

---

## 📄 PHASE 3: PAGE RENDERING VERIFICATION

### 3.1 Landing Pages (8 total)
**URLs to test:**
- [ ] http://localhost:3000/aspelin-ramm
- [ ] http://localhost:3000/sio
- [ ] http://localhost:3000/brodrene-evensen
- [ ] http://localhost:3000/roger-vodal
- [ ] http://localhost:3000/eiendomsspar
- [ ] http://localhost:3000/maya-eiendom
- [ ] http://localhost:3000/malling-co
- [ ] http://localhost:3000/spabo

**Elements to verify:**
- [ ] Hero section displays
- [ ] "Se Eiendommer" button works
- [ ] "Om Prosjektet" button (check if page exists)
- [ ] Development notice displays
- [ ] Features cards display
- [ ] Natural State card displays
- [ ] Header with navigation
- [ ] Footer

### 3.2 Property Listings (8 total)
**URLs to test:**
- [ ] /aspelin-ramm/eiendommer
- [ ] /sio/eiendommer
- [ ] /brodrene-evensen/eiendommer
- [ ] /roger-vodal/eiendommer
- [ ] /eiendomsspar/eiendommer
- [ ] /maya-eiendom/eiendommer
- [ ] /malling-co/eiendommer
- [ ] /spabo/eiendommer

**Elements to verify:**
- [ ] All property cards display
- [ ] Hero images load in cards
- [ ] Property addresses display
- [ ] Descriptions display
- [ ] Cards are clickable links
- [ ] Grid layout works (responsive)

### 3.3 Property Detail Pages (42 total)
**Sample to test (minimum):**
- [ ] /aspelin-ramm/eiendommer/bellonabygget
- [ ] /aspelin-ramm/eiendommer/vulkan-arena
- [ ] /sio/eiendommer/brenneriveien-11
- [ ] /brodrene-evensen/eiendommer/thorvaldmeyers-gate-18
- [ ] /roger-vodal/eiendommer/markveien-48
- [ ] /eiendomsspar/eiendommer/nedre-foss-gard
- [ ] /maya-eiendom/eiendommer/hausmannsgate-19
- [ ] /malling-co/eiendommer/markveien-35
- [ ] /spabo/eiendommer/brenneriveien-5

**Elements to verify:**
- [ ] Hero section with gradient background
- [ ] Property address as heading
- [ ] Description text
- [ ] Gnr/Bnr badge (if available)
- [ ] Report date badge
- [ ] Hero image (right side)
- [ ] "Tilbake til oversikt" link works
- [ ] Key Metrics section displays
- [ ] Google Maps embed loads
- [ ] Map image displays (if available)
- [ ] Location description
- [ ] Eiendomsprofil expander (markdown content)
- [ ] Plaace Analytics selector
- [ ] All 6 screenshot tabs work
- [ ] Screenshots load correctly

---

## ⚠️ PHASE 4: KNOWN ISSUES TO FIX

### 4.1 Missing Elements in JSON
**Issue:** Some properties missing business actors data
**Example fields that may be missing:**
```json
{
  "næringsaktører": {
    "antall": 73,
    "liste": ["Mathallen Oslo", "Dansens Hus", "Vulkan Arena", ...]
  }
}
```

**Action:** 
1. Check original backup projects for this data
2. Update JSON schema to include optional business actors
3. Update PropertyDetail page to conditionally display this section

### 4.2 Missing Images
**Issue:** Some hero images or screenshots may not exist
**Action:**
1. Run image verification script
2. Copy missing images from backup projects
3. Update paths if needed
4. Create placeholder images for missing ones

### 4.3 Broken Links / Dead Links
**Issue:** User reports property detail links not working
**Possible causes:**
- ID mismatch between JSON and filename
- Incorrect hrefs in listing page
- Loader not finding files

**Debug steps:**
```typescript
// In eiendommer/page.tsx - verify href construction
href={`/{tenant}/eiendommer/${eiendom.id}`}

// Ensure eiendom.id matches filename (without .json)
// Check loader getAllPropertyIds() returns correct IDs
```

### 4.4 Missing om-prosjektet Pages
**Issue:** 6/8 developers missing this page
**Files to create:**
- [ ] /brodrene-evensen/om-prosjektet/page.tsx
- [ ] /roger-vodal/om-prosjektet/page.tsx
- [ ] /eiendomsspar/om-prosjektet/page.tsx
- [ ] /maya-eiendom/om-prosjektet/page.tsx
- [ ] /malling-co/om-prosjektet/page.tsx
- [ ] /spabo/om-prosjektet/page.tsx

**Template:** Use Aspelin Ramm's version as template

---

## 🛠️ PHASE 5: AUTOMATED TESTING SCRIPTS

### 5.1 Image Checker Script
```bash
#!/bin/bash
# check-images.sh - Verify all images exist

echo "=== CHECKING IMAGES ==="
missing=0

for tenant in aspelin-ramm sio brodrene-evensen roger-vodal eiendomsspar maya-eiendom malling-co spabo; do
  echo "Checking $tenant..."
  
  for json in src/data/$tenant/*.json; do
    [ ! -f "$json" ] && continue
    
    # Check hero image
    hero=$(jq -r '.heroImage' "$json" 2>/dev/null)
    if [ ! -f "public$hero" ]; then
      echo "  ❌ MISSING HERO: $json -> $hero"
      ((missing++))
    fi
    
    # Check map image
    map=$(jq -r '.mapImage' "$json" 2>/dev/null)
    if [ ! -f "public$map" ] && [ "$map" != "null" ]; then
      echo "  ⚠️  MISSING MAP: $json -> $map"
    fi
    
    # Check screenshots
    jq -r '.plaaceData.screenshots[]?.path' "$json" 2>/dev/null | while read img; do
      if [ ! -f "public$img" ]; then
        echo "  ❌ MISSING SCREENSHOT: $json -> $img"
        ((missing++))
      fi
    done
  done
done

echo ""
echo "Total missing images: $missing"
```

### 5.2 JSON Validator Script
```bash
#!/bin/bash
# validate-json.sh - Check JSON structure

for tenant in aspelin-ramm sio brodrene-evensen roger-vodal eiendomsspar maya-eiendom malling-co spabo; do
  echo "=== $tenant ==="
  
  for json in src/data/$tenant/*.json; do
    [ ! -f "$json" ] && continue
    
    # Validate required fields
    if ! jq -e '.id and .adresse and .plaaceData.screenshots' "$json" > /dev/null 2>&1; then
      echo "❌ INCOMPLETE: $json"
    else
      echo "✅ $(basename $json)"
    fi
  done
done
```

### 5.3 Route Tester Script
```bash
#!/bin/bash
# test-routes.sh - Test all routes return 200

BASE_URL="http://localhost:3000"

echo "Testing landing pages..."
for tenant in aspelin-ramm sio brodrene-evensen roger-vodal eiendomsspar maya-eiendom malling-co spabo; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$tenant")
  echo "$tenant: $status"
done

echo ""
echo "Testing property listings..."
for tenant in aspelin-ramm sio brodrene-evensen roger-vodal eiendomsspar maya-eiendom malling-co spabo; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$tenant/eiendommer")
  echo "$tenant/eiendommer: $status"
done
```

---

## 📋 POST-AUTOCOMPACT ACTION ITEMS

### Immediate (Priority 1)
1. ✅ Run image checker script
2. ✅ Identify all missing images
3. ✅ Copy missing images from backups
4. ✅ Fix broken property detail links
5. ✅ Verify loader functions return correct data

### Short-term (Priority 2)
6. ✅ Create om-prosjektet pages for 6 developers
7. ✅ Add business actors data to JSON files
8. ✅ Test all 42 property detail pages
9. ✅ Fix any remaining image path issues

### Medium-term (Priority 3)
10. ✅ Create comprehensive test suite
11. ✅ Add error boundaries for missing data
12. ✅ Implement loading states
13. ✅ Add 404 pages for invalid properties

### Long-term (Priority 4)
14. ✅ Performance optimization
15. ✅ SEO improvements
16. ✅ Accessibility audit
17. ✅ Deploy to Coolify

---

## 📊 VERIFICATION CHECKLIST

### Data Completeness
- [ ] All 42 properties have complete JSON data
- [ ] All properties have hero images
- [ ] All properties have Plaace screenshots (6 each = 252 images)
- [ ] All properties have coordinates
- [ ] All properties have historikk content

### Functionality
- [ ] All 8 landing pages load
- [ ] All 8 listing pages load
- [ ] All 42 detail pages load
- [ ] All links work (no 404s)
- [ ] All images load (no broken images)
- [ ] All maps render
- [ ] All Plaace screenshot tabs work

### User Experience
- [ ] Navigation works across all pages
- [ ] Back buttons work
- [ ] Responsive design works on mobile
- [ ] Loading states are appropriate
- [ ] Error handling is graceful

---

## 🚀 EXECUTION PLAN

**Step 1:** Run automated scripts to identify issues
**Step 2:** Create prioritized fix list
**Step 3:** Fix critical issues (broken links, missing images)
**Step 4:** Fix nice-to-have issues (missing pages, additional data)
**Step 5:** Comprehensive manual testing
**Step 6:** Document any remaining issues
**Step 7:** Deploy to staging

---

**Status:** Ready for post-autocompact execution
**Estimated Time:** 2-3 hours for complete analysis and fixes
**Owner:** Session 5
