// src/data/mock-reports.ts

import { DailyReport, ReportDetail } from '@/types/report.types';

export const mockDailyReports: DailyReport[] = [
  {
    id: '1',
    reportId: 'DR-2024/07/26-001',
    date: '2024-07-26',
    projectId: '1',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    vesselName: 'MV Ocean Voyager',
    submittedBy: 'supervisor1',
    supervisorName: 'Samantha Perera',
    status: 'completed',
    submissionTime: '2024-07-26T17:30:00',
    weatherConditions: 'Sunny',
    temperature: '28°C',
    manpowerCount: 45,
    workHours: 360,
    progressPercentage: 15,
    criticalIssues: 0,
    photosCount: 12
  },
  {
    id: '2',
    reportId: 'DR-2024/07/25-002',
    date: '2024-07-25',
    projectId: '1',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    vesselName: 'MV Ocean Voyager',
    submittedBy: 'supervisor1',
    supervisorName: 'Samantha Perera',
    status: 'completed',
    submissionTime: '2024-07-25T17:45:00',
    weatherConditions: 'Partly Cloudy',
    temperature: '27°C',
    manpowerCount: 42,
    workHours: 336,
    progressPercentage: 12,
    criticalIssues: 1,
    photosCount: 15
  },
  {
    id: '3',
    reportId: 'DR-2024/07/24-001',
    date: '2024-07-24',
    projectId: '1',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    vesselName: 'MV Ocean Voyager',
    submittedBy: 'supervisor1',
    supervisorName: 'Samantha Perera',
    status: 'completed',
    submissionTime: '2024-07-24T18:00:00',
    weatherConditions: 'Rainy',
    temperature: '25°C',
    manpowerCount: 38,
    workHours: 304,
    progressPercentage: 10,
    criticalIssues: 2,
    photosCount: 8
  },
  {
    id: '4',
    reportId: 'DR-2024/07/23-004',
    date: '2024-07-23',
    projectId: '1',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    vesselName: 'MV Ocean Voyager',
    submittedBy: 'supervisor1',
    supervisorName: 'Samantha Perera',
    status: 'completed',
    submissionTime: '2024-07-23T17:30:00',
    weatherConditions: 'Sunny',
    temperature: '29°C',
    manpowerCount: 45,
    workHours: 360,
    progressPercentage: 8,
    criticalIssues: 0,
    photosCount: 10
  },
  {
    id: '5',
    reportId: 'DR-2024/07/22-005',
    date: '2024-07-22',
    projectId: '1',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    vesselName: 'MV Ocean Voyager',
    submittedBy: 'supervisor1',
    supervisorName: 'Samantha Perera',
    status: 'completed',
    submissionTime: '2024-07-22T17:15:00',
    weatherConditions: 'Cloudy',
    temperature: '26°C',
    manpowerCount: 40,
    workHours: 320,
    progressPercentage: 6,
    criticalIssues: 1,
    photosCount: 14
  }
];

export const mockReportDetails: Record<string, ReportDetail> = {
  '1': {
    ...mockDailyReports[0],
    tasks: [
      {
        id: 't1',
        taskName: 'Hull Plate Replacement - Port Side',
        location: 'Dock 2, Section A',
        startTime: '08:00',
        endTime: '16:00',
        status: 'completed',
        progress: 100,
        assignedCrew: ['Welding Team A', 'Fitting Team B']
      },
      {
        id: 't2',
        taskName: 'Engine Room Cleaning',
        location: 'Engine Room',
        startTime: '09:00',
        endTime: '15:00',
        status: 'in-progress',
        progress: 75,
        assignedCrew: ['Maintenance Team C']
      }
    ],
    manpower: [
      { id: 'm1', category: 'Welders', tradeType: 'Skilled', planned: 12, actual: 12, hours: 96 },
      { id: 'm2', category: 'Fitters', tradeType: 'Skilled', planned: 10, actual: 9, hours: 72 },
      { id: 'm3', category: 'Helpers', tradeType: 'Unskilled', planned: 15, actual: 15, hours: 120 },
      { id: 'm4', category: 'Engineers', tradeType: 'Technical', planned: 5, actual: 5, hours: 40 },
      { id: 'm5', category: 'Safety Officers', tradeType: 'Technical', planned: 3, actual: 4, hours: 32 }
    ],
    materials: [
      { id: 'mat1', materialName: 'Steel Plates (Grade A)', quantity: 150, unit: 'kg', supplier: 'Steel Corp Ltd', status: 'used' },
      { id: 'mat2', materialName: 'Welding Electrodes', quantity: 25, unit: 'packs', supplier: 'Welding Supplies Inc', status: 'used' },
      { id: 'mat3', materialName: 'Paint (Marine Grade)', quantity: 45, unit: 'liters', supplier: 'Marine Coatings', status: 'delivered' },
      { id: 'mat4', materialName: 'Grinding Discs', quantity: 30, unit: 'pieces', status: 'used' }
    ],
    weather: {
      condition: 'Sunny',
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      rainfall: 0,
      visibility: 'Good'
    },
    safety: {
      incidentsCount: 0,
      nearMissCount: 1,
      ppeCompliance: 98,
      safetyBriefingConducted: true,
      hazardsIdentified: ['Hot work area - welding zone', 'Confined space - engine room']
    },
    issues: [
      {
        id: 'i1',
        title: 'Delayed material delivery',
        description: 'Paint delivery was delayed by 2 hours due to traffic',
        severity: 'low',
        category: 'Logistics',
        reportedTime: '11:30',
        status: 'resolved',
        assignedTo: 'Procurement Team'
      }
    ],
    tomorrowPlan: 'Continue hull plate replacement on starboard side. Begin engine room equipment inspection. Schedule: 08:00 - 17:00. Required manpower: 45 workers.',
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=200',
        caption: 'Hull plate welding progress - Port side',
        location: 'Dock 2, Section A',
        timestamp: '2024-07-26T10:30:00'
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200',
        caption: 'Engine room cleaning in progress',
        location: 'Engine Room',
        timestamp: '2024-07-26T12:15:00'
      }
    ],
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    managerComments: []
  }
};