// src/data/mock-daily-activity.ts
export interface DailyTask {
  type: string;
  photoCount: number;
  
}

export interface DailyIssue {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  impactLevel?: 'Minor' | 'Moderate' | 'Major';
  timeLost?: number;
  actionTaken?: string;
}

export interface MaterialUsed {
  name: string;
  quantity: string;
}

export interface EquipmentUsed {
  name: string;
  hours: number;
  status: 'Working' | 'Needs Service' | 'Out of Service';
}

export interface SafetyObservation {
  briefing: boolean;
  briefingTime?: string;
  attendees?: number;
  ppeCompliance: string;
  incidents: boolean;
}

export interface QualityControl {
  notes: string;
}

export interface ProgressSummary {
  summary: string;
}

export interface TomorrowPlan {
  task: string;
}

export interface Signature {
  signatureData: string; // Base64 data URL for the signature
}

export const mockDailyTasks: DailyTask[] = [
  { type: 'Hull Welding', photoCount: 7 },
  { type: 'Deck Painting', photoCount: 3 },
  { type: 'Engine Inspection', photoCount: 2 },
  { type: 'Propeller Maintenance', photoCount: 4 },
  { type: 'Electrical Wiring', photoCount: 5 },
];

export const mockDailyIssues: DailyIssue[] = [
  {
    title: 'Material Shortage',
    description: 'Running low on welding rods for port side work',
    priority: 'Medium',
    impactLevel: 'Minor',
    timeLost: 0.5,
    actionTaken: 'Informed stores manager.',
  },
];

export const mockMaterialsUsed: MaterialUsed[] = [
  { name: 'Welding Electrodes', quantity: '12 Kg' },
  { name: 'Paint Primer', quantity: '25 Liters' },
];

export const mockEquipmentUsed: EquipmentUsed[] = [
  { name: 'Welding Machine #3', hours: 8, status: 'Working' },
  { name: 'Paint Sprayer', hours: 7, status: 'Needs Service' },
];

export const mockSafetyObservation: SafetyObservation = {
  briefing: true,
  briefingTime: '7:00 AM',
  attendees: 18,
  ppeCompliance: '100%',
  incidents: false,
};

export const mockQualityControl: QualityControl = {
  notes: 'All welds passed initial inspection. Painting quality satisfactory.',
};

export const mockProgressSummary: ProgressSummary = {
  summary: 'Completed 80% of hull welding and 50% of deck painting.',
};

export const mockTomorrowPlan: TomorrowPlan[] = [
  { task: 'Continue hull welding with new steel plates' },
  { task: 'Finish deck painting' },
];

export const mockSignature: Signature = {
  signatureData: '', // Empty initially, will be populated by canvas
};