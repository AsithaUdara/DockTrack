// src/data/mock-projects.ts
// Manager Dashboard Mock Data

import { Project, DashboardStats, RecentActivity } from '@/types/project.types';

export const mockProjects: Project[] = [
  // ACTIVE PROJECTS (showing on dashboard)
  {
    id: 'proj-001',
    vesselName: 'MV Ocean Voyager',
    projectType: 'Repair & Maintenance',
    manager: 'John Silva',
    status: 'On Track',
    progress: 75,
    startDate: '2025-01-15',
    endDate: '2025-11-15',
    pendingReports: 3,
    totalReports: 45,
    workers: 85,
    priority: 'high',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9458406-352004098-6aec25d233e29db4614ab3db8abf8936/1' // Specific image for Ocean Voyager
  },
  {
    id: 'proj-002',
    vesselName: 'SS Maritime Express',
    projectType: 'Hull Inspection',
    manager: 'Sarah Fernando',
    status: 'At Risk',
    progress: 50,
    startDate: '2025-01-20',
    endDate: '2025-12-10',
    pendingReports: 1,
    totalReports: 28,
    workers: 45,
    priority: 'medium',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9293611-538004385-cf3a8e7bc899279c3af5c52f9a77f60d/1' // Specific image for Maritime Express (tanker)
  },
  {
    id: 'proj-003',
    vesselName: 'Container Ship Alpha',
    projectType: 'Engine Overhaul',
    manager: 'David Perera',
    status: 'On Track',
    progress: 25,
    startDate: '2025-02-01',
    endDate: '2025-12-25',
    pendingReports: 2,
    totalReports: 15,
    workers: 120,
    priority: 'high',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9776418-477000700-87654321dcba/1' // Specific image for Container Ship Alpha
  },
  {
    id: 'proj-004',
    vesselName: 'MV Pacific Dawn',
    projectType: 'Annual Survey',
    manager: 'Michael De Silva',
    status: 'On Track',
    progress: 90,
    startDate: '2024-12-10',
    endDate: '2025-11-01',
    pendingReports: 0,
    totalReports: 52,
    workers: 60,
    priority: 'low',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9383937-311000210-1a2b3c4d5e6f7g8h9i0j/1' // Specific image for Pacific Dawn (cruise)
  },
  {
    id: 'proj-005',
    vesselName: 'Cargo Vessel Beta',
    projectType: 'Structural Repairs',
    manager: 'Priya Jayawardena',
    status: 'Delayed',
    progress: 35,
    startDate: '2025-01-05',
    endDate: '2025-12-15',
    pendingReports: 5,
    totalReports: 38,
    workers: 95,
    priority: 'high',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9458407-352004099-8feb96d344e29db4614ab3db8abf8937/1' // Generic cargo/ocean image
  },
  {
    id: 'proj-006',
    vesselName: 'MV Atlantic Star',
    projectType: 'Propeller Replacement',
    manager: 'Rajesh Kumar',
    status: 'On Track',
    progress: 60,
    startDate: '2025-01-25',
    endDate: '2025-11-20',
    pendingReports: 1,
    totalReports: 22,
    workers: 40,
    priority: 'medium',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9595863-566789124-1h2g3f4e5d6c7b8a/1' // Specific image for Atlantic Star (bulk carrier)
  },
  {
    id: 'proj-007',
    vesselName: 'Tanker Ship Gamma',
    projectType: 'Tank Cleaning & Inspection',
    manager: 'Nuwan Bandara',
    status: 'On Track',
    progress: 45,
    startDate: '2025-02-05',
    endDate: '2025-12-05',
    pendingReports: 2,
    totalReports: 30,
    workers: 70,
    priority: 'medium',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9293612-538004386-1234a8e7bc899279c3af5c52f9a77f60e/1' // Tanker image
  },
  {
    id: 'proj-008',
    vesselName: 'MV Indian Ocean',
    projectType: 'Electrical System Upgrade',
    manager: 'Lakshmi Perera',
    status: 'At Risk',
    progress: 40,
    startDate: '2025-01-18',
    endDate: '2025-11-28',
    pendingReports: 4,
    totalReports: 25,
    workers: 55,
    priority: 'high',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9458408-352004100-cdefg8h9i0jklmno/1' // Another generic ocean image
  },
  {
    id: 'proj-009',
    vesselName: 'SS Southern Cross',
    projectType: 'Navigation System Overhaul',
    manager: 'Chaminda Silva',
    status: 'On Track',
    progress: 80,
    startDate: '2024-12-20',
    endDate: '2025-10-30',
    pendingReports: 0,
    totalReports: 18,
    workers: 30,
    priority: 'low',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9383936-311000209-0b9e6d234a87d54c12f98b76e543a21c/1' // Cruise/passenger ship image
  },
  {
    id: 'proj-010',
    vesselName: 'Container Ship Delta',
    projectType: 'Complete Refit',
    manager: 'Saman Wijesinghe',
    status: 'On Track',
    progress: 15,
    startDate: '2025-02-10',
    endDate: '2026-01-15',
    pendingReports: 1,
    totalReports: 8,
    workers: 150,
    priority: 'high',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9776419-477000701-12345678abcd/1' // Another container ship image
  },
  {
    id: 'proj-011',
    vesselName: 'MV Coral Bay',
    projectType: 'Hull Painting',
    manager: 'Dilini Fernando',
    status: 'On Track',
    progress: 70,
    startDate: '2025-01-22',
    endDate: '2025-11-10',
    pendingReports: 0,
    totalReports: 12,
    workers: 35,
    priority: 'low',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9458409-352004101-pqrstuvwxyzabc/1' // Another generic ocean image
  },
  {
    id: 'proj-012',
    vesselName: 'Bulk Carrier Epsilon',
    projectType: 'Cargo Hold Repair',
    manager: 'Anil Rodrigo',
    status: 'At Risk',
    progress: 55,
    startDate: '2025-01-12',
    endDate: '2025-11-25',
    pendingReports: 3,
    totalReports: 35,
    workers: 80,
    priority: 'medium',
    projectStatus: 'active',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9595864-566789125-ijklmn2opqrs/1' // Bulk carrier image
  },

  // COMPLETED PROJECTS
  {
    id: 'proj-013',
    vesselName: 'MV Golden Horizon',
    projectType: 'Annual Maintenance',
    manager: 'John Silva',
    status: 'On Track',
    progress: 100,
    startDate: '2024-08-01',
    endDate: '2024-10-15',
    pendingReports: 0,
    totalReports: 65,
    workers: 75,
    priority: 'medium',
    projectStatus: 'completed',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9383938-311000211-klmnop1qrstu/1' // Cruise ship image
  },
  {
    id: 'proj-014',
    vesselName: 'SS Blue Wave',
    projectType: 'Engine Replacement',
    manager: 'Sarah Fernando',
    status: 'On Track',
    progress: 100,
    startDate: '2024-07-15',
    endDate: '2024-09-30',
    pendingReports: 0,
    totalReports: 48,
    workers: 90,
    priority: 'high',
    projectStatus: 'completed',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9293613-538004387-fghijk7lmnopq/1' // Tanker image
  },
  {
    id: 'proj-015',
    vesselName: 'Cargo Ship Zeta',
    projectType: 'Propeller & Rudder Service',
    manager: 'David Perera',
    status: 'On Track',
    progress: 100,
    startDate: '2024-06-01',
    endDate: '2024-08-20',
    pendingReports: 0,
    totalReports: 32,
    workers: 55,
    priority: 'medium',
    projectStatus: 'completed',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9458406-352004098-6aec25d233e29db4614ab3db8abf8936/1' // Generic cargo/ocean image
  },

  // UPCOMING PROJECTS
  {
    id: 'proj-016',
    vesselName: 'MV Northern Star',
    projectType: 'Scheduled Dry Dock',
    manager: 'Michael De Silva',
    status: 'On Track',
    progress: 0,
    startDate: '2025-11-15',
    endDate: '2026-02-28',
    pendingReports: 0,
    totalReports: 0,
    workers: 0,
    priority: 'high',
    projectStatus: 'upcoming',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9712345-367000123-abcdef123456/1' // Dry dock image
  },
  {
    id: 'proj-017',
    vesselName: 'Tanker Omega',
    projectType: 'Hull Blasting & Coating',
    manager: 'Priya Jayawardena',
    status: 'On Track',
    progress: 0,
    startDate: '2025-12-01',
    endDate: '2026-03-15',
    pendingReports: 0,
    totalReports: 0,
    workers: 0,
    priority: 'medium',
    projectStatus: 'upcoming',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9293614-538004388-rstuvwxzyabcd/1' // Tanker image
  },
  {
    id: 'proj-018',
    vesselName: 'Container Ship Theta',
    projectType: 'Ballast Tank Overhaul',
    manager: 'Rajesh Kumar',
    status: 'On Track',
    progress: 0,
    startDate: '2025-11-20',
    endDate: '2026-01-30',
    pendingReports: 0,
    totalReports: 0,
    workers: 0,
    priority: 'low',
    projectStatus: 'upcoming',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9776420-477000702-efghij9klmno/1' // Container ship image
  },

  // CANCELLED PROJECTS
  {
    id: 'proj-019',
    vesselName: 'MV Sea Breeze',
    projectType: 'Accommodation Refit',
    manager: 'Nuwan Bandara',
    status: 'Delayed',
    progress: 20,
    startDate: '2024-09-01',
    endDate: '2024-11-30',
    pendingReports: 0,
    totalReports: 8,
    workers: 0,
    priority: 'low',
    projectStatus: 'cancelled',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9383939-311000212-vwxyzab0cdef/1' // Cruise ship image
  },

  // ON HOLD PROJECTS
  {
    id: 'proj-020',
    vesselName: 'Bulk Carrier Sigma',
    projectType: 'Hatch Cover Repair',
    manager: 'Lakshmi Perera',
    status: 'At Risk',
    progress: 30,
    startDate: '2025-01-10',
    endDate: '2025-12-20',
    pendingReports: 0,
    totalReports: 12,
    workers: 0,
    priority: 'medium',
    projectStatus: 'on-hold',
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9595865-566789126-tuvwxyz3abcd/1' // Bulk carrier image
  }
];

export const mockDashboardStats: DashboardStats = {
  activeProjects: 12,
  pendingReports: 22,
  totalWorkers: 865,
  criticalAlerts: 2
};

export const mockRecentActivities: RecentActivity[] = [
  {
    id: 'act-001',
    type: 'report',
    title: 'New daily report submitted for MV Ocean Voyager',
    project: 'MV Ocean Voyager',
    timestamp: '10 hours ago'
  },
  {
    id: 'act-002',
    type: 'alert',
    title: 'Critical safety issue reported on Container Ship Alpha',
    project: 'Container Ship Alpha',
    timestamp: '11 hours ago'
  },
  {
    id: 'act-003',
    type: 'approval',
    title: 'Report approved for SS Maritime Express',
    project: 'SS Maritime Express',
    timestamp: '11 hours ago'
  },
  {
    id: 'act-004',
    type: 'report',
    title: 'Weekly progress report submitted for Cargo Vessel Beta',
    project: 'Cargo Vessel Beta',
    timestamp: '12 hours ago'
  },
  {
    id: 'act-005',
    type: 'alert',
    title: 'Equipment malfunction reported on MV Indian Ocean',
    project: 'MV Indian Ocean',
    timestamp: '14 hours ago'
  },
  {
    id: 'act-006',
    type: 'approval',
    title: 'Budget approval for MV Atlantic Star',
    project: 'MV Atlantic Star',
    timestamp: '15 hours ago'
  },
  {
    id: 'act-007',
    type: 'report',
    title: 'Inspection report completed for Tanker Ship Gamma',
    project: 'Tanker Ship Gamma',
    timestamp: '16 hours ago'
  }
];