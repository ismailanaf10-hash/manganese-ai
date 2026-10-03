import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { PRODUCTION_HISTORY, PRODUCTION_BOTTLENECK_FACTORS } from '../data/karnatakaManganeseData';
import { 
  TrendingDown, 
  Zap
} from 'lucide-react';

export const ProductionInsights: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingDown className="w-4 h-4 text-amber-600" />
            Supply Chain & Production Shortfall Investigation
          </div>
          <h2 className="text-2xl font-bold text-charcoal-900">
            Karnataka Manganese Production Diagnostics & Deficit Analysis
          </h2>
          <p className="text-xs text-charcoal-600 mt-1 max-w-3xl">
            Investigating the multi-dimensional causes behind Karnataka's widening manganese production deficit (~56% below domestic steel & ferro-alloy demand) and diagnosing strategic solutions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-amber-900 self-start md:self-auto">
          <span>2025 Projected Deficit: -2.04 Million Tonnes</span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-charcoal-200 shadow-xs">
          <span className="text-[11px] font-medium text-charcoal-500 uppercase block">2025 Annual Output</span>
          <div className="text-2xl font-bold text-charcoal-900 font-mono mt-1">1.61 MT</div>
          <p className="text-[11px] text-charcoal-500 mt-0.5">Down from historic peaks &gt; 3.0 MT</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-charcoal-200 shadow-xs">
          <span className="text-[11px] font-medium text-charcoal-500 uppercase block">Ferro-Alloy Industry Demand</span>
          <div className="text-2xl font-bold text-amber-700 font-mono mt-1">3.65 MT</div>
          <p className="text-[11px] text-amber-600 mt-0.5">Deficit met through costly imports</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-charcoal-200 shadow-xs">
          <span className="text-[11px] font-medium text-charcoal-500 uppercase block">Low-Grade Stockpile at Pithead</span>
          <div className="text-2xl font-bold text-sage-800 font-mono mt-1">4.50+ MT</div>
          <p className="text-[11px] text-charcoal-500 mt-0.5">Siliceous (&lt;32% Mn) waiting beneficiation</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-charcoal-200 shadow-xs">
          <span className="text-[11px] font-medium text-charcoal-500 uppercase block">Merchant Supply Share</span>
          <div className="text-2xl font-bold text-charcoal-900 font-mono mt-1">22% vs 78% Captive</div>
          <p className="text-[11px] text-charcoal-500 mt-0.5">Severe open-market squeeze for non-integrated smelters</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Production vs Target Demand Gap */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
            <div>
              <h3 className="text-sm font-bold text-charcoal-900">
                Production Output vs Domestic Demand (2014-2025)
              </h3>
              <p className="text-[11px] text-charcoal-500">
                In Thousand Metric Tonnes (Karnataka State Baselines)
              </p>
            </div>
            <span className="text-[10px] font-mono bg-charcoal-100 px-2 py-0.5 rounded text-charcoal-700">
              Supply Gap
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={PRODUCTION_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                  formatter={(value: any, name: any) => [`${value}k Tonnes`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="targetDemandThousandTonnes" name="Target Demand" fill="#fef3c7" stroke="#d97706" strokeWidth={2} />
                <Bar dataKey="productionThousandTonnes" name="Actual Karnataka Production" fill="#15803d" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-charcoal-600 bg-charcoal-50 p-2.5 rounded-lg border border-charcoal-200">
            <strong>Key Takeaway:</strong> Production has stagnated between 1.3-1.6 MT/year due to mining lease re-auction transitions and lack of greenfield G2 discovery, while domestic ferro-alloy demand has surged 49%.
          </p>
        </div>

        {/* Chart 2: Grade Quality Erosion & Low-Grade Accumulation */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
            <div>
              <h3 className="text-sm font-bold text-charcoal-900">
                Ore Grade Distribution Breakdown (% Share)
              </h3>
              <p className="text-[11px] text-charcoal-500">
                Depletion of high-grade (&gt;44% Mn) vs Low-grade accumulation
              </p>
            </div>
            <span className="text-[10px] font-mono bg-charcoal-100 px-2 py-0.5 rounded text-charcoal-700">
              Grade Erosion
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={PRODUCTION_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                  formatter={(value: any, name: any) => [`${value}%`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="highGradeSharePercent" name="High Grade (>44% Mn)" stackId="a" fill="#047857" />
                <Bar dataKey="mediumGradeSharePercent" name="Medium Grade (35-44% Mn)" stackId="a" fill="#3b82f6" />
                <Bar dataKey="lowGradeSharePercent" name="Low Grade Siliceous (<35% Mn)" stackId="a" fill="#d97706" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-charcoal-600 bg-charcoal-50 p-2.5 rounded-lg border border-charcoal-200">
            <strong>Beneficiation Imperative:</strong> High-grade ore share fell from 38% to 18%, while low-grade siliceous ore rose to 32%. Processing low-grade stockpiles via heavy media separation is critical to bridging the gap.
          </p>
        </div>

      </div>

      {/* Root-Cause Bottleneck Diagnostics Matrix */}
      <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-charcoal-900">
            Four Core Drivers of Karnataka Production Shortfalls
          </h3>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Detailed analytical breakdown of structural, regulatory, metallurgical, and infrastructural friction points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTION_BOTTLENECK_FACTORS.map((factor, idx) => (
            <div 
              key={idx}
              className="bg-charcoal-50/70 rounded-xl p-5 border border-charcoal-200 space-y-3 hover:border-charcoal-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-charcoal-600 uppercase tracking-wider">
                    {factor.category}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                    factor.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {factor.severity} Impact
                  </span>
                </div>

                <h4 className="font-bold text-charcoal-900 text-sm">
                  {factor.title}
                </h4>

                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {factor.impactDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-charcoal-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-sage-800 tracking-wider block">
                  Recommended AI & Policy Remedy:
                </span>
                <p className="text-xs text-sage-900 font-medium bg-sage-50/80 p-2.5 rounded-lg border border-sage-200">
                  {factor.remedialMeasure}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic 4-Point Action Roadmap */}
      <div className="bg-charcoal-900 text-white rounded-2xl p-6 border border-charcoal-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-sage-400" />
              Strategic Supply Chain Revitalization Roadmap
            </h3>
            <p className="text-xs text-charcoal-300 mt-0.5">
              Integrating AI exploration with downstream metallurgical infrastructure to achieve self-reliance.
            </p>
          </div>
          <span className="text-xs font-mono text-sage-300 bg-charcoal-800 px-3 py-1 rounded-lg border border-charcoal-700 hidden sm:inline">
            National Mineral Vision 2030
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-charcoal-800/80 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-sage-400 font-bold block text-sm">01. AI Target Feed</span>
            <p className="text-charcoal-300 text-[11px]">
              Accelerate greenfield target generation from G4 to G2 auction readiness using satellite SWIR band indices and lineament density modeling.
            </p>
          </div>

          <div className="bg-charcoal-800/80 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-sage-400 font-bold block text-sm">02. Beneficiation Hubs</span>
            <p className="text-charcoal-300 text-[11px]">
              Set up common-user DMS (Dense Media Separation) and magnetic reduction roasting plants in Sandur-Hospet to upgrade 4.5 MT low-grade fines.
            </p>
          </div>

          <div className="bg-charcoal-800/80 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-sage-400 font-bold block text-sm">03. Fast-Track Auctions</span>
            <p className="text-charcoal-300 text-[11px]">
              Pre-embedded statutory forest & environmental clearances for lapsed non-forest lease blocks prior to state electronic auction.
            </p>
          </div>

          <div className="bg-charcoal-800/80 p-4 rounded-xl border border-charcoal-700 space-y-2">
            <span className="font-mono text-sage-400 font-bold block text-sm">04. Rail Siding Automation</span>
            <p className="text-charcoal-300 text-[11px]">
              Integrate Hospet/Sandur loading sidings into PM Gati Shakti railway freight corridors to cut mineral evacuation costs by ₹400/tonne.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
