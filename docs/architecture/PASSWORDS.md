# Løkka Gårdeierforening Platform - Passord

Dette dokumentet inneholder alle passordene for plattformen.

## 🔐 Admin-tilgang

**Admin-passordet fungerer på ALLE sider** (hovedstyret og alle selskaper):

- **Passord:** `NaturalState2024Admin`
- **Fungerer på:** Alle sider i plattformen

---

## 📊 Hovedstyret

**URL:** http://localhost:3001/main-board

- **Passord:** `MainBoard2024Analysis`

---

## 🏢 Eiendomsutviklere

### 1. Aspelin Ramm
**URL:** http://localhost:3001/aspelin-ramm
- **Passord:** `AspelinRamm2024Secure`

### 2. Brødrene Evensen
**URL:** http://localhost:3001/brodrene-evensen
- **Passord:** `BrodreneEvensen2024Key`

### 3. Eiendomsspar
**URL:** http://localhost:3001/eiendomsspar
- **Passord:** `Eiendomsspar2024Pass`

### 4. Malling & Co
**URL:** http://localhost:3001/malling-co
- **Passord:** `MallingCo2024Access`

### 5. Maya Eiendom
**URL:** http://localhost:3001/maya-eiendom
- **Passord:** `MayaEiendom2024Login`

### 6. Roger Vødal
**URL:** http://localhost:3001/roger-vodal
- **Passord:** `RogerVodal2024Entry`

### 7. SiO
**URL:** http://localhost:3001/sio
- **Passord:** `SIO2024Protected`

### 8. SPABO Eiendom
**URL:** http://localhost:3001/spabo
- **Passord:** `Spabo2024Private`

---

## 📝 Notater

- Alle passord er unike for hvert selskap
- Admin-passordet (`NaturalState2024Admin`) fungerer på alle sider
- Innlogging varer i 7 dager
- For produksjon: Endre alle passordene i `.env.local`

---

## 🔧 For utviklere

Passordene er lagret i `.env.local` filen som miljøvariabler:

```bash
ADMIN_PASSWORD=NaturalState2024Admin
MAIN_BOARD_PASSWORD=MainBoard2024Analysis
ASPELIN_RAMM_PASSWORD=AspelinRamm2024Secure
BRODRENE_EVENSEN_PASSWORD=BrodreneEvensen2024Key
EIENDOMSSPAR_PASSWORD=Eiendomsspar2024Pass
MALLING_CO_PASSWORD=MallingCo2024Access
MAYA_EIENDOM_PASSWORD=MayaEiendom2024Login
ROGER_VODAL_PASSWORD=RogerVodal2024Entry
SIO_PASSWORD=SIO2024Protected
SPABO_PASSWORD=Spabo2024Private
```

**Viktig:** Ikke commit `.env.local` til Git!
