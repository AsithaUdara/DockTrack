// src/data/mock-reports.ts
import { Report, DetailedReport, ReportSummary } from '@/types/report.types';

export const mockSupervisorReports: Report[] = [
  // Pending
  { id: 'REP-001', vesselName: 'MV Sea Princess', date: '2025-10-21', dayOfProject: 12, status: 'Pending' },

  // Drafts
  { id: 'REP-002', vesselName: 'MV Ocean Star', date: '2025-10-21', dayOfProject: 5, status: 'Draft' },
  { id: 'REP-003', vesselName: 'MV Sea Princess', date: '2025-10-20', dayOfProject: 11, status: 'Draft' },

  // Approved
  { id: 'REP-004', vesselName: 'MV Sea Princess', date: '2025-10-19', dayOfProject: 10, status: 'Approved' },
  { id: 'REP-005', vesselName: 'MV Sea Princess', date: '2025-10-18', dayOfProject: 9, status: 'Approved' },
  { id: 'REP-006', vesselName: 'MV Sea Princess', date: '2025-10-17', dayOfProject: 8, status: 'Approved' },

  // Revision
  { id: 'REP-007', vesselName: 'MV Pacific Dawn', date: '2025-10-20', dayOfProject: 18, status: 'Revision' },
];

export const mockDetailedReports: DetailedReport[] = [
  {
    // Basic Info
    id: 'MV-SP-D12-211025',
    vesselName: 'MV Sea Princess',
    date: '2025-10-21',
    dayOfProject: 12,
    status: 'Pending',
    
    // Extended Info
    projectId: 'PRJ-001',
    projectName: 'MV Sea Princess Dry Dock Repair',
    supervisorId: 'SUP-001',
    supervisorName: 'Asanka Fernando',
    submittedAt: '2025-10-21 17:18',
    overallProgress: 59,
    
    // Work Details
    tasks: [
      {
        id: 'TASK-001',
        workType: 'Hull Welding',
        location: 'Port Side - Section A3',
        plannedWork: 'Complete welding of hull plates A3-10 to A3-15 (5 plates total)',
        actuallyCompleted: 'Completed plates A3-10 to A3-14 successfully. Plate A3-15 pending due to material shortage. (4 of 5 plates = 80%)',
        completion: 80,
        quality: 'Good',
        photoIds: ['photo-001', 'photo-002', 'photo-003']
      },
      {
        id: 'TASK-002',
        workType: 'Deck Painting',
        location: 'Main Deck - Forward Section',
        plannedWork: 'Apply primer coat to main deck forward section',
        actuallyCompleted: 'Completed primer application to entire forward section. Surface preparation excellent.',
        completion: 100,
        quality: 'Excellent',
        photoIds: ['photo-004', 'photo-005']
      }
    ],
    
    // Manpower
    manpower: [
      { trade: 'Welders', workers: 8, hours: 8, totalHours: 64 },
      { trade: 'Fitters', workers: 4, hours: 8, totalHours: 32 },
      { trade: 'Painters', workers: 3, hours: 7, totalHours: 21 },
      { trade: 'Electricians', workers: 2, hours: 6, totalHours: 12 },
      { trade: 'Engineers', workers: 1, hours: 8, totalHours: 8 }
    ],
    totalWorkers: 18,
    totalManHours: 137,
    overtimeHours: 4,
    absentees: ['Kumar (Welder) - Sick leave'],
    
    // Materials
    materials: [
      { name: 'Welding Electrodes', quantity: '12', unit: 'Kg' },
      { name: 'Paint Primer', quantity: '25', unit: 'Liters' },
      { name: 'Steel Plates', quantity: '4', unit: 'Sheets' },
      { name: 'Grinding Discs', quantity: '15', unit: 'Pieces' }
    ],
    
    // Equipment
    equipment: [
      { name: 'Welding Machine #3', hours: 8, status: 'Working' },
      { name: 'Angle Grinder', hours: 6, status: 'Working' },
      { name: 'Paint Sprayer', hours: 7, status: 'Needs Service', notes: 'Nozzle clogging intermittently' },
      { name: 'Mobile Crane', hours: 4, status: 'Working' }
    ],
    
    // Weather
    weather: {
      morning: 'Sunny',
      afternoon: 'Partly Cloudy',
      temperature: '28°C',
      windSpeed: 'Low (5-10 km/h)',
      rain: false,
      impact: 'No Impact - Ideal working conditions'
    },
    
    // Safety
    safety: {
      briefingConducted: true,
      briefingTime: '7:00 AM',
      attendees: 18,
      ppeCompliance: 100,
      incidents: 0
    },
    
    // Issues
    issues: [
      {
        id: 'ISSUE-001',
        type: 'Material Shortage',
        description: 'Steel plate A3-15 not available in stores. Welding work on final plate stopped at 4:30 PM. Need urgent procurement.',
        actionTaken: 'Informed stores manager. Moved welding team to assist with deck painting to maintain productivity.',
        impact: 'Minor',
        timeLost: '0.5 hours',
        priority: 'medium',
        status: 'open',
        managerComments: []
      }
    ],
    
    // Tomorrow's Plan
    tomorrowPlan: {
      date: '2025-10-22',
      plannedWork: [
        {
          description: 'Complete welding plate A3-15 (when material received)',
          location: 'Port Side - A3',
          estimatedDuration: '2 hours',
          priority: 'high'
        },
        {
          description: 'Start deck painting - Aft section',
          location: 'Main Deck - Aft',
          estimatedDuration: '6 hours',
          priority: 'medium'
        },
        {
          description: 'Continue engine room inspection',
          location: 'Engine Room',
          estimatedDuration: '4 hours',
          priority: 'medium'
        },
        {
          description: 'Complete propeller shaft alignment',
          location: 'Propeller Shaft Area',
          estimatedDuration: '3 hours',
          priority: 'high'
        }
      ],
      requiredMaterials: [
        { name: 'Steel plate A3-15', urgent: true },
        { name: 'Additional primer paint', quantity: '20 Liters', urgent: false },
        { name: 'Welding electrodes', quantity: '10 Kg', urgent: false }
      ],
      requiredEquipment: [
        'Welding Machine #3',
        'Paint Sprayer (needs service)',
        'Alignment tools'
      ],
      expectedWorkers: 18,
      manpowerBreakdown: {
        'Welders': 8,
        'Painters': 4,
        'Fitters': 3,
        'Electricians': 2,
        'Engineers': 1
      },
      specialNotes: 'Classification society inspection team expected at 2:00 PM. Ensure welding area is ready for inspection.'
    },
    
    // Photos
    photos: [
      {
        id: 'photo-001',
        url: '/images/mock/welding-work-1.jpg',
        thumbnailUrl: '/images/mock/welding-work-1-thumb.jpg',
        workType: 'Hull Welding',
        location: 'Drydock 2 - Port Side',
        description: 'Hull plate welding in progress - Section A3 port side. Welder: Nimal. Quality: Good penetration',
        date: '2025-10-21',
        timestamp: '10:32 AM',
        gps: '6.9271°N, 79.8612°E',
        fileSize: '1.2MB'
      },
      {
        id: 'photo-002',
        url: '/images/mock/welding-work-2.jpg',
        thumbnailUrl: '/images/mock/welding-work-2-thumb.jpg',
        workType: 'Hull Welding',
        location: 'Drydock 2 - Port Side',
        description: 'Completed weld joint inspection - Plate A3-12',
        date: '2025-10-21',
        timestamp: '10:45 AM',
        gps: '6.9271°N, 79.8612°E',
        fileSize: '1.1MB'
      },
      {
        id: 'photo-003',
        url: '/images/mock/welding-work-3.jpg',
        thumbnailUrl: '/images/mock/welding-work-3-thumb.jpg',
        workType: 'Hull Welding',
        location: 'Drydock 2 - Port Side',
        description: 'Overall progress - 4 plates completed',
        date: '2025-10-21',
        timestamp: '11:45 AM',
        gps: '6.9271°N, 79.8612°E',
        fileSize: '1.3MB'
      },
      {
        id: 'photo-004',
        url: '/images/mock/painting-before.jpg',
        thumbnailUrl: '/images/mock/painting-before-thumb.jpg',
        workType: 'Deck Painting',
        location: 'Main Deck - Forward',
        description: 'Before: Deck surface prepared for primer',
        date: '2025-10-21',
        timestamp: '11:15 AM',
        gps: '6.9271°N, 79.8612°E',
        fileSize: '1.0MB'
      },
      {
        id: 'photo-005',
        url: '/images/mock/painting-after.jpg',
        thumbnailUrl: '/images/mock/painting-after-thumb.jpg',
        workType: 'Deck Painting',
        location: 'Main Deck - Forward',
        description: 'After: Primer coat applied - excellent coverage',
        date: '2025-10-21',
        timestamp: '14:15 PM',
        gps: '6.9271°N, 79.8612°E',
        fileSize: '1.1MB'
      }
    ],
    
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
    overallComments: 'Good progress today. Welding and painting on track. Material shortage minor issue - should resolve tomorrow. Team morale good. Quality standards maintained.',
    
    // Manager Review (empty for pending reports)
    managerComments: [],
    requiresUrgentAttention: true,
    hasUnresolvedIssues: true
  },
  
  // Add a second report that's already approved
  {
    id: 'MV-SP-D11-201025',
    vesselName: 'MV Sea Princess',
    date: '2025-10-20',
    dayOfProject: 11,
    status: 'Approved',
    projectId: 'PRJ-001',
    projectName: 'MV Sea Princess Dry Dock Repair',
    supervisorId: 'SUP-001',
    supervisorName: 'Asanka Fernando',
    submittedAt: '2025-10-20 17:15',
    overallProgress: 57,
    tasks: [],
    manpower: [],
    totalWorkers: 18,
    totalManHours: 142,
    overtimeHours: 2,
    absentees: [],
    materials: [],
    equipment: [],
    weather: {
      morning: 'Sunny',
      afternoon: 'Sunny',
      temperature: '30°C',
      windSpeed: 'Low',
      rain: false,
      impact: 'No Impact'
    },
    safety: {
      briefingConducted: true,
      briefingTime: '7:00 AM',
      attendees: 18,
      ppeCompliance: 100,
      incidents: 0
    },
    issues: [],
    tomorrowPlan: {
      date: '2025-10-21',
      plannedWork: [],
      expectedWorkers: 18
    },
    photos: [],
    signature: '',
    
    // This one has manager review
    managerComments: [
      {
        id: 'MC-001',
        reportId: 'MV-SP-D11-201025',
        authorId: 'MGR-001',
        authorName: 'Rohan Silva',
        role: 'Project Manager',
        text: 'Report approved. Excellent progress on hull cleaning phase. Photos clearly show quality workmanship. Keep maintaining these standards throughout the project.',
        timestamp: '2025-10-21 08:30 AM',
        actionItems: []
      }
    ],
    approvalDecision: {
      decision: 'approved',
      decidedBy: 'Rohan Silva',
      decidedAt: '2025-10-21 08:30 AM',
      notes: 'Good progress and excellent documentation.',
      checklist: {
        photoQuality: true,
        dataCompleteness: true,
        safetyCompliance: true,
        progressRealistic: true,
        issuesAddressed: true
      }
    },
    reviewedBy: 'Rohan Silva',
    reviewedAt: '2025-10-21 08:30 AM'
  }
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get detailed report by ID
 */
export function getDetailedReport(reportId: string): DetailedReport | undefined {
  return mockDetailedReports.find(r => r.id === reportId);
}

/**
 * Get all pending reports
 */
export function getPendingReports(): DetailedReport[] {
  return mockDetailedReports.filter(r => r.status === 'Pending');
}

/**
 * Get reports requiring urgent attention
 */
export function getUrgentReports(): DetailedReport[] {
  return mockDetailedReports.filter(r => r.requiresUrgentAttention);
}

/**
 * Get report summaries (for lists)
 */
export function getReportSummaries(): ReportSummary[] {
  return mockDetailedReports.map(report => ({
    id: report.id,
    vesselName: report.vesselName,
    date: report.date,
    dayOfProject: report.dayOfProject,
    status: report.status,
    supervisorName: report.supervisorName,
    submittedAt: report.submittedAt,
    overallProgress: report.overallProgress,
    issueCount: report.issues.length,
    photoCount: report.photos.length,
    requiresAttention: report.requiresUrgentAttention || false
  }));
}