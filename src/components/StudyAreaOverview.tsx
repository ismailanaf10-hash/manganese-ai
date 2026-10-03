import React, { useState } from 'react';
import { KARNATAKA_BELTS, PROSPECT_LOCATIONS, PROSPECTIVE_POLYGONS } from '../data/karnatakaManganeseData';
import type { MineralBelt, TabType } from '../types';
import { 
  MapPin, 
  Layers, 
  Compass, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Cpu,
  Search
} from 'lucide-react';

interface StudyAreaOverviewProps {
  onSelectBelt: (belt: MineralBelt) => void;
  setActiveTab: (tab: TabType) => void;
}

export const StudyAreaOverview: React.FC<StudyAreaOverviewProps> = ({ onSelectBelt, setActiveTab }) => {
  const [selectedBeltId, setSelectedBeltId] = useState<string>(KARNATAKA_BELTS[0].id);

  const currentBelt = KARNATAKA_BELTS.find(b => b.id === selectedBeltId) || KARNATAKA_BELTS[0];
  const beltProspects = PROSPECT_LOCATIONS.filter(p => p.beltId === currentBelt.id);
  const beltPolygons = PROSPECTIVE_POLYGONS.filter(p => p.beltId === currentBelt.id);

  const handleInspectOnMap = (belt: MineralBelt) => {
    onSelectBelt(belt);
    setActiveTab('map');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-sage-950 text-white p-6 sm:p-8 shadow-xl border border-charcoal-700">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-900/80 border border-sage-500/50 text-sage-200 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-sage-400" />
            Karnataka Dharwar Craton Prospectivity Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
            AI-Assisted Manganese Prospectivity Explorer & Supply Shortfall Investigator
          </h1>
          <p className="text-charcoal-300 text-sm sm:text-base leading-relaxed">
            Integrating open-access satellite multispectral indices (Sentinel-2/Landsat), structural lineaments, lithological constraints, and spatial multi-criteria decision analysis (MCDA/AHP) to delineate prospective manganese horizons across Karnataka while diagnosing production bottlenecks.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('map')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sage-600 hover:bg-sage-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Launch Interactive GIS Map
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-600 text-charcoal-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-sage-400" />
              Adjust AHP Analytical Weights
            </button>
            <button
              onClick={() => setActiveTab('production')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal-800/80 hover:bg-charcoal-700 border border-charcoal-600 text-charcoal-300 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              Examine Supply Gap Data
            </button>
          </div>
        </div>

        {/* Subtle Decorative Grid */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      </div>

      {/* Quick Fact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-charcoal-200 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-charcoal-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Karnataka Belts</span>
            <Layers className="w-4 h-4 text-sage-700" />
          </div>
          <div className="text-2xl font-bold text-charcoal-900 font-mono">4 Major Basins</div>
          <p className="text-xs text-charcoal-500 mt-1">
            Sandur, Shimoga, Chitradurga, Uttara Kannada
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-charcoal-200 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-charcoal-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Karnataka Production Deficit</span>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700 font-mono">~56% Shortfall</div>
          <p className="text-xs text-charcoal-500 mt-1">
            2025 Projected Demand vs Local Output Gap
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-charcoal-200 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-charcoal-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Catalogued Prospects</span>
            <MapPin className="w-4 h-4 text-sage-700" />
          </div>
          <div className="text-2xl font-bold text-charcoal-900 font-mono">{PROSPECT_LOCATIONS.length} Benchmark Sites</div>
          <p className="text-xs text-charcoal-500 mt-1">
            Historical pits, working mines & G3/G4 targets
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-charcoal-200 shadow-xs hover:border-sage-400 transition-all">
          <div className="flex items-center justify-between text-charcoal-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Cost of Architecture</span>
            <CheckCircle2 className="w-4 h-4 text-sage-600" />
          </div>
          <div className="text-2xl font-bold text-sage-800 font-mono">₹0 (100% Free FOSS)</div>
          <p className="text-xs text-charcoal-500 mt-1">
            Leaflet, OpenStreetMap, Client-Side GIS & Math
          </p>
        </div>
      </div>

      {/* Critical Scientific Disclaimer Callout */}
      <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-charcoal-800 space-y-1">
            <p className="font-semibold text-amber-900">
              Responsible Exploration & UNFC Scientific Protocol
            </p>
            <p className="text-charcoal-700">
              Satellite multispectral signatures (iron-oxide ratios, clay-alteration indices) and lineament density indicate surface geological likelihood (UNFC G4/G3 reconnaissance stage). They <strong className="text-charcoal-900 font-semibold">do not prove underground manganese ore bodies or commercial reserves</strong>. Systematic ground-truthing, trenching, geophysical resistivity, and core borehole drilling are required before any resource estimation.
            </p>
          </div>
        </div>
      </div>

      {/* Belt Selector Tabs & Details */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200">
          <div>
            <h2 className="text-xl font-bold text-charcoal-900">
              Karnataka Manganese Belts Deep Dive
            </h2>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Select a study region to examine stratigraphy, host lithology, typical grades, and prospect locations.
            </p>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-charcoal-100 rounded-xl overflow-x-auto">
            {KARNATAKA_BELTS.map((belt) => {
              const isSelected = selectedBeltId === belt.id;
              return (
                <button
                  key={belt.id}
                  onClick={() => setSelectedBeltId(belt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-charcoal-900 text-white shadow-xs'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-white/80'
                  }`}
                >
                  {belt.name.split(' ')[0]} Belt
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Belt Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          
          {/* Main Geological Narrative */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-sage-800 text-xs font-semibold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                {currentBelt.district}
              </div>
              <h3 className="text-2xl font-extrabold text-charcoal-900">
                {currentBelt.name}
              </h3>
              <p className="text-sm text-charcoal-700 mt-2 leading-relaxed">
                {currentBelt.description}
              </p>
            </div>

            {/* Stratigraphy & Host Rock Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="bg-charcoal-50 rounded-lg p-3.5 border border-charcoal-200">
                <span className="text-charcoal-500 block text-[11px] font-medium">Lithostratigraphy & Age</span>
                <span className="font-semibold text-charcoal-900 block mt-0.5">{currentBelt.geologicalAge}</span>
                <span className="text-charcoal-600 block text-[11px] mt-1 font-mono">{currentBelt.formationName}</span>
              </div>

              <div className="bg-charcoal-50 rounded-lg p-3.5 border border-charcoal-200">
                <span className="text-charcoal-500 block text-[11px] font-medium">Host Lithology</span>
                <span className="font-semibold text-charcoal-900 block mt-0.5">{currentBelt.hostRock}</span>
              </div>

              <div className="bg-charcoal-50 rounded-lg p-3.5 border border-charcoal-200">
                <span className="text-charcoal-500 block text-[11px] font-medium">Average Grade (% Mn)</span>
                <span className="font-semibold text-sage-800 block mt-0.5 font-mono">{currentBelt.avgGradeMn}</span>
              </div>

              <div className="bg-charcoal-50 rounded-lg p-3.5 border border-charcoal-200">
                <span className="text-charcoal-500 block text-[11px] font-medium">Primary Ore Minerals</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentBelt.primaryOres.map((ore, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white text-charcoal-800 font-medium text-[10px] border border-charcoal-300">
                      {ore}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleInspectOnMap(currentBelt)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <span>Inspect {currentBelt.name} on Interactive Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Prospects & Targets in this Belt */}
          <div className="bg-charcoal-50/70 rounded-xl p-4 border border-charcoal-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
                <h4 className="text-xs font-bold text-charcoal-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-sage-700" />
                  Key Prospects & Targets ({beltProspects.length})
                </h4>
                <span className="text-[10px] text-charcoal-500 font-mono">UNFC Status</span>
              </div>

              <div className="space-y-2.5 mt-3 max-h-80 overflow-y-auto pr-1">
                {beltProspects.map((p) => (
                  <div 
                    key={p.id}
                    className="p-3 bg-white rounded-lg border border-charcoal-200 hover:border-sage-400 transition-all space-y-1.5 text-xs shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-semibold text-charcoal-900">{p.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-medium ${
                        p.type === 'Working Mine' ? 'bg-emerald-100 text-emerald-800' :
                        p.type === 'Auction Block' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {p.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-charcoal-600">
                      <span>Score: <strong className="text-charcoal-900 font-mono">{p.prospectivityScore}/100</strong></span>
                      <span className="font-mono text-charcoal-500">{p.lat.toFixed(3)}°N, {p.lng.toFixed(3)}°E</span>
                    </div>

                    <p className="text-[11px] text-charcoal-500 italic line-clamp-2">
                      {p.remarks}
                    </p>
                  </div>
                ))}

                {beltPolygons.map((poly) => (
                  <div key={poly.id} className="p-2.5 bg-sage-50 border border-sage-200 rounded-lg text-xs">
                    <span className="font-semibold text-sage-900 block">{poly.name}</span>
                    <span className="text-[10px] text-sage-700">Cluster Tier: <strong>{poly.prospectivityTier}</strong> ({poly.overallScore}/100)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-charcoal-200 text-[11px] text-charcoal-500 text-center">
              Coordinated with Geological Survey of India (GSI) 1:50k open maps & IBM yearbook baselines.
            </div>
          </div>

        </div>
      </div>

      {/* Mineral Species Quick Identifier Reference */}
      <div className="bg-charcoal-900 text-white rounded-2xl p-6 border border-charcoal-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Manganese Mineral Varieties in Karnataka</span>
            </h3>
            <p className="text-xs text-charcoal-400 mt-0.5">
              Key economic manganese mineral species, chemical formulas, and optical/spectral diagnostic characteristics.
            </p>
          </div>
          <span className="text-xs font-mono text-sage-400 px-2.5 py-1 rounded bg-charcoal-800 border border-charcoal-700 hidden sm:inline">
            Economic Ore Diagnostic
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-charcoal-800/80 rounded-xl p-4 border border-charcoal-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Pyrolusite</span>
              <span className="font-mono text-[11px] text-sage-300">MnO₂ (63.2% Mn)</span>
            </div>
            <p className="text-charcoal-300 text-[11px]">
              Soft black metallic luster. The richest commercial manganese mineral, formed as supergene residual concentration in Sandur and Shimoga schist caps.
            </p>
          </div>

          <div className="bg-charcoal-800/80 rounded-xl p-4 border border-charcoal-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Psilomelane</span>
              <span className="font-mono text-[11px] text-sage-300">BaMn₉O₁₆(OH)₄</span>
            </div>
            <p className="text-charcoal-300 text-[11px]">
              Massive, botryoidal, and stalactitic black crusts. Abundant in lateritoid manganese blankets of Uttara Kannada and Kumsi.
            </p>
          </div>

          <div className="bg-charcoal-800/80 rounded-xl p-4 border border-charcoal-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Braunite</span>
              <span className="font-mono text-[11px] text-sage-300">3Mn₂O₃·MnSiO₃</span>
            </div>
            <p className="text-charcoal-300 text-[11px]">
              Hard brownish-black silicate-bearing ore. Metamorphic syngenetic mineral common in folded bedded BMF units of Chitradurga.
            </p>
          </div>

          <div className="bg-charcoal-800/80 rounded-xl p-4 border border-charcoal-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Cryptomelane</span>
              <span className="font-mono text-[11px] text-sage-300">K(Mn⁴⁺,Mn²⁺)₈O₁₆</span>
            </div>
            <p className="text-charcoal-300 text-[11px]">
              Potassium-bearing manganese oxide found in supergene oxidation zones; generates distinct spectral response in shortwave infrared bands.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
