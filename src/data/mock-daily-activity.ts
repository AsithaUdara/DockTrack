// src/data/mock-daily-activity.ts
export interface DailyTask {
  type: string;
  photoCount: number;
}

// src/data/mock-daily-activity.ts (relevant excerpt)
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

export interface ProgressSummary {
  summary: string;
}

export interface TomorrowPlan {
  task: string;
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
  },
  {
    title: 'Steel Plate Shortage',
    description: 'Steel plate A3-15 not available in stores. Welding stopped at 4:30 PM. Need urgent procurement.',
    priority: 'Medium',
    impactLevel: 'Minor',
    timeLost: 0.5,
    actionTaken: 'Informed stores manager. Moved team to deck painting work instead to maintain productivity.',
  },
];

export const mockMaterialsUsed: MaterialUsed[] = [
  { name: 'Welding Electrodes', quantity: '12 Kg' },
  { name: 'Paint Primer', quantity: '25 Liters' },
  { name: 'Steel Plates', quantity: '4 Sheets' },
];

export const mockEquipmentUsed: EquipmentUsed[] = [
  { name: 'Welding Machine #3', hours: 8, status: 'Working' },
  { name: 'Angle Grinder', hours: 6, status: 'Working' },
  { name: 'Paint Sprayer', hours: 7, status: 'Needs Service' },
  { name: 'Mobile Crane', hours: 4, status: 'Working' },
];

export const mockSafetyObservation: SafetyObservation = {
  briefing: true,
  briefingTime: '7:00 AM',
  attendees: 18,
  ppeCompliance: '100%',
  incidents: false,
};

export const mockProgressSummary: ProgressSummary = {
  summary: 'Completed 80% of hull welding and 50% of deck painting. Engine inspection on schedule.',
};

export const mockTomorrowPlan: TomorrowPlan[] = [
  { task: 'Continue hull welding with new steel plates' },
  { task: 'Finish deck painting' },
  { task: 'Start propeller maintenance' },
];