# Footfall Data Providers - Integration Guide

> Research completed January 2026 for Markveien 35 1-minute analysis enhancement

## Current Data Sources

| Provider      | Data Type                                | Status    | Coverage               |
| ------------- | ---------------------------------------- | --------- | ---------------------- |
| **Plaace.ai** | Card transactions, footfall, competition | ✅ Active | All properties         |
| **Telia**     | Mobile network footfall (via Plaace)     | ✅ Active | ~100m accuracy         |
| **BankAxept** | Transaction data (via Plaace)            | ✅ Active | 49% of Norwegian cards |
| **SSB**       | Demographics                             | ✅ Active | Census data            |

## Data Gaps (Markveien 35)

| Data Type              | Current Status      | Priority |
| ---------------------- | ------------------- | -------- |
| Visitor origins        | ⚠️ Estimated        | High     |
| International visitors | ⚠️ Estimated        | Medium   |
| Dwell time             | ❌ Missing          | Medium   |
| Journey flows          | ❌ Missing          | Low      |
| Real-time updates      | ❌ Quarterly manual | Medium   |

---

## Recommended Providers

### 1. PlaceSense ⭐ TOP RECOMMENDATION

**Website:** https://placesense.ai/

**Coverage:** 47+ European countries including Norway

**What they offer:**

- Europe's largest GPS panel
- 3-meter accuracy (vs ~100m from cell towers)
- Footfall index for benchmarking
- Consumer journey mapping (where from → where to)
- Dwell time analysis
- GDPR-compliant

**Strengths for Løkka:**

- "Hybrid Data Model" combines multiple sources
- SaaS platform + API access
- Can measure visitors, dwell time, origins, destinations

**Pricing:** Enterprise (contact for quote)

**Integration path:**

1. Request demo for Markveien 35 / Grünerløkka area
2. Evaluate data depth vs current Plaace data
3. If better: Build MCP server to query API
4. Add new chart sections (journey flows, dwell time)

---

### 2. Huq Industries

**Website:** https://huq.io/

**Coverage:** 239 countries, strong UK/Europe focus

**What they offer:**

- 100% first-party data via SDK
- Daily footfall monitoring
- 2+ years historical data
- GDPR-compliant API
- H3 hexbin level 12 resolution

**Pricing:**

- £1,000/month starting point
- £375/location for reports
- 3-month evaluation period available

**Strengths:**

- Budget-friendly entry point
- Per-location reports (test before committing)
- Daily data updates

**Integration path:**

1. Purchase single report for Markveien 35 (£375)
2. Evaluate data quality for Oslo/Grünerløkka
3. If good: Subscribe to monthly API
4. Build MCP server for daily updates

---

### 3. Unacast (Norwegian Origin)

**Website:** https://www.unacast.com/

**Note:** Founded in Norway but now primarily US-focused

**What they offer:**

- Consent-based collection
- Ground-truth validation
- Turbine platform (used by Telia)

**Limitation:** Most detailed data is US-only. May not be suitable for Oslo.

---

### 4. CountMatters (Nordic Sensor-Based)

**Website:** Contact for info

**Coverage:** Nordic region

**What they offer:**

- Physical sensors (cameras/counters)
- Real-time occupancy monitoring
- Entrance-to-checkout tracking
- API integration to BI systems

**Best for:** If you own/manage the property and can install sensors

**Note:** Requires physical installation, not suitable for street-level analysis

---

## Comparison Matrix

| Feature          | Plaace (Current)   | PlaceSense           | Huq                   |
| ---------------- | ------------------ | -------------------- | --------------------- |
| Daily visits     | ✅                 | ✅                   | ✅                    |
| Visitor origins  | ❌ Via Telia only  | ✅ Full heatmap      | ✅                    |
| Dwell time       | ❌                 | ✅                   | ✅                    |
| Journey flows    | ❌                 | ✅                   | ✅                    |
| International    | ⚠️ Limited         | ✅ Country breakdown | ✅                    |
| Update frequency | Quarterly          | Daily API            | Daily API             |
| Accuracy         | ~100m (cell tower) | 3-10m (GPS)          | H3 hexbin             |
| Norway coverage  | ✅ Strong          | ✅ 47 countries      | ✅ 239 countries      |
| Pricing          | Included           | Enterprise           | £1k/mo or £375/report |

---

## MCP Integration Notes

### No Existing Footfall MCP

There is no existing MCP server for physical footfall data. Options:

**Option A: Build Custom MCP**

```
~/.claude/mcp-servers/footfall-hub/
├── index.ts              # MCP server
├── providers/
│   ├── placesense.ts     # PlaceSense API
│   ├── huq.ts            # Huq Industries API
│   └── plaace-export.ts  # Current Plaace exports
└── tools/
    ├── get-footfall.ts   # Unified query
    └── compare.ts        # Cross-validate sources
```

**Option B: Use Google Drive MCP**

- Load Plaace exports from Google Drive
- Process locally, no external API needed

**Option C: Local JSON (Current)**

- Manual quarterly updates
- No real-time capability
- Lowest cost

---

## Next Steps

### Immediate (This Week)

- [x] Create estimated besokende.json for Markveien 35
- [x] Create estimated internasjonalt.json for Markveien 35
- [ ] Request PlaceSense demo (email sales@placesense.ai)
- [ ] Purchase Huq single report for Markveien 35 (£375)

### Short-term (1-2 Weeks)

- [ ] Evaluate PlaceSense demo data quality
- [ ] Compare Huq report vs current Plaace data
- [ ] Decision: Which provider to integrate?

### Medium-term (2-4 Weeks)

- [ ] Build MCP server for chosen provider
- [ ] Add new chart components (journey flows, dwell time)
- [ ] Update 1-min analysis page with enhanced sections

---

## Contact Information

**PlaceSense**

- Website: https://placesense.ai/
- Demo request: https://placesense.ai/demo

**Huq Industries**

- Website: https://huq.io/
- Pricing: https://huq.io/pricing
- Contact: sales@huq.io

**Plaace (Current)**

- Website: https://plaace.co/
- Contact: post@plaace.co

---

## References

- [Datarade - Footfall Data APIs](https://datarade.ai/search/products/footfall-apis)
- [Telia Crowd Insights](https://business.teliacompany.com/industries/buildings/location-insights)
- [PlaceSense Methodology](https://placesense.ai/methodology)
- [Huq Data Dictionary](https://huq.io/data-dictionary)

---

_Last updated: January 2026_
