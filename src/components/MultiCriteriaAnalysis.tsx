import React, { useState, useMemo } from 'react';
import { PROSPECT_LOCATIONS, KARNATAKA_BELTS } from '../data/karnatakaManganeseData';
import type { AnalysisWeights } from '../types';
import { 
  Sliders, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Drill
} from 'lucide-react';

const DEFAULT_WEIGHTS: AnalysisWeights = {
  lithology: 30,
  lineaments: 25,
  spectralIron: 20,
  clayAlteration: 15,
  geomorphology: 10,
  proximityKnown: 0
};

export const MultiCriteriaAnalysis: React.FC = () => {
  const [weights, setWeights] = useState<AnalysisWeights>(DEFAULT_WEIGHTS);
  const [selectedBeltFilter, setSelectedBeltFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Total weight normalization check
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  // Recalculate dynamic scores based on AHP weights
  const scoredProspects = useMemo(() => {
    return PROSPECT_LOCATIONS.map((p) => {
      // Normalize weights
      const wLith = weights.lithology / (totalWeight || 1);
      const wLine = weights.lineaments / (totalWeight || 1);
      const wIron = weights.spectralIron / (totalWeight || 1);
      const wClay = weights.clayAlteration / (totalWeight || 1);
      const wGeo = weights.geomorphology / (totalWeight || 1);

      // Raw factor proxies (0-100)
      const lithScore = p.beltId === 'sandur' ? 95 : p.beltId === 'chitradurga' ? 85 : 75;
      const lineScore = p.lineamentDensityScore * 100;
      const ironScore = p.spectralIronIndex * 100;
      const clayScore = p.clayAlterationIndex * 100;
      const geoScore = p.beltId === 'sandur' ? 92 : 80;

      const dynamicScore = Math.round(
        lithScore * wLith +
        lineScore * wLine +
        ironScore * wIron +
        clayScore * wClay +
        geoScore * wGeo
      );

      return {
        ...p,
        calculatedScore: Math.min(99, Math.max(10, dynamicScore)),
        lithScore,
        lineScore: Math.round(lineScore),
        ironScore: Math.round(ironScore),
        clayScore: Math.round(clayScore),
        geoScore
      };
    }).sort((a, b) => b.calculatedScore - a.calculatedScore);
  }, [weights, totalWeight]);

  // Filtered list
  const filteredList = useMemo(() => {
    return scoredProspects.filter((p) => {
      if (selectedBeltFilter !== 'all' && p.beltId !== selectedBeltFilter) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.district.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [scoredProspects, selectedBeltFilter, searchQuery]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Belt', 'District', 'Latitude', 'Longitude', 'Calculated Prospectivity Score', 'UNFC Stage', 'Estimated Grade', 'Ore Minerals', 'Environmental Status'];
    const rows = filteredList.map(p => [
      p.id,
      `"${p.name}"`,
      p.beltId,
      `"${p.district}"`,
      p.lat,
      p.lng,
      p.calculatedScore,
      `"${p.unfcStage}"`,
      `"${p.estimatedGrade}"`,
      `"${p.oreType}"`,
      `"${p.environmentalStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `karnataka_manganese_prospectivity_scored_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetWeights = () => {
    setWeights(DEFAULT_WEIGHTS);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sage-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            Spatial Multi-Criteria Evaluation (SMCE / AHP)
          </div>
          <h2 className="text-2xl font-bold text-charcoal-900">
            Prospectivity Multi-Criteria Weight Tuner
          </h2>
          <p className="text-xs text-charcoal-600 mt-1 max-w-2xl">
            Simulate expert geological weightings across lithology, structural lineaments, and satellite band indices. Real-time mathematical scoring re-ranks exploration targets across Karnataka.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleResetWeights}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sage-700 hover:bg-sage-600 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Scored CSV
          </button>
        </div>
      </div>

      {/* Weight Adjuster Sliders & Live Model Confidence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
            <span className="text-xs font-bold text-charcoal-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-sage-700" />
              Evidence Layer Criteria Weights
            </span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              totalWeight === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Total Weight: {totalWeight}% {totalWeight !== 100 && '(Auto-Normalized)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Lithology */}
            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-800">1. Host Lithology & Stratigraphy</span>
                <span className="font-mono font-bold text-sage-800">{weights.lithology}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={weights.lithology}
                onChange={e => setWeights({ ...weights, lithology: +e.target.value })}
                className="w-full accent-sage-700 cursor-pointer"
              />
              <p className="text-[10px] text-charcoal-500">
                Favors Banded Iron-Manganese Formations (BMF) & Deogiri phyllites.
              </p>
            </div>

            {/* Lineaments */}
            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-800">2. Faults & Lineament Density</span>
                <span className="font-mono font-bold text-sage-800">{weights.lineaments}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={weights.lineaments}
                onChange={e => setWeights({ ...weights, lineaments: +e.target.value })}
                className="w-full accent-sage-700 cursor-pointer"
              />
              <p className="text-[10px] text-charcoal-500">
                Structural controls for supergene solution channeling & fold traps.
              </p>
            </div>

            {/* Spectral Iron Ratio */}
            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-800">3. Iron-Oxide Spectral Band (B4/B2)</span>
                <span className="font-mono font-bold text-sage-800">{weights.spectralIron}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={weights.spectralIron}
                onChange={e => setWeights({ ...weights, spectralIron: +e.target.value })}
                className="w-full accent-sage-700 cursor-pointer"
              />
              <p className="text-[10px] text-charcoal-500">
                Detects ferric/ferrous staining associated with oxidized manganese gossans.
              </p>
            </div>

            {/* Clay Alteration */}
            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-800">4. Clay/OHI Alteration (B11/B12)</span>
                <span className="font-mono font-bold text-sage-800">{weights.clayAlteration}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={weights.clayAlteration}
                onChange={e => setWeights({ ...weights, clayAlteration: +e.target.value })}
                className="w-full accent-sage-700 cursor-pointer"
              />
              <p className="text-[10px] text-charcoal-500">
                Identifies hydrothermal argillic weathering halo in Western Dharwar.
              </p>
            </div>

            {/* Geomorphology */}
            <div className="bg-charcoal-50 p-3.5 rounded-xl border border-charcoal-200 space-y-2 sm:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-800">5. DEM Topographic Crest & Plateau Factor</span>
                <span className="font-mono font-bold text-sage-800">{weights.geomorphology}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={weights.geomorphology}
                onChange={e => setWeights({ ...weights, geomorphology: +e.target.value })}
                className="w-full accent-sage-700 cursor-pointer"
              />
              <p className="text-[10px] text-charcoal-500">
                Favors high-elevation plateau caps where lateritoid blanket preservation is highest.
              </p>
            </div>

          </div>
        </div>

        {/* Model Ground-Truthing Recommendation Engine */}
        <div className="bg-charcoal-900 text-white rounded-2xl p-6 border border-charcoal-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sage-300 uppercase tracking-wider mb-2">
              <Drill className="w-4 h-4 text-sage-400" />
              Automated Exploration Protocol
            </div>
            <h3 className="text-lg font-bold text-white">
              Target Ground-Truthing Plan
            </h3>
            <p className="text-xs text-charcoal-300 mt-1">
              Derived according to UNFC Minerals (Evidence of Mineral Contents) Rules 2015 for top ranked sector:
            </p>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <div className="font-semibold text-sage-300">Phase 1: G4 Reconnaissance (Months 1-3)</div>
                <p className="text-charcoal-300 text-[11px] mt-0.5">
                  100m grid geochemical soil sampling for Mn/Fe/SiO₂ ratios + drone magnetic survey over lineaments.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <div className="font-semibold text-sage-300">Phase 2: G3 Prospecting (Months 4-7)</div>
                <p className="text-charcoal-300 text-[11px] mt-0.5">
                  Trenching across gossan contacts (depth 3-5m) and resistivity IP profiles.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <div className="font-semibold text-sage-300">Phase 3: G2 General Exploration</div>
                <p className="text-charcoal-300 text-[11px] mt-0.5">
                  Core drilling on 50m × 50m regular grid to intersect synclinal manganese fold limbs.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-amber-300 border-t border-charcoal-800 pt-3">
            ⚠️ Non-invasive surface model only. Resource estimation requires certified Competent Person sign-off.
          </div>
        </div>

      </div>

      {/* Scored Targets Ranking Table */}
      <div className="bg-white rounded-2xl border border-charcoal-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-charcoal-50/50">
          <div>
            <h3 className="font-bold text-charcoal-900 text-base flex items-center gap-2">
              <span>Dynamically Ranked Targets ({filteredList.length})</span>
            </h3>
            <p className="text-xs text-charcoal-500">
              Sorted by calculated multi-criteria prospectivity score in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search target or district..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-charcoal-300 bg-white text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-1 focus:ring-sage-600 w-44"
            />
            <select
              value={selectedBeltFilter}
              onChange={e => setSelectedBeltFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-charcoal-300 bg-white text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-sage-600 cursor-pointer"
            >
              <option value="all">All Karnataka Belts</option>
              {KARNATAKA_BELTS.map(b => (
                <option key={b.id} value={b.id}>{b.name.split(' ')[0]} Belt</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-100 text-charcoal-700 uppercase font-semibold text-[10px] tracking-wider border-b border-charcoal-200">
              <tr>
                <th className="py-3 px-4">Rank & ID</th>
                <th className="py-3 px-4">Target Name</th>
                <th className="py-3 px-4">District / Belt</th>
                <th className="py-3 px-4 text-center">AHP Score</th>
                <th className="py-3 px-4">Estimated Grade</th>
                <th className="py-3 px-4">UNFC Stage</th>
                <th className="py-3 px-4">Environmental Constraint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-200">
              {filteredList.map((target, index) => (
                <tr key={target.id} className="hover:bg-charcoal-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-charcoal-900 whitespace-nowrap">
                    #{index + 1} <span className="text-charcoal-400 font-normal ml-1">({target.id})</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-charcoal-900 whitespace-nowrap">
                    {target.name}
                  </td>
                  <td className="py-3 px-4 text-charcoal-600 whitespace-nowrap">
                    {target.district}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full font-mono font-bold text-xs ${
                      target.calculatedScore >= 85 ? 'bg-sage-800 text-white' :
                      target.calculatedScore >= 75 ? 'bg-sage-100 text-sage-800 border border-sage-300' :
                      'bg-charcoal-100 text-charcoal-700'
                    }`}>
                      {target.calculatedScore}/100
                    </span>
                  </td>
                  <td className="py-3 px-4 text-charcoal-800 font-mono whitespace-nowrap">
                    {target.estimatedGrade}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-charcoal-100 text-charcoal-800 border border-charcoal-200">
                      {target.unfcStage}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                      target.environmentalStatus === 'Clear' ? 'text-emerald-700' :
                      target.environmentalStatus.includes('Caution') ? 'text-amber-700' :
                      'text-rose-700'
                    }`}>
                      {target.environmentalStatus === 'Clear' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      {target.environmentalStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
