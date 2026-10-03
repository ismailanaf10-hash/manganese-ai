export type TabType = 'overview' | 'map' | 'analysis' | 'upload' | 'production' | 'methodology';

export interface MineralBelt {
  id: string;
  name: string;
  district: string;
  coordinates: [number, number]; // [lat, lng]
  zoomLevel: number;
  hostRock: string;
  primaryOres: string[];
  geologicalAge: string;
  formationName: string;
  avgGradeMn: string;
  explorationStatus: string;
  description: string;
  keyMinesCount: number;
  boundaryGeoJson?: any;
}

export interface ProspectLocation {
  id: string;
  name: string;
  beltId: string;
  district: string;
  lat: number;
  lng: number;
  type: 'Working Mine' | 'Closed Mine' | 'Exploration Target' | 'Historic Pit' | 'Auction Block';
  estimatedGrade: string; // e.g. "38-44% Mn"
  oreType: string; // e.g. "Pyrolusite & Psilomelane"
  prospectivityScore: number; // 0-100
  confidenceScore: number; // 0-100
  environmentalStatus: 'Clear' | 'Buffer Zone (Caution)' | 'Protected Forest Constraint';
  spectralIronIndex: number;
  clayAlterationIndex: number;
  lineamentDensityScore: number;
  unfcStage: 'G4 Reconnaissance' | 'G3 Prospecting' | 'G2 Exploration' | 'G1 Mining';
  remarks: string;
}

export interface ProspectiveZone {
  id: string;
  name: string;
  beltId: string;
  coordinates: [number, number][]; // Polygon coords [lat, lng]
  center: [number, number];
  prospectivityTier: 'High' | 'Moderate' | 'Low';
  overallScore: number;
  factors: {
    lithologyScore: number;
    lineamentScore: number;
    spectralIronScore: number;
    clayAlterationScore: number;
    geomorphologyScore: number;
  };
  recommendedWork: string;
  environmentalCaution: string;
}

export interface AnalysisWeights {
  lithology: number;
  lineaments: number;
  spectralIron: number;
  clayAlteration: number;
  geomorphology: number;
  proximityKnown: number;
}

export interface ProductionYearData {
  year: number;
  productionThousandTonnes: number;
  targetDemandThousandTonnes: number;
  highGradeSharePercent: number; // >44% Mn
  mediumGradeSharePercent: number; // 35-44% Mn
  lowGradeSharePercent: number; // <35% Mn
  captiveProductionPercent: number;
  merchantProductionPercent: number;
  keyEvents: string;
}

export interface BottleneckFactor {
  category: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  impactDescription: string;
  remedialMeasure: string;
  unfcPhase: string;
}
