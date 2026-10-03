# ManganeseAI — AI-Assisted Manganese Mineral Prospectivity Explorer (Karnataka, India)

A prototype for **Smart India Hackathon (SIH 2026)** built with a **₹0 budget** stack (no paid APIs, no subscriptions).

---

## 🌟 Project Overview

**ManganeseAI** integrates open-access satellite multispectral indices (Sentinel-2, Landsat-8/9), structural lineaments, and Spatial Multi-Criteria Decision Analysis (SMCE / AHP) to:
1. **Delineate Prospective Manganese Horizons** across Karnataka's Dharwar Craton (Sandur, Shimoga, Chitradurga, and Uttara Kannada schist belts).
2. **Investigate Production Shortfalls & Bottlenecks** in Karnataka's manganese supply chain (56% domestic deficit, 4.5 MT low-grade stockpile accumulation).
3. **Enforce Ethical Mineral Exploration & UNFC Principles**: Clear distinction between non-invasive surface reconnaissance (G4/G3) and ground-truthed reserves (G2/G1).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher) and npm installed.

### Launch in 2 Simple Steps

1. **Install Dependencies** (already done in your workspace):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. Open your browser at:
   ```
   http://localhost:5173/
   ```

---

## 🧭 Application Modules & Features

| Module | Features & Capabilities |
| :--- | :--- |
| **1. Study Area Overview** | Detailed stratigraphy, host rocks, primary ores (*Pyrolusite, Psilomelane, Braunite, Cryptomelane*), and geological profiles for Karnataka's 4 major manganese belts. |
| **2. Interactive Prospectivity Map** | Responsive Leaflet GIS map with toggleable layers: AI Prospective Polygons, Structural Lineaments / Faults, Iron-Oxide Spectral Heat Overlays, Eco-Buffer Zones, and **Live Click Inspector** to evaluate any coordinate. |
| **3. Multi-Criteria Engine (AHP)** | Interactive weight sliders for Lithology, Lineament Density, Spectral Fe-Oxide Ratio, Clay Alteration, and Geomorphology with **live dynamic target re-ranking** and CSV export. |
| **4. Field Data Lab & Upload** | Field CSV file uploader, manual coordinate evaluator, and **Multispectral Band Algebra Calculator** (Sentinel-2 $B4/B2$, $B11/B12$, $NDVI$). Includes built-in benchmark samples. |
| **5. Production Shortfall Diagnostics** | Recharts deficit trend analysis (2014–2025), grade erosion breakdowns, and deep diagnostics of the 4 core bottleneck drivers (Regulatory, Beneficiation, Deep Ore Exploration, Logistics). |
| **6. Methodology & UNFC Ethics** | 4-Stage exploration pipeline, diagnostic band ratio equations, UNFC 1997 / MEMC 2015 stage alignment, and comprehensive scientific disclaimers. |

---

## ⚖️ Scientific & Ethical Disclaimer

> [!IMPORTANT]
> **Surface vs Subsurface Proof:** Remote sensing and satellite spectral indices detect bare surface gossans, weathering halos, and fractures. **Satellite imagery alone never constitutes proof of underground ore reserves.** Upgrading to UNFC G2/G1 commercial reserves requires certified Competent Person sign-off, systematic core drilling, and geochemical assaying.
