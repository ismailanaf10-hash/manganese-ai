import React from 'react';
import type { TabType } from '../types';
import { 
  Compass, 
  Map as MapIcon, 
  Sliders, 
  UploadCloud, 
  TrendingDown, 
  BookOpen, 
  ShieldAlert, 
  Layers
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenDisclaimerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDisclaimerModal }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Study Area', icon: <Layers className="w-4 h-4" /> },
    { id: 'map', label: 'Prospectivity Map', icon: <MapIcon className="w-4 h-4" />, badge: 'Interactive' },
    { id: 'analysis', label: 'Multi-Criteria Engine', icon: <Sliders className="w-4 h-4" /> },
    { id: 'upload', label: 'Data Lab & Upload', icon: <UploadCloud className="w-4 h-4" /> },
    { id: 'production', label: 'Production Shortfall', icon: <TrendingDown className="w-4 h-4" />, badge: '56% Gap' },
    { id: 'methodology', label: 'Methodology & Ethics', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-charcoal-300/40 shadow-xs">
      {/* Top Banner for SIH & Scientific Disclaimer */}
      <div className="bg-charcoal-900 text-charcoal-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sage-800 text-sage-100 border border-sage-600">
            SIH 2026 PROTOTYPE
          </span>
          <span className="text-charcoal-300 hidden sm:inline">|</span>
          <span className="text-charcoal-300 truncate">
            Target Focus: Karnataka Dharwar Craton Manganese Basins (Sandur, Shimoga, Chitradurga, Uttara Kannada)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenDisclaimerModal}
            className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            title="View Geological Evidence & Data Disclaimer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="underline text-[11px]">Scientific & Ground-Truthing Disclaimer</span>
          </button>
          <span className="text-charcoal-500 hidden md:inline">•</span>
          <span className="text-sage-300 font-mono text-[11px] hidden md:inline">Open FOSS GIS Engine (₹0 API Cost)</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal-900 to-sage-900 flex items-center justify-center text-white shadow-md border border-charcoal-700">
              <Compass className="w-5 h-5 text-sage-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-charcoal-900 font-sans">
                  Manganese<span className="text-sage-700 font-extrabold">AI</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-charcoal-100 text-charcoal-700 font-mono font-medium border border-charcoal-200">
                  v1.2-alpha
                </span>
              </div>
              <p className="text-[11px] text-charcoal-500 leading-none">
                AI-Assisted Manganese Prospectivity & Supply Explorer
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-charcoal-900 text-white shadow-xs'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-100/70'
                  }`}
                >
                  <span className={isActive ? 'text-sage-300' : 'text-charcoal-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive 
                        ? 'bg-sage-800 text-sage-200' 
                        : 'bg-charcoal-200 text-charcoal-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action / Mode Pill */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[11px] font-semibold text-charcoal-800">Dharwar Supergroup</span>
              <span className="text-[10px] text-sage-700 font-mono">Neoarchean BMF Basin</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-sage-500 ring-4 ring-sage-100 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex overflow-x-auto px-3 py-2 border-t border-charcoal-200 bg-charcoal-50 gap-1.5 scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-charcoal-900 text-white'
                  : 'bg-white text-charcoal-700 border border-charcoal-200'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
