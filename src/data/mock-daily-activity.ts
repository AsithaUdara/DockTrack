// src/data/mock-daily-activity.ts
export interface DailyTask {
  type: string;
  photoCount: number;
}

export interface DailyIssue {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export const mockDailyTasks: DailyTask[] = [
  { type: 'Hull Welding', photoCount: 7 },
  { type: 'Deck Painting', photoCount: 3 },
  { type: 'Engine Inspection', photoCount: 2 },
];

export const mockDailyIssues: DailyIssue[] = [
  { 
    title: 'Material Shortage', 
    description: 'Running low on welding rods for port side work',
    priority: 'Medium'
  },
];
