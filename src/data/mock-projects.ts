// src/data/mock-projects.ts
// Manager Dashboard Mock Data

import { Project, DashboardStats, RecentActivity } from '@/types/project.types';
export type { Project } from '@/types/project.types';

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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9458406-352004098-6aec25d233e29db4614ab3db8abf8936/1'
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9173329-211265530-d55c588724f2de2b31cac3793119d6a0/1?v1'
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/0-238715240-6b8b4f7a34257c79b18c45ecea89609d/1?v1'
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/0-261009503-97da1b58a01f9fbd5054e9f98ccd5f1a/1?v1'
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9474292-249301000-09d800a4be13f323932372645b766358/1?v1'
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9380398-240787000-451e1139d1632f2317dfab708c1703ca/1?v1'
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
    imageUrl: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=500&h=350&fit=crop&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&h=350&fit=crop&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1568481445378-2eeb6e5eb0fc?w=500&h=350&fit=crop&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500&h=350&fit=crop&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=500&h=350&fit=crop&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=350&fit=crop&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1568481445378-2eeb6e5eb0fc?w=500&h=350&fit=crop&q=80'
  },

  // ON HOLD PROJECTS
  
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
    title: 'Report submitted',
    project: 'MV Ocean Voyager',
    timestamp: '10 hours ago'
  },
  {
    id: 'act-002',
    type: 'alert',
    title: 'Safety issue reported',
    project: 'Container Ship Alpha',
    timestamp: '11 hours ago'
  },
  {
    id: 'act-003',
    type: 'approval',
    title: 'Report approved',
    project: 'SS Maritime Express',
    timestamp: '11 hours ago'
  },
  {
    id: 'act-004',
    type: 'report',
    title: 'Progress updated',
    project: 'Cargo Vessel Beta',
    timestamp: '12 hours ago'
  },
  {
    id: 'act-005',
    type: 'alert',
    title: 'Equipment issue reported',
    project: 'MV Indian Ocean',
    timestamp: '14 hours ago'
  },
  {
    id: 'act-006',
    type: 'approval',
    title: 'Budget approved',
    project: 'MV Atlantic Star',
    timestamp: '15 hours ago'
  },
  {
    id: 'act-007',
    type: 'report',
    title: 'Inspection completed',
    project: 'Tanker Ship Gamma',
    timestamp: '16 hours ago'
  }
];

// Supervisor-facing project type extends base Project with additional fields used by Supervisor UI
export interface SupervisorProject extends Project {
  projectId: string;
  dockNo: string;
}

// Dedicated dataset for Supervisor UI with required fields present
export const mockSupervisorProjects: SupervisorProject[] = [
  {
    id: 'proj-001',
    projectId: 'DT-2025-001',
    dockNo: 'Dock 3',
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9458406-352004098-6aec25d233e29db4614ab3db8abf8936/1'
  },
  {
    id: 'proj-004',
    projectId: 'DT-2025-004',
    dockNo: 'Dock 1',
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/0-238715240-6b8b4f7a34257c79b18c45ecea89609d/1?v1'
  },
  {
    id: 'proj-006',
    projectId: 'DT-2025-006',
    dockNo: 'Dock 7',
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
    imageUrl: 'https://static.vesselfinder.net/ship-photo/9474292-249301000-09d800a4be13f323932372645b766358/1?v1'
  }
];