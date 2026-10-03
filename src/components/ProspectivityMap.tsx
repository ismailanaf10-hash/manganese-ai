import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { KARNATAKA_BELTS, PROSPECT_LOCATIONS, PROSPECTIVE_POLYGONS } from '../data/karnatakaManganeseData';
import type { MineralBelt, ProspectLocation } from '../types';
import { 
  Filter, 
  Compass, 
  Crosshair,
  Sparkles,
  X
} from 'lucide-react';

// Custom Map Controller to smoothly handle Fly-To navigation
const MapController: React.FC<{ targetCoords: [number, number]; targetZoom: number }> = ({ targetCoords, targetZoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(targetCoords, targetZoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [targetCoords, targetZoom, map]);
  return null;
};

// Map click listener to calculate simulated prospectivity at any clicked location
interface ClickedPointInfo {
  lat: number;
  lng: number;
  score: number;
  lithology: string;
  lineamentDistanceKm: number;
  spectralIronIndex: number;
  vegetationCoverPct: number;
  estimatedFormation: string;
  environmentalFlag: string;
}

const MapClickListener: React.FC<{ onLocationClick: (info: ClickedPointInfo) => void }> = ({ onLocationClick }) => {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      let minDistanceToBelt = 999;
      let closestBelt = KARNATAKA_BELTS[0];

      KARNATAKA_BELTS.forEach((belt) => {
        const d = Math.sqrt(Math.pow(lat - belt.coordinates[0], 2) + Math.pow(lng - belt.coordinates[1], 2)) * 111;
        if (d < minDistanceToBelt) {
          minDistanceToBelt = d;
          closestBelt = belt;
        }
      });

      const baseScore = Math.max(15, Math.min(96, Math.round(92 - minDistanceToBelt * 1.1 + (Math.sin(lat * 10) + Math.cos(lng * 10)) * 6)));
      const ironRatio = +(0.4 + (baseScore / 100) * 0.55).toFixed(2);
      const vegPct = Math.round(30 + Math.abs(Math.sin(lat + lng)) * 45);

      onLocationClick({
        lat: +lat.toFixed(4),
        lng: +lng.toFixed(4),
        score: baseScore,
        lithology: minDistanceToBelt < 25 ? closestBelt.hostRock.split(',')[0] : 'Granitic Gneiss / Peninsular Gneissic Complex (Barren)',
        lineamentDistanceKm: +(Math.max(0.4, (minDistanceToBelt * 0.15) + 0.3)).toFixed(1),
        spectralIronIndex: ironRatio,
        vegetationCoverPct: vegPct,
        estimatedFormation: minDistanceToBelt < 30 ? closestBelt.formationName : 'Basement Granitoid Complex',
        environmentalFlag: minDistanceToBelt < 12 && closestBelt.id === 'north_kanara' ? 'Forest Buffer (Caution Required)' : 'Standard Revenue / Mine Lease Boundary'
      });
    }
  });
  return null;
};

// Structural lineaments (Simulated Shear Zones & Fault Traces in Karnataka)
const STRUCTURAL_LINEAMENTS: [number, number][][] = [
  // Sandur Basin Eastern Boundary Fault
  [[15.22, 76.45], [15.12, 76.55], [14.98, 76.62], [14.88, 76.68]],
  // Chitradurga Major Shear Zone (North-South trending)
  [[14.40, 76.35], [14.10, 76.40], [13.75, 76.42], [13.40, 76.58]],
  // Shimoga-Bhadravathi Fracture Line
  [[14.25, 75.30], [14.05, 75.42], [13.88, 75.60]],
  // Joida-Castlerock Regional Lineament
  [[15.35, 74.35], [15.15, 74.45], [14.90, 74.65]]
];

interface ProspectivityMapProps {
  selectedBelt: MineralBelt | null;
  onSelectBelt: (belt: MineralBelt) => void;
}

export const ProspectivityMap: React.FC<ProspectivityMapProps> = ({ selectedBelt, onSelectBelt }) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    selectedBelt ? selectedBelt.coordinates : [14.6, 76.0]
  );
  const [mapZoom, setMapZoom] = useState<number>(selectedBelt ? selectedBelt.zoomLevel : 8);

  // Layer Toggles
  const [showProspects, setShowProspects] = useState<boolean>(true);
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showLineaments, setShowLineaments] = useState<boolean>(true);
  const [showSpectralHeat, setShowSpectralHeat] = useState<boolean>(true);
  const [showEcoBuffer, setShowEcoBuffer] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('All');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(60);

  // Interactive Pin / Inspector Point
  const [inspectedPoint, setInspectedPoint] = useState<ClickedPointInfo | null>(null);
  const [selectedProspect, setSelectedProspect] = useState<ProspectLocation | null>(null);

  // Update map when selectedBelt prop changes
  useEffect(() => {
    if (selectedBelt) {
      setMapCenter(selectedBelt.coordinates);
      setMapZoom(selectedBelt.zoomLevel);
    }
  }, [selectedBelt]);

  // Filter prospects
  const filteredProspects = PROSPECT_LOCATIONS.filter(p => {
    if (filterType !== 'All' && p.type !== filterType) return false;
    if (p.prospectivityScore < minScoreFilter) return false;
    return true;
  });

  // Custom Div Icons for Prospects
  const createMarkerIcon = (type: string, score: number) => {
    let bgColor = '#15803d'; // green
    if (type === 'Working Mine') bgColor = '#047857'; // emerald
    else if (type === 'Auction Block') bgColor = '#1d4ed8'; // blue
    else if (type === 'Exploration Target') bgColor = '#b45309'; // amber
    else if (type === 'Closed Mine' || type === 'Historic Pit') bgColor = '#475569'; // slate

    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          background-color: ${bgColor}; 
          color: white; 
          width: 28px; 
          height: 28px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-weight: bold; 
          font-size: 10px; 
          border: 2px solid white; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
          font-family: monospace;
        ">
          ${score}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      
      {/* Top Controls & Navigation Bar */}
      <div className="bg-white rounded-xl border border-charcoal-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sage-700" />
            Quick Belts:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setMapCenter([14.6, 76.0]);
                setMapZoom(8);
              }}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 transition-colors cursor-pointer"
            >
              All Karnataka
            </button>
            {KARNATAKA_BELTS.map((belt) => (
              <button
                key={belt.id}
                onClick={() => {
                  onSelectBelt(belt);
                  setMapCenter(belt.coordinates);
                  setMapZoom(belt.zoomLevel);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedBelt?.id === belt.id
                    ? 'bg-sage-800 text-white shadow-2xs'
                    : 'bg-charcoal-50 hover:bg-charcoal-100 text-charcoal-700 border border-charcoal-200'
                }`}
              >
                {belt.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Layer Toggles Pill Group */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-50 border border-charcoal-200 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showProspects} 
              onChange={e => setShowProspects(e.target.checked)}
              className="rounded text-sage-700 focus:ring-sage-500 w-3.5 h-3.5"
            />
            <span className="text-charcoal-700 font-medium">Prospect Pins</span>
          </label>

          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-50 border border-charcoal-200 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showZones} 
              onChange={e => setShowZones(e.target.checked)}
              className="rounded text-sage-700 focus:ring-sage-500 w-3.5 h-3.5"
            />
            <span className="text-charcoal-700 font-medium">AI Zones</span>
          </label>

          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-50 border border-charcoal-200 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showLineaments} 
              onChange={e => setShowLineaments(e.target.checked)}
              className="rounded text-sage-700 focus:ring-sage-500 w-3.5 h-3.5"
            />
            <span className="text-charcoal-700 font-medium">Faults/Shears</span>
          </label>

          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-50 border border-charcoal-200 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showSpectralHeat} 
              onChange={e => setShowSpectralHeat(e.target.checked)}
              className="rounded text-sage-700 focus:ring-sage-500 w-3.5 h-3.5"
            />
            <span className="text-charcoal-700 font-medium">Fe-Oxide Index</span>
          </label>

          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-50 border border-charcoal-200 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showEcoBuffer} 
              onChange={e => setShowEcoBuffer(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
            />
            <span className="text-amber-800 font-medium">Eco-Buffers</span>
          </label>
        </div>
      </div>

      {/* Main Map + Sidebar Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Left / Center: Interactive Leaflet Map Container */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-charcoal-200 shadow-sm overflow-hidden flex flex-col h-[620px] relative">
          
          {/* Map Top Bar Instruction */}
          <div className="absolute top-3 left-12 z-20 bg-charcoal-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs shadow-md border border-charcoal-700 flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-sage-400 animate-pulse" />
            <span>Click any map location to inspect simulated prospectivity & geology</span>
          </div>

          {/* Map Legend Floating Box */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-charcoal-200 shadow-lg text-[11px] space-y-1.5 max-w-[220px]">
            <div className="font-bold text-charcoal-900 uppercase tracking-wider pb-1 border-b border-charcoal-200">
              Layer Legend
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-700 inline-block"></span>
              <span className="text-charcoal-700">Working Manganese Mine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-700 inline-block"></span>
              <span className="text-charcoal-700">Govt Auction Block (G2)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-700 inline-block"></span>
              <span className="text-charcoal-700">Exploration Target (G3/G4)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-red-600 inline-block border-t border-dashed"></span>
              <span className="text-charcoal-700">Structural Lineament / Fault</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-sage-500/40 border border-sage-700 inline-block"></span>
              <span className="text-charcoal-700">AI High Prospectivity Polygon</span>
            </div>
          </div>

          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <MapController targetCoords={mapCenter} targetZoom={mapZoom} />
            <MapClickListener onLocationClick={setInspectedPoint} />

            {/* Free Open-Source CartoDB Positron Basemap Tile Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {/* AI Prospective Polygons */}
            {showZones && PROSPECTIVE_POLYGONS.map((zone) => (
              <Polygon
                key={zone.id}
                positions={zone.coordinates}
                pathOptions={{
                  color: zone.prospectivityTier === 'High' ? '#15803d' : '#d97706',
                  fillColor: zone.prospectivityTier === 'High' ? '#22c55e' : '#f59e0b',
                  fillOpacity: 0.25,
                  weight: 2,
                  dashArray: '4, 4'
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="space-y-1.5 text-xs text-charcoal-100">
                    <div className="font-bold text-sage-300 text-sm">{zone.name}</div>
                    <div>Overall Prospectivity: <strong className="text-white font-mono">{zone.overallScore}/100 ({zone.prospectivityTier})</strong></div>
                    <div className="text-charcoal-300 text-[11px]">{zone.recommendedWork}</div>
                    <div className="text-amber-400 text-[10px] font-medium mt-1">⚠️ {zone.environmentalCaution}</div>
                  </div>
                </Popup>
              </Polygon>
            ))}

            {/* Structural Lineaments & Shear Zones */}
            {showLineaments && STRUCTURAL_LINEAMENTS.map((coords, idx) => (
              <Polyline
                key={`lineament-${idx}`}
                positions={coords}
                pathOptions={{
                  color: '#dc2626',
                  weight: 2.5,
                  opacity: 0.75,
                  dashArray: '6, 6'
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="text-xs text-charcoal-100">
                    <span className="font-semibold text-red-300">Regional Shear Zone / Fault Lineament #{idx + 1}</span>
                    <p className="text-[11px] text-charcoal-300 mt-1">Conduit for supergene manganese fluid migration and epigenetic enrichment.</p>
                  </div>
                </Popup>
              </Polyline>
            ))}

            {/* Synthetic Fe-Oxide / Alteration Index Anomalies */}
            {showSpectralHeat && PROSPECT_LOCATIONS.map((loc) => (
              <Circle
                key={`heat-${loc.id}`}
                center={[loc.lat, loc.lng]}
                radius={2200}
                pathOptions={{
                  color: 'transparent',
                  fillColor: '#ea580c',
                  fillOpacity: 0.15
                }}
              />
            ))}

            {/* Eco-Sensitive / Reserve Forest Simulated Buffers */}
            {showEcoBuffer && (
              <>
                <Circle
                  center={[15.25, 74.45]}
                  radius={7500}
                  pathOptions={{
                    color: '#e11d48',
                    fillColor: '#f43f5e',
                    fillOpacity: 0.2,
                    dashArray: '3, 3'
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="text-xs text-charcoal-100">
                      <strong className="text-rose-400">Dandeli Eco-Sensitive Buffer Zone (Uttara Kannada)</strong>
                      <p className="text-[11px] text-charcoal-300">Strict non-invasive drone and remote sensing exploration only. Heavy drilling restricted.</p>
                    </div>
                  </Popup>
                </Circle>
                <Circle
                  center={[15.02, 76.60]}
                  radius={4000}
                  pathOptions={{
                    color: '#ca8a04',
                    fillColor: '#eab308',
                    fillOpacity: 0.18,
                    dashArray: '3, 3'
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="text-xs text-charcoal-100">
                      <strong className="text-amber-400">Sandur South Forest Buffer</strong>
                      <p className="text-[11px] text-charcoal-300">500m mandatory green-belt buffer from ridge crown reserve forest.</p>
                    </div>
                  </Popup>
                </Circle>
              </>
            )}

            {/* Catalogued Prospect Markers */}
            {showProspects && filteredProspects.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.lat, loc.lng]}
                icon={createMarkerIcon(loc.type, loc.prospectivityScore)}
                eventHandlers={{
                  click: () => setSelectedProspect(loc),
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="space-y-1.5 text-xs text-charcoal-100">
                    <div className="flex items-center justify-between gap-2 border-b border-charcoal-700 pb-1">
                      <span className="font-bold text-white text-sm">{loc.name}</span>
                      <span className="font-mono text-sage-300 font-bold">{loc.prospectivityScore}/100</span>
                    </div>
                    <div className="text-[11px] text-charcoal-300">
                      <div>Status: <strong className="text-white">{loc.type}</strong> ({loc.unfcStage})</div>
                      <div>Estimated Grade: <strong className="text-sage-300">{loc.estimatedGrade}</strong></div>
                      <div>Primary Ore: {loc.oreType}</div>
                      <div>Spectral Fe Index: {loc.spectralIronIndex} | Lineaments: {loc.lineamentDensityScore}</div>
                    </div>
                    <p className="text-[10px] text-charcoal-400 italic pt-1 border-t border-charcoal-800">
                      {loc.remarks}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Clicked / Inspected Point Pin */}
            {inspectedPoint && (
              <Marker
                position={[inspectedPoint.lat, inspectedPoint.lng]}
                icon={L.divIcon({
                  className: 'custom-click-pin',
                  html: `
                    <div style="
                      background-color: #0f172a; 
                      color: #4ade80; 
                      width: 32px; 
                      height: 32px; 
                      border-radius: 50%; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      font-weight: 800; 
                      font-size: 11px; 
                      border: 2px solid #4ade80; 
                      box-shadow: 0 0 15px rgba(74,222,128,0.6);
                    ">
                      🎯
                    </div>
                  `,
                  iconSize: [32, 32],
                  iconAnchor: [16, 16]
                })}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="text-xs text-charcoal-100 space-y-1">
                    <div className="font-bold text-sage-300">Inspected Coordinates</div>
                    <div>Lat: {inspectedPoint.lat}°N, Lng: {inspectedPoint.lng}°E</div>
                    <div>Synthetic Score: <strong className="text-white font-mono">{inspectedPoint.score}/100</strong></div>
                  </div>
                </Popup>
              </Marker>
            )}

          </MapContainer>
        </div>

        {/* Right Sidebar: Filters & Click Inspection Card */}
        <div className="space-y-4">
          
          {/* Filter Panel */}
          <div className="bg-white rounded-xl border border-charcoal-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-charcoal-200">
              <span className="text-xs font-bold text-charcoal-900 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-sage-700" />
                Filter Prospects
              </span>
              <span className="text-[10px] text-charcoal-500 font-mono">
                Showing {filteredProspects.length} of {PROSPECT_LOCATIONS.length}
              </span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-charcoal-700 block mb-1">
                Prospect / Mining Category
              </label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full text-xs rounded-lg border border-charcoal-300 bg-white px-2.5 py-1.5 text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-sage-600 cursor-pointer"
              >
                <option value="All">All Categories ({PROSPECT_LOCATIONS.length})</option>
                <option value="Working Mine">Working Mine</option>
                <option value="Auction Block">Govt Auction Block</option>
                <option value="Exploration Target">Exploration Target</option>
                <option value="Closed Mine">Closed Mine / Historic Pit</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-charcoal-700">Min Prospectivity Score</span>
                <span className="font-mono text-sage-800 font-bold">{minScoreFilter} / 100</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={minScoreFilter}
                onChange={e => setMinScoreFilter(+e.target.value)}
                className="w-full accent-sage-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Inspected Point Results Box */}
          {inspectedPoint ? (
            <div className="bg-charcoal-900 text-white rounded-xl p-4 border border-charcoal-700 shadow-md space-y-3 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-charcoal-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sage-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Spot Evaluation
                </div>
                <button
                  onClick={() => setInspectedPoint(null)}
                  className="text-charcoal-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-charcoal-400 uppercase tracking-wider block">Estimated Score</span>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {inspectedPoint.score}
                    <span className="text-xs text-charcoal-400 font-normal"> / 100</span>
                  </div>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold font-mono ${
                  inspectedPoint.score >= 80 ? 'bg-sage-800 text-sage-100' :
                  inspectedPoint.score >= 65 ? 'bg-amber-900 text-amber-100' :
                  'bg-charcoal-800 text-charcoal-300'
                }`}>
                  {inspectedPoint.score >= 80 ? 'High Prospective' : inspectedPoint.score >= 65 ? 'Moderate Tier' : 'Low Potential'}
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-charcoal-300 pt-1">
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Coordinates:</span>
                  <span className="font-mono text-white">{inspectedPoint.lat}°N, {inspectedPoint.lng}°E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Formation:</span>
                  <span className="text-right text-white font-medium truncate max-w-[150px]">{inspectedPoint.estimatedFormation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Fault Proximity:</span>
                  <span className="font-mono text-sage-300">{inspectedPoint.lineamentDistanceKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Spectral Fe Index:</span>
                  <span className="font-mono text-white">{inspectedPoint.spectralIronIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Canopy Shield:</span>
                  <span className="font-mono text-white">{inspectedPoint.vegetationCoverPct}%</span>
                </div>
              </div>

              <div className="pt-2 border-t border-charcoal-800 text-[10px] text-amber-300">
                ⚠️ Model estimate for reconnaissance prioritization only. UNFC G4 ground validation required.
              </div>
            </div>
          ) : (
            <div className="bg-charcoal-50 rounded-xl p-4 border border-dashed border-charcoal-300 text-center space-y-2">
              <Crosshair className="w-6 h-6 text-charcoal-400 mx-auto" />
              <div className="text-xs font-semibold text-charcoal-700">No Location Pin Selected</div>
              <p className="text-[11px] text-charcoal-500">
                Click anywhere on the Karnataka map to calculate instant prospective scores and lithological indicators.
              </p>
            </div>
          )}

          {/* Selected Prospect Details Drawer (if any) */}
          {selectedProspect && (
            <div className="bg-white rounded-xl border border-sage-300 p-4 shadow-sm space-y-2.5 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sage-700 font-bold block">
                    {selectedProspect.id} • {selectedProspect.district}
                  </span>
                  <h4 className="font-bold text-charcoal-900 text-sm">{selectedProspect.name}</h4>
                </div>
                <button onClick={() => setSelectedProspect(null)} className="text-charcoal-400 hover:text-charcoal-700 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-charcoal-50 p-2.5 rounded-lg border border-charcoal-200">
                <div>
                  <span className="text-charcoal-500 block">Grade</span>
                  <span className="font-bold text-charcoal-900">{selectedProspect.estimatedGrade}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block">UNFC Stage</span>
                  <span className="font-bold text-sage-800">{selectedProspect.unfcStage}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-charcoal-500 block">Mineralogy</span>
                  <span className="font-medium text-charcoal-800">{selectedProspect.oreType}</span>
                </div>
              </div>

              <p className="text-[11px] text-charcoal-600 leading-relaxed">
                {selectedProspect.remarks}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
