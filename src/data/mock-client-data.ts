// src/data/mock-client-data.ts
import { 
  ClientProject, 
  ProjectTimeline, 
  ClientProfile, 
  RecentActivity,
  BeforeAfterPhoto,
  DailyReportSummary 
} from '@/types/client.types';

export const mockClientProjects: ClientProject[] = [
  {
    id: 'proj-client-001',
    vesselName: 'MV Sea Voyager',
    projectId: 'CDPLC-2025-048',
    projectName: 'Complete Dry Dock Repair',
    status: 'In Progress',
    phase: 'Hull Repair',
    progress: 68,
    dockNo: 'Dry Dock No. 03',
    startDate: '2025-10-10',
    expectedEndDate: '2025-11-15',
    remainingDays: 19,
    imageUrl: '/dockyard-bg.jpg',
    clientId: 'client-001',
    clientName: 'Ocean Shipping Lines Ltd.'
  },
  {
    id: 'proj-client-002',
    vesselName: 'MV Pacific Dream',
    projectId: 'CDPLC-2025-042',
    projectName: 'Engine Overhaul & Maintenance',
    status: 'Pending',
    phase: 'Engine Overhaul',
    progress: 0,
    dockNo: 'Repair Berth 2',
    startDate: '2025-10-15',
    expectedEndDate: '2025-11-20',
    remainingDays: 24,
    imageUrl: '/dockyard-bg.jpg',
    clientId: 'client-001',
    clientName: 'Ocean Shipping Lines Ltd.'
  },
  {
    id: 'proj-client-003',
    vesselName: 'MV Star Cruiser',
    projectId: 'CDPLC-2025-036',
    projectName: 'Annual Survey & Repairs',
    status: 'Completed',
    phase: 'Final Inspection',
    progress: 100,
    dockNo: 'Dry Dock No. 01',
    startDate: '2025-08-20',
    expectedEndDate: '2025-09-25',
    remainingDays: 0,
    imageUrl: '/dockyard-bg.jpg',
    clientId: 'client-001',
    clientName: 'Ocean Shipping Lines Ltd.'
  },
  {
    id: 'proj-client-004',
    vesselName: 'MV Atlantic Pearl',
    projectId: 'CDPLC-2025-052',
    projectName: 'Hull Coating & Propeller Works',
    status: 'Pending',
    phase: 'Hull Repair',
    progress: 0,
    dockNo: 'TBD',
    startDate: '2025-11-01',
    expectedEndDate: '2025-12-10',
    remainingDays: 44,
    imageUrl: '/dockyard-bg.jpg',
    clientId: 'client-001',
    clientName: 'Ocean Shipping Lines Ltd.'
  }
];

export const mockDailyReports: DailyReportSummary[] = [
  {
    id: 'report-001',
    date: '2025-10-26',
    dayOfProject: 16,
    workCompleted: [
      'Completed hull plate welding - Section A5 (5 plates)',
      'Applied primer coat to starboard side deck',
      'Propeller shaft alignment completed',
      'Engine room cleaning in progress'
    ],
    materialsUsed: [
      { name: 'Welding Electrodes', quantity: '15', unit: 'Kg' },
      { name: 'Paint Primer', quantity: '30', unit: 'Liters' },
      { name: 'Steel Plates', quantity: '5', unit: 'Sheets' }
    ],
    manHours: 156,
    tomorrowPlan: [
      'Start deck painting - Aft section',
      'Continue engine inspection',
      'Install new propeller bolts',
      'Quality control inspection at 2 PM'
    ],
    photoCount: 8,
    photos: ['/dockyard-bg.jpg'],
    supervisorName: 'Asanka Fernando',
    overallProgress: 68
  },
  {
    id: 'report-002',
    date: '2025-10-25',
    dayOfProject: 15,
    workCompleted: [
      'Hull cleaning completed - 100%',
      'Rudder inspection and minor repairs',
      'Started welding work on port side',
      'Safety equipment check completed'
    ],
    materialsUsed: [
      { name: 'Grinding Discs', quantity: '20', unit: 'Pieces' },
      { name: 'Welding Rods', quantity: '12', unit: 'Kg' },
      { name: 'Anti-corrosion Paint', quantity: '15', unit: 'Liters' }
    ],
    manHours: 144,
    tomorrowPlan: [
      'Complete welding Section A5',
      'Start primer application',
      'Propeller alignment work'
    ],
    photoCount: 6,
    photos: ['/dockyard-bg.jpg'],
    supervisorName: 'Asanka Fernando',
    overallProgress: 65
  },
  {
    id: 'report-003',
    date: '2025-10-24',
    dayOfProject: 14,
    workCompleted: [
      'Hull plate replacement - Section A4',
      'Electrical wiring inspection completed',
      'Deck surface preparation',
      'Material procurement for next phase'
    ],
    materialsUsed: [
      { name: 'Steel Plates', quantity: '8', unit: 'Sheets' },
      { name: 'Electrical Cable', quantity: '50', unit: 'Meters' },
      { name: 'Sandpaper Rolls', quantity: '10', unit: 'Rolls' }
    ],
    manHours: 152,
    tomorrowPlan: [
      'Complete hull cleaning',
      'Rudder inspection',
      'Start welding port side'
    ],
    photoCount: 7,
    photos: ['/dockyard-bg.jpg'],
    supervisorName: 'Asanka Fernando',
    overallProgress: 62
  }
];

export const mockProjectTimeline: ProjectTimeline = {
  projectId: 'proj-client-001',
  reports: mockDailyReports,
  milestones: [
    {
      id: 'milestone-001',
      title: 'Project Initiation',
      date: '2025-10-10',
      completed: true,
      description: 'Vessel docked and initial inspection completed'
    },
    {
      id: 'milestone-002',
      title: 'Hull Cleaning Phase',
      date: '2025-10-15',
      completed: true,
      description: 'Complete hull cleaning and surface preparation'
    },
    {
      id: 'milestone-003',
      title: 'Repair Works - Phase 1',
      date: '2025-10-25',
      completed: true,
      description: 'Hull welding and plate replacement'
    },
    {
      id: 'milestone-004',
      title: 'Painting & Coating',
      date: '2025-11-05',
      completed: false,
      description: 'Apply protective coatings and paint'
    },
    {
      id: 'milestone-005',
      title: 'Final Inspection',
      date: '2025-11-15',
      completed: false,
      description: 'Classification society inspection and handover'
    }
  ]
};

export const mockBeforeAfterPhotos: BeforeAfterPhoto[] = [
  {
    id: 'ba-001',
    beforeUrl: '/dockyard-bg.jpg',
    afterUrl: '/dockyard-bg.jpg',
    workType: 'Hull Welding',
    location: 'Port Side - Section A4',
    description: 'Hull plate replacement and welding work'
  },
  {
    id: 'ba-002',
    beforeUrl: '/dockyard-bg.jpg',
    afterUrl: '/dockyard-bg.jpg',
    workType: 'Deck Painting',
    location: 'Main Deck - Forward',
    description: 'Deck surface preparation and primer application'
  },
  {
    id: 'ba-003',
    beforeUrl: '/dockyard-bg.jpg',
    afterUrl: '/dockyard-bg.jpg',
    workType: 'Propeller Maintenance',
    location: 'Propeller Assembly',
    description: 'Propeller cleaning and polishing'
  }
];

export const mockRecentActivities: RecentActivity[] = [
  {
    id: 'activity-001',
    type: 'milestone',
    projectId: 'proj-client-001',
    vesselName: 'MV Sea Voyager',
    title: 'Milestone Completed',
    description: 'Repair Works - Phase 1 completed successfully',
    timestamp: '2025-10-25 16:30'
  },
  {
    id: 'activity-002',
    type: 'photo',
    projectId: 'proj-client-001',
    vesselName: 'MV Sea Voyager',
    title: 'Photos Added',
    description: '8 new photos uploaded for Day 16',
    timestamp: '2025-10-26 14:15'
  },
  {
    id: 'activity-003',
    type: 'report',
    projectId: 'proj-client-002',
    vesselName: 'MV Pacific Dream',
    title: 'Daily Report Submitted',
    description: 'Day 11 report submitted - 45% progress',
    timestamp: '2025-10-26 17:20'
  },
  {
    id: 'activity-004',
    type: 'status',
    projectId: 'proj-client-001',
    vesselName: 'MV Sea Voyager',
    title: 'Status Update',
    description: 'Project on schedule - Expected completion Nov 15',
    timestamp: '2025-10-26 09:00'
  },
  {
    id: 'activity-005',
    type: 'milestone',
    projectId: 'proj-client-002',
    vesselName: 'MV Pacific Dream',
    title: 'Milestone Completed',
    description: 'Engine disassembly completed',
    timestamp: '2025-10-24 15:45'
  }
];

export const mockClientProfile: ClientProfile = {
  id: 'client-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@oceanshipping.com',
  phone: '+94 77 123 4567',
  companyName: 'Ocean Shipping Lines Ltd.',
  address: '123 Marine Drive, Colombo 03, Sri Lanka',
  notificationPreferences: {
    emailReports: true,
    smsAlerts: true,
    projectUpdates: true,
    maintenanceReminders: true
  }
};

// Helper functions
export function getClientProject(projectId: string): ClientProject | undefined {
  return mockClientProjects.find(p => p.id === projectId);
}

export function getActiveProjects(): ClientProject[] {
  return mockClientProjects.filter(p => p.status === 'In Progress');
}

export function getCompletedProjects(): ClientProject[] {
  return mockClientProjects.filter(p => p.status === 'Completed');
}

export function getPendingProjects(): ClientProject[] {
  return mockClientProjects.filter(p => p.status === 'Pending');
}

export function getProjectTimeline(projectId: string): ProjectTimeline | undefined {
  if (projectId === 'proj-client-001') {
    return mockProjectTimeline;
  }
  return undefined;
}
