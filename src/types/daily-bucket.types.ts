// src/types/daily-bucket.types.ts
export interface DailyPhoto {
  id: string;
  timestamp: string;
  workType: string;
  location: string;
  description?: string;
  projectId: string;
  imageUrl: string;
}

export interface DailyIssue {
  id: string;
  timestamp: string;
  issueType: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  projectId: string;
}

export interface DailyBucket {
  projectId: string;
  date: string;
  photos: DailyPhoto[];
  issues: DailyIssue[];
  workCompleted: string[];
}

// Mock data for the current day's bucket
export const mockDailyBucket: DailyBucket = {
  projectId: 'proj-01', // MV Sea Princess
  date: '2025-10-22',
  photos: [
    {
      id: 'photo-001',
      timestamp: '2025-10-22T10:32:00Z',
      workType: 'Hull Welding',
      location: 'Drydock 2 - Port Side',
      description: 'Section A3-12 welding complete',
      projectId: 'proj-01',
      imageUrl: '/dockyard-bg.jpg'
    },
    {
      id: 'photo-002',
      timestamp: '2025-10-22T11:15:00Z',
      workType: 'Deck Painting',
      location: 'Bow Section',
      description: 'Primer coat applied',
      projectId: 'proj-01',
      imageUrl: '/dockyard-bg.jpg'
    },
    {
      id: 'photo-003',
      timestamp: '2025-10-22T14:45:00Z',
      workType: 'Engine Inspection',
      location: 'Engine Room',
      description: 'Main engine maintenance check',
      projectId: 'proj-01',
      imageUrl: '/dockyard-bg.jpg'
    }
  ],
  issues: [
    {
      id: 'issue-001',
      timestamp: '2025-10-22T13:20:00Z',
      issueType: 'Material Shortage',
      description: 'Running low on welding rods for port side work',
      severity: 'Medium',
      projectId: 'proj-01'
    }
  ],
  workCompleted: [
    'Hull Welding - Section A3-12',
    'Deck Painting - Bow Section Primer',
    'Engine Inspection - Main Engine Check'
  ]
};
