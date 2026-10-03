import React, { useState } from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  CheckCircle, 
  Calculator, 
  MapPin, 
  Play, 
  Database
} from 'lucide-react';

interface UploadedRecord {
  id: string;
  name: string;
  lat: number;
  lng: number;
  b2: number;
  b4: number;
  b8: number;
  b11: number;
  b12: number;
  feRatio: number;
  clayRatio: number;
  ndvi: number;
  prospectivityTier: string;
  predictedScore: number;
}

export const DataUploadLab: React.FC = () => {
  // Manual Point Evaluator State
  const [manualLat, setManualLat] = useState<string>('15.085');
  const [manualLng, setManualLng] = useState<string>('76.542');
  const [manualResult, setManualResult] = useState<any | null>(null);

  // Spectral Calculator State
  const [b2Val, setB2Val] = useState<number>(0.12);
  const [b4Val, setB4Val] = useState<number>(0.26);
  const [b8Val, setB8Val] = useState<number>(0.42);
  const [b11Val, setB11Val] = useState<number>(0.38);
  const [b12Val, setB12Val] = useState<number>(0.21);

  // Uploaded Records State
  const [uploadedRecords, setUploadedRecords] = useState<UploadedRecord[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Calculate live spectral ratios
  const ironOxideRatio = b2Val > 0 ? +(b4Val / b2Val).toFixed(3) : 0;
  const clayAlterationRatio = b12Val > 0 ? +(b11Val / b12Val).toFixed(3) : 0;
  const ndviVal = (b8Val + b4Val) > 0 ? +((b8Val - b4Val) / (b8Val + b4Val)).toFixed(3) : 0;

  // Manual point evaluator
  const handleEvaluatePoint = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng)) return;

    const inKarnataka = lat >= 11.5 && lat <= 18.5 && lng >= 74.0 && lng <= 78.5;
    
    const dSandur = Math.sqrt(Math.pow(lat - 15.08, 2) + Math.pow(lng - 76.55, 2)) * 111;
    const dShimoga = Math.sqrt(Math.pow(lat - 14.05, 2) + Math.pow(lng - 75.40, 2)) * 111;
    const dChitra = Math.sqrt(Math.pow(lat - 13.78, 2) + Math.pow(lng - 76.45, 2)) * 111;
    const minD = Math.min(dSandur, dShimoga, dChitra);

    const score = Math.max(20, Math.min(96, Math.round(93 - minD * 1.05 + 5)));
    const tier = score >= 82 ? 'High Prospectivity' : score >= 65 ? 'Moderate Prospectivity' : 'Low Potential';

    setManualResult({
      lat,
      lng,
      inKarnataka,
      score,
      tier,
      closestBelt: minD === dSandur ? 'Sandur Basin (Deogiri Fm)' : minD === dShimoga ? 'Shimoga Belt (Kumsi Fm)' : 'Chitradurga Belt (Vanivilas Fm)',
      distanceKm: +minD.toFixed(1),
      estimatedHost: minD < 20 ? 'Manganiferous phyllite / BMF syncline' : 'Granitic Gneiss Basement (Barren)',
      feIndexSim: +(0.5 + (score / 100) * 0.45).toFixed(2),
      alterationSim: +(0.45 + (score / 100) * 0.48).toFixed(2),
    });
  };

  // Load sample dataset
  const handleLoadSampleData = () => {
    const samples: UploadedRecord[] = [
      {
        id: 'FLD-SAN-01',
        name: 'Sandur West Ridge Traverse Point #1',
        lat: 15.074,
        lng: 76.521,
        b2: 0.11,
        b4: 0.28,
        b8: 0.35,
        b11: 0.41,
        b12: 0.22,
        feRatio: 2.545,
        clayRatio: 1.864,
        ndvi: 0.111,
        prospectivityTier: 'High',
        predictedScore: 91
      },
      {
        id: 'FLD-SAN-02',
        name: 'Ramgad Syncline Extension Pit #4',
        lat: 15.142,
        lng: 76.505,
        b2: 0.13,
        b4: 0.29,
        b8: 0.38,
        b11: 0.39,
        b12: 0.23,
        feRatio: 2.231,
        clayRatio: 1.696,
        ndvi: 0.137,
        prospectivityTier: 'High',
        predictedScore: 88
      },
      {
        id: 'FLD-SHI-01',
        name: 'Kumsi Lateritoid Plateau Core A',
        lat: 14.038,
        lng: 75.425,
        b2: 0.15,
        b4: 0.27,
        b8: 0.45,
        b11: 0.44,
        b12: 0.26,
        feRatio: 1.800,
        clayRatio: 1.692,
        ndvi: 0.250,
        prospectivityTier: 'Moderate',
        predictedScore: 79
      },
      {
        id: 'FLD-CHI-01',
        name: 'Hosadurga Carbonate Chert Sample',
        lat: 13.805,
        lng: 76.398,
        b2: 0.12,
        b4: 0.26,
        b8: 0.36,
        b11: 0.37,
        b12: 0.21,
        feRatio: 2.167,
        clayRatio: 1.762,
        ndvi: 0.161,
        prospectivityTier: 'High',
        predictedScore: 84
      },
      {
        id: 'FLD-GRN-01',
        name: 'Davanagere Barren Gneiss Control Point',
        lat: 14.450,
        lng: 75.920,
        b2: 0.22,
        b4: 0.24,
        b8: 0.39,
        b11: 0.31,
        b12: 0.29,
        feRatio: 1.091,
        clayRatio: 1.069,
        ndvi: 0.238,
        prospectivityTier: 'Low',
        predictedScore: 32
      }
    ];

    setUploadedRecords(samples);
    setUploadStatus('Loaded 5 Karnataka field benchmark sample points with Sentinel-2 band reflectance values.');
  };

  // CSV File Handler Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      
      const parsed: UploadedRecord[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length >= 3) {
          const id = parts[0]?.trim() || `REC-${i}`;
          const name = parts[1]?.trim() || `Field Sample #${i}`;
          const lat = parseFloat(parts[2]);
          const lng = parseFloat(parts[3]) || 76.5;
          const b2 = parseFloat(parts[4]) || 0.12;
          const b4 = parseFloat(parts[5]) || 0.25;
          const b8 = parseFloat(parts[6]) || 0.40;
          const b11 = parseFloat(parts[7]) || 0.35;
          const b12 = parseFloat(parts[8]) || 0.20;

          const fe = +(b4 / (b2 || 1)).toFixed(2);
          const clay = +(b11 / (b12 || 1)).toFixed(2);
          const ndvi = +((b8 - b4) / ((b8 + b4) || 1)).toFixed(2);
          const score = Math.max(25, Math.min(95, Math.round(fe * 25 + clay * 15 + (1 - ndvi) * 10)));
          const tier = score >= 80 ? 'High' : score >= 60 ? 'Moderate' : 'Low';

          parsed.push({
            id,
            name,
            lat: isNaN(lat) ? 15.0 : lat,
            lng: isNaN(lng) ? 76.5 : lng,
            b2,
            b4,
            b8,
            b11,
            b12,
            feRatio: fe,
            clayRatio: clay,
            ndvi,
            prospectivityTier: tier,
            predictedScore: score
          });
        }
      }

      if (parsed.length > 0) {
        setUploadedRecords(parsed);
        setUploadStatus(`Successfully parsed ${parsed.length} records from ${file.name}`);
      } else {
        handleLoadSampleData();
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sage-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            Field Data Ingestion & Band Algebra Lab
          </div>
          <h2 className="text-2xl font-bold text-charcoal-900">
            Geospatial Data Ingestion & Spectral Calculator
          </h2>
          <p className="text-xs text-charcoal-600 mt-1 max-w-2xl">
            Upload fieldwork CSV/GeoJSON assay points, evaluate arbitrary GPS coordinates across Karnataka, or calculate multispectral remote sensing indices directly in your browser.
          </p>
        </div>

        <button
          onClick={handleLoadSampleData}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-sage-300" />
          Load Benchmark Sample Points
        </button>
      </div>

      {/* Grid: Coordinate Evaluator & Multispectral Algebra */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Coordinate Point Spot Analyzer */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
              <span className="text-xs font-bold text-charcoal-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sage-700" />
                Karnataka GPS Spot Evaluator
              </span>
              <span className="text-[10px] text-charcoal-500 font-mono">Real-time Inference</span>
            </div>

            <p className="text-xs text-charcoal-600 mt-2">
              Enter any field latitude & longitude in Karnataka to inspect host formation proximity, lineaments, and prospectivity ranking:
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="text-[11px] font-semibold text-charcoal-700 block mb-1">
                  Latitude (°N)
                </label>
                <input
                  type="text"
                  value={manualLat}
                  onChange={e => setManualLat(e.target.value)}
                  placeholder="e.g. 15.085"
                  className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-charcoal-300 bg-charcoal-50 text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-sage-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-charcoal-700 block mb-1">
                  Longitude (°E)
                </label>
                <input
                  type="text"
                  value={manualLng}
                  onChange={e => setManualLng(e.target.value)}
                  placeholder="e.g. 76.542"
                  className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-charcoal-300 bg-charcoal-50 text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-sage-600"
                />
              </div>
            </div>

            <button
              onClick={handleEvaluatePoint}
              className="mt-3 w-full py-2.5 rounded-lg bg-sage-800 hover:bg-sage-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              Evaluate Point Likelihood
            </button>
          </div>

          {/* Results Box */}
          {manualResult && (
            <div className="mt-4 bg-charcoal-900 text-white rounded-xl p-4 border border-charcoal-700 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-charcoal-800 pb-2">
                <span className="text-sage-300 font-bold">{manualResult.tier}</span>
                <span className="text-white font-mono font-bold text-sm">{manualResult.score}/100</span>
              </div>
              <div className="space-y-1 text-charcoal-300 text-[11px]">
                <div>Closest Belt: <strong className="text-white">{manualResult.closestBelt}</strong> ({manualResult.distanceKm} km)</div>
                <div>Predicted Lithology: <strong className="text-white">{manualResult.estimatedHost}</strong></div>
                <div>Synthetic Fe-Oxide Index: <strong className="text-sage-300">{manualResult.feIndexSim}</strong></div>
              </div>
              <div className="text-[10px] text-amber-300 pt-1 border-t border-charcoal-800">
                * Illustrative estimation. Not proof of mineral reserve.
              </div>
            </div>
          )}
        </div>

        {/* 2. Multispectral Band Algebra Calculator */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
            <span className="text-xs font-bold text-charcoal-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-sage-700" />
              Sentinel-2 / Landsat Band Ratio Algebra
            </span>
            <span className="text-[10px] font-mono text-sage-800 bg-sage-50 px-2 py-0.5 rounded border border-sage-200">
              Optical & SWIR
            </span>
          </div>

          <p className="text-xs text-charcoal-600">
            Simulate or input surface top-of-atmosphere reflectance values to compute diagnostic mineral index formulas:
          </p>

          <div className="grid grid-cols-5 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-charcoal-500 font-mono block">B2 (Blue)</label>
              <input
                type="number"
                step="0.01"
                value={b2Val}
                onChange={e => setB2Val(+e.target.value)}
                className="w-full text-xs font-mono p-1.5 rounded border border-charcoal-300 text-center"
              />
            </div>
            <div>
              <label className="text-[10px] text-charcoal-500 font-mono block">B4 (Red)</label>
              <input
                type="number"
                step="0.01"
                value={b4Val}
                onChange={e => setB4Val(+e.target.value)}
                className="w-full text-xs font-mono p-1.5 rounded border border-charcoal-300 text-center"
              />
            </div>
            <div>
              <label className="text-[10px] text-charcoal-500 font-mono block">B8 (NIR)</label>
              <input
                type="number"
                step="0.01"
                value={b8Val}
                onChange={e => setB8Val(+e.target.value)}
                className="w-full text-xs font-mono p-1.5 rounded border border-charcoal-300 text-center"
              />
            </div>
            <div>
              <label className="text-[10px] text-charcoal-500 font-mono block">B11 (SWIR1)</label>
              <input
                type="number"
                step="0.01"
                value={b11Val}
                onChange={e => setB11Val(+e.target.value)}
                className="w-full text-xs font-mono p-1.5 rounded border border-charcoal-300 text-center"
              />
            </div>
            <div>
              <label className="text-[10px] text-charcoal-500 font-mono block">B12 (SWIR2)</label>
              <input
                type="number"
                step="0.01"
                value={b12Val}
                onChange={e => setB12Val(+e.target.value)}
                className="w-full text-xs font-mono p-1.5 rounded border border-charcoal-300 text-center"
              />
            </div>
          </div>

          {/* Computed Indices Box */}
          <div className="grid grid-cols-3 gap-3 text-xs pt-2">
            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[10px] text-charcoal-500 block uppercase font-medium">Iron-Oxide (B4/B2)</span>
              <span className="text-lg font-bold text-charcoal-900 font-mono">{ironOxideRatio}</span>
              <span className={`text-[10px] block mt-0.5 font-medium ${ironOxideRatio > 1.8 ? 'text-emerald-700' : 'text-charcoal-500'}`}>
                {ironOxideRatio > 1.8 ? 'Strong Gossan Staining' : 'Normal / Low Fe'}
              </span>
            </div>

            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[10px] text-charcoal-500 block uppercase font-medium">Clay Index (B11/B12)</span>
              <span className="text-lg font-bold text-charcoal-900 font-mono">{clayAlterationRatio}</span>
              <span className={`text-[10px] block mt-0.5 font-medium ${clayAlterationRatio > 1.5 ? 'text-emerald-700' : 'text-charcoal-500'}`}>
                {clayAlterationRatio > 1.5 ? 'Hydroxyl Alteration' : 'Weak Clay'}
              </span>
            </div>

            <div className="bg-charcoal-50 p-3 rounded-xl border border-charcoal-200 text-center">
              <span className="text-[10px] text-charcoal-500 block uppercase font-medium">NDVI Mask</span>
              <span className="text-lg font-bold text-charcoal-900 font-mono">{ndviVal}</span>
              <span className={`text-[10px] block mt-0.5 font-medium ${ndviVal < 0.25 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {ndviVal < 0.25 ? 'Exposed Rock / Scrub' : 'Dense Canopy Mask'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* CSV File Upload Area */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-charcoal-200">
          <div>
            <h3 className="font-bold text-charcoal-900 text-base">
              Field Data CSV Ingestion
            </h3>
            <p className="text-xs text-charcoal-500">
              Upload field geochemical assay or coordinates CSV (format: ID, Name, Lat, Lng, B2, B4, B8, B11, B12).
            </p>
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sage-800 hover:bg-sage-700 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            <span>Select CSV File</span>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {uploadStatus && (
          <div className="p-3 bg-sage-50 border border-sage-200 rounded-xl text-xs text-sage-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-sage-700 shrink-0" />
            <span>{uploadStatus}</span>
          </div>
        )}

        {/* Uploaded records table */}
        {uploadedRecords.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-100 text-charcoal-700 uppercase font-semibold text-[10px] tracking-wider border-b border-charcoal-200">
                <tr>
                  <th className="py-2.5 px-3">Sample ID</th>
                  <th className="py-2.5 px-3">Sample Name</th>
                  <th className="py-2.5 px-3">Coordinates</th>
                  <th className="py-2.5 px-3">Fe Ratio (B4/B2)</th>
                  <th className="py-2.5 px-3">Clay Ratio (B11/B12)</th>
                  <th className="py-2.5 px-3">NDVI</th>
                  <th className="py-2.5 px-3 text-center">Predicted Prospectivity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-200">
                {uploadedRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-charcoal-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-charcoal-900">{rec.id}</td>
                    <td className="py-2.5 px-3 font-medium text-charcoal-800">{rec.name}</td>
                    <td className="py-2.5 px-3 font-mono text-charcoal-600">{rec.lat}°N, {rec.lng}°E</td>
                    <td className="py-2.5 px-3 font-mono text-charcoal-800">{rec.feRatio}</td>
                    <td className="py-2.5 px-3 font-mono text-charcoal-800">{rec.clayRatio}</td>
                    <td className="py-2.5 px-3 font-mono text-charcoal-800">{rec.ndvi}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                        rec.predictedScore >= 80 ? 'bg-sage-800 text-white' :
                        rec.predictedScore >= 60 ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        'bg-charcoal-200 text-charcoal-800'
                      }`}>
                        {rec.predictedScore}/100 ({rec.prospectivityTier})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
