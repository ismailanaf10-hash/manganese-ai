import { useState } from 'react';
import type { TabType, MineralBelt } from './types';
import { KARNATAKA_BELTS } from './data/karnatakaManganeseData';
import { Navbar } from './components/Navbar';
import { StudyAreaOverview } from './components/StudyAreaOverview';
import { ProspectivityMap } from './components/ProspectivityMap';
import { MultiCriteriaAnalysis } from './components/MultiCriteriaAnalysis';
import { DataUploadLab } from './components/DataUploadLab';
import { ProductionInsights } from './components/ProductionInsights';
import { MethodologyPage } from './components/MethodologyPage';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ShieldAlert } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedBelt, setSelectedBelt] = useState<MineralBelt | null>(KARNATAKA_BELTS[0]);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);

  const handleSelectBelt = (belt: MineralBelt) => {
    setSelectedBelt(belt);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-charcoal-900 flex flex-col font-sans selection:bg-sage-100 selection:text-sage-900">
      
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenDisclaimerModal={() => setIsDisclaimerOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'overview' && (
          <StudyAreaOverview 
            onSelectBelt={handleSelectBelt} 
            setActiveTab={setActiveTab} 
          />
        )}

        {activeTab === 'map' && (
          <ProspectivityMap 
            selectedBelt={selectedBelt} 
            onSelectBelt={handleSelectBelt} 
          />
        )}

        {activeTab === 'analysis' && (
          <MultiCriteriaAnalysis />
        )}

        {activeTab === 'upload' && (
          <DataUploadLab />
        )}

        {activeTab === 'production' && (
          <ProductionInsights />
        )}

        {activeTab === 'methodology' && (
          <MethodologyPage />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-950 text-charcoal-400 text-xs border-t border-charcoal-800 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sage-800 flex items-center justify-center text-white font-bold text-sm">
                Mn
              </div>
              <div>
                <span className="font-bold text-white text-sm tracking-tight">ManganeseAI Platform</span>
                <p className="text-[11px] text-charcoal-400">
                  AI-Assisted Mineral Prospectivity & Supply Shortfall Explorer | Karnataka, India
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <button 
                onClick={() => setIsDisclaimerOpen(true)}
                className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Ethical & Scientific Disclaimer
              </button>
              <button 
                onClick={() => setActiveTab('methodology')}
                className="text-charcoal-300 hover:text-white transition-colors cursor-pointer"
              >
                UNFC Exploration Stages
              </button>
              <button 
                onClick={() => setActiveTab('production')}
                className="text-charcoal-300 hover:text-white transition-colors cursor-pointer"
              >
                Production Gap Diagnostics
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-charcoal-500">
            <div>
              Built for Smart India Hackathon (SIH 2026) • Focus: Karnataka Dharwar Craton
            </div>
            <div className="font-mono text-[10px] text-charcoal-400">
              100% Free Open-Stack (₹0 API Cost) • Leaflet + OpenStreetMap + React
            </div>
          </div>
        </div>
      </footer>

      {/* Scientific & Ground-Truthing Disclaimer Modal */}
      <DisclaimerModal 
        isOpen={isDisclaimerOpen} 
        onClose={() => setIsDisclaimerOpen(false)} 
      />

    </div>
  );
}

export default App;
