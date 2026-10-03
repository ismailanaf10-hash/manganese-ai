import React from 'react';
import { ShieldAlert, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-charcoal-300 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-charcoal-200 pb-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Scientific Principles & Ground-Truthing Disclaimer</span>
          </div>
          <button 
            onClick={onClose}
            className="text-charcoal-400 hover:text-charcoal-700 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs sm:text-sm text-charcoal-700 space-y-3 leading-relaxed">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-lg space-y-1">
            <strong className="text-amber-900 block font-semibold">1. Satellite Remote Sensing & Subsurface Reality:</strong>
            <p>
              Optical (Sentinel-2, Landsat) and synthetic aperture radar (Sentinel-1) sensors record only surface reflectance, iron-oxide gossan staining, and structural fractures. They <span className="font-semibold text-charcoal-900">cannot penetrate rock beds to detect underground manganese ore bodies or establish commercial grade</span>.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-charcoal-900 block font-semibold">2. UNFC-1997 & CRIRSCO Regulatory Compliance:</strong>
            <p>
              This tool provides decision support for <strong>UNFC G4 (Reconnaissance)</strong> and <strong>G3 (Prospecting)</strong> stage prioritization. Upgrading any prospective polygon to UNFC G2/G1 reserves strictly requires physical trenching, continuous core drilling, multi-element chemical assays, and validation by a certified Competent Person under Indian Minerals Rules (MEMC 2015).
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-charcoal-900 block font-semibold">3. Illustrative Datasets & Model Transparency:</strong>
            <p>
              All baseline figures, mineral prospective indices, and simulated spectral values are synthesized based on open scientific literature (Geological Survey of India, Indian Bureau of Mines) and clearly marked as illustrative.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-charcoal-900 block font-semibold">4. Zero-Cost Open Infrastructure:</strong>
            <p>
              Developed using 100% free and open-source geospatial libraries (Leaflet, OpenStreetMap, Recharts) requiring zero paid API keys or commercial licensing fees.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-charcoal-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            I Understand & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
