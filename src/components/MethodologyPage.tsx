import React from 'react';
import { METHODOLOGY_BAND_RATIOS } from '../data/karnatakaManganeseData';
import { 
  BookOpen, 
  ShieldAlert, 
  Scale
} from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sage-800 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-sage-700" />
            Scientific Architecture & Exploration Protocol
          </div>
          <h2 className="text-2xl font-bold text-charcoal-900">
            Exploration Methodology & Ethical Framework
          </h2>
          <p className="text-xs text-charcoal-600 mt-1 max-w-3xl">
            A rigorous, multi-layered geospatial decision framework adhering to UNFC 1997 and Indian Minerals Rules (MEMC 2015), combining open optical/radar satellite data with structural geology.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-charcoal-900 text-white px-3.5 py-2 rounded-xl text-xs font-mono font-bold self-start md:self-auto">
          <span>UNFC G4 to G2 Pathway</span>
        </div>
      </div>

      {/* Prominent Mandatory Ethics & Disclaimer Box */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 p-6 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
          Mandatory Scientific Disclaimer & Responsible AI Principles
        </div>
        <div className="text-xs sm:text-sm text-charcoal-800 space-y-2 leading-relaxed">
          <p>
            1. <strong>Surface vs Subsurface Distinction:</strong> Remote sensing optical/SWIR satellite imagery detects only the top few micrometers of bare surface reflectance, mineral gossans, and soil weathering halos. <span className="underline font-semibold text-charcoal-900">Satellite imagery alone never constitutes proof of underground manganese ore bodies or commercial reserves.</span>
          </p>
          <p>
            2. <strong>Illustrative Datasets & Model Unvalidated Notice:</strong> All prospectivity scores, simulated mineral band ratios, and spatial heatmaps in this prototype are generated for decision-support reconnaissance demonstration. Real-world commercial development requires official lease boundaries, physical core borehole assays, and Competent Person (CP) sign-off under CRIRSCO/UNFC norms.
          </p>
          <p>
            3. <strong>₹0 Budget Open-Stack Architecture:</strong> Built entirely with open-source frameworks (Leaflet, OpenStreetMap, Recharts, React, Vite) without requiring paid API subscriptions or commercial GIS software licenses.
          </p>
        </div>
      </div>

      {/* 4-Stage Exploration Pipeline */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-charcoal-900">
            4-Stage Spatial Multi-Criteria Exploration Pipeline
          </h3>
          <p className="text-xs text-charcoal-500 mt-0.5">
            How satellite data, lithology, and structural lineaments are converted into prioritized ground exploration targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          {/* Stage 1 */}
          <div className="bg-charcoal-50 p-4 rounded-xl border border-charcoal-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sage-800 font-bold text-xs">Stage 01</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-charcoal-200 font-mono">Sensors</span>
              </div>
              <h4 className="font-bold text-charcoal-900 text-sm mt-1">Satellite Pre-Processing</h4>
              <p className="text-charcoal-600 text-[11px] mt-1 leading-relaxed">
                Ingestion of Sentinel-2 (MSI) and Landsat-8/9 Level-2 bottom-of-atmosphere reflectance. Cloud masking, topographic illumination correction, and vegetation canopy index (NDVI) filtering.
              </p>
            </div>
            <div className="pt-2 border-t border-charcoal-200 text-[10px] font-mono text-charcoal-500">
              Output: Calibrated 10m/20m multispectral rasters
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-charcoal-50 p-4 rounded-xl border border-charcoal-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sage-800 font-bold text-xs">Stage 02</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-charcoal-200 font-mono">Band Algebra</span>
              </div>
              <h4 className="font-bold text-charcoal-900 text-sm mt-1">Spectral Index Extraction</h4>
              <p className="text-charcoal-600 text-[11px] mt-1 leading-relaxed">
                Computation of Iron-Oxide Ratio (B4/B2) for manganese gossans, Clay Alteration Ratio (B11/B12) for hydrothermal/supergene halos, and Sobel directional filtering for fault/lineament extraction.
              </p>
            </div>
            <div className="pt-2 border-t border-charcoal-200 text-[10px] font-mono text-charcoal-500">
              Output: Standardized continuous evidence rasters
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-charcoal-50 p-4 rounded-xl border border-charcoal-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sage-800 font-bold text-xs">Stage 03</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-charcoal-200 font-mono">AI / AHP</span>
              </div>
              <h4 className="font-bold text-charcoal-900 text-sm mt-1">Multi-Criteria Integration</h4>
              <p className="text-charcoal-600 text-[11px] mt-1 leading-relaxed">
                Spatial Multi-Criteria Evaluation (SMCE) via Analytic Hierarchy Process (AHP) and Random Forest prospective weights. Calculation of composite 0-100 prospectivity indices across cratonic basins.
              </p>
            </div>
            <div className="pt-2 border-t border-charcoal-200 text-[10px] font-mono text-charcoal-500">
              Output: Ranked prospective polygon clusters
            </div>
          </div>

          {/* Stage 4 */}
          <div className="bg-charcoal-50 p-4 rounded-xl border border-charcoal-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sage-800 font-bold text-xs">Stage 04</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-charcoal-200 font-mono">Ground Truth</span>
              </div>
              <h4 className="font-bold text-charcoal-900 text-sm mt-1">UNFC Ground-Truthing</h4>
              <p className="text-charcoal-600 text-[11px] mt-1 leading-relaxed">
                Generation of field exploration roadmaps: 100m soil geochemical traverses, electrical resistivity profiling, trenching, and systematic 50m diamond core drilling for G2/G1 reserve conversion.
              </p>
            </div>
            <div className="pt-2 border-t border-charcoal-200 text-[10px] font-mono text-charcoal-500">
              Output: UNFC-compliant auction dossier
            </div>
          </div>

        </div>
      </div>

      {/* Spectral Indices Mathematical Equations */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-bold text-charcoal-900">
            Remote Sensing Spectral Ratio Equations & Wavelengths
          </h3>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Mathematical basis for mineral absorption and reflectance features in Sentinel-2 and Landsat multispectral bands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {METHODOLOGY_BAND_RATIOS.map((ratio, idx) => (
            <div key={idx} className="bg-charcoal-50 rounded-xl p-4 border border-charcoal-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-charcoal-900 text-xs sm:text-sm">{ratio.name}</span>
                <span className="text-[10px] font-mono bg-charcoal-200 px-2 py-0.5 rounded text-charcoal-800">{ratio.wavelengths}</span>
              </div>

              <div className="p-2.5 bg-charcoal-900 text-sage-300 font-mono text-xs rounded-lg border border-charcoal-700">
                <code>{ratio.equation}</code>
              </div>

              <p className="text-xs text-charcoal-600 leading-relaxed">
                {ratio.significance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* UNFC Stage Alignment Matrix */}
      <div className="bg-charcoal-900 text-white rounded-2xl p-6 border border-charcoal-700 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-sage-400" />
            UNFC-1997 / Indian Minerals (MEMC) Rules 2015 Exploration Stages
          </h3>
          <p className="text-xs text-charcoal-300 mt-0.5">
            Clear mapping of where this AI tool sits in the statutory mineral exploration pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-charcoal-800 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-sage-300 font-bold block">G4: Reconnaissance</span>
            <span className="text-[10px] text-sage-400 font-semibold uppercase block">📍 Role of ManganeseAI</span>
            <p className="text-charcoal-300 text-[11px]">
              Regional satellite lineament mapping, airborne/satellite multispectral indices, and initial 1:50,000 scale basin delineation.
            </p>
          </div>

          <div className="bg-charcoal-800 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-amber-300 font-bold block">G3: Prospecting</span>
            <span className="text-[10px] text-amber-400 font-semibold uppercase block">Field Verification</span>
            <p className="text-charcoal-300 text-[11px]">
              Detailed 1:25,000 scale geological mapping, surface pitting/trenching, geochemical soil anomaly assays, and ground resistivity.
            </p>
          </div>

          <div className="bg-charcoal-800 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-blue-300 font-bold block">G2: General Exploration</span>
            <span className="text-[10px] text-blue-400 font-semibold uppercase block">Core Boreholes</span>
            <p className="text-charcoal-300 text-[11px]">
              Systematic diamond core borehole drilling on 50m-100m grid, 3D orebody wireframe modeling, and initial beneficiation tests.
            </p>
          </div>

          <div className="bg-charcoal-800 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-emerald-300 font-bold block">G1: Detailed Exploration</span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase block">Mine Feasibility</span>
            <p className="text-charcoal-300 text-[11px]">
              Close-spaced 25m drilling, bulk metallurgical sampling, pit slope geotechnical engineering, and formal DPR for production.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
