// src/data/mock-projects.ts

import { Project, DashboardStats, RecentActivity } from '@/types/project.types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'MV Ocean Voyager - Repair & Maintenance',
    vesselName: 'Vessel A',
    vesselImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=300&fit=crop',
    progress: 75,
    daysRemaining: 30,
    status: 'active',
    clientName: 'Ocean Shipping Ltd',
    startDate: '2025-01-15',
    endDate: '2025-11-23',
    manager: 'John Silva',
    criticalIssues: 2,
    pendingReports: 3
  },
  {
    id: '2',
    name: 'SS Maritime Express - Hull Inspection',
    vesselName: 'Vessel B',
    vesselImage: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop',
    progress: 50,
    daysRemaining: 30,
    status: 'active',
    clientName: 'Maritime Corp',
    startDate: '2025-02-01',
    endDate: '2025-12-01',
    manager: 'Sarah Fernando',
    criticalIssues: 0,
    pendingReports: 1
  },
  {
    id: '3',
    name: 'Container Ship Alpha - Engine Overhaul',
    vesselName: 'Vessel C',
    vesselImage: 'https://images.unsplash.com/photo-1605711285791-0219e80e43a3?w=400&h=300&fit=crop',
    progress: 25,
    daysRemaining: 45,
    status: 'active',
    clientName: 'Global Shipping Inc',
    startDate: '2025-03-01',
    endDate: '2025-12-08',
    manager: 'David Perera',
    criticalIssues: 1,
    pendingReports: 2
  },
  {
    id: '4',
    name: 'Luxury Cruise Delta - Refurbishment',
    vesselName: 'Vessel D',
    vesselImage: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=400&h=300&fit=crop',
    progress: 90,
    daysRemaining: 5,
    status: 'active',
    clientName: 'Cruise Lines International',
    startDate: '2025-01-10',
    endDate: '2025-10-29',
    manager: 'Emma Jayawardena',
    criticalIssues: 0,
    pendingReports: 0
  }
];

export const mockDashboardStats: DashboardStats = {
  activeProjects: 12,
  pendingApprovals: 3,
  todayManHours: 450,
  criticalIssues: 2
};

export const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'report',
    message: 'New daily report submitted for MV Ocean Voyager',
    timestamp: '2025-10-24T10:30:00',
    projectName: 'MV Ocean Voyager',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'issue',
    message: 'Critical safety issue reported on Container Ship Alpha',
    timestamp: '2025-10-24T09:15:00',
    projectName: 'Container Ship Alpha',
    priority: 'high'
  },
  {
    id: '3',
    type: 'approval',
    message: 'Report approved for SS Maritime Express',
    timestamp: '2025-10-24T08:45:00',
    projectName: 'SS Maritime Express',
    priority: 'low'
  },
  {
    id: '4',
    type: 'update',
    message: 'Progress milestone reached on Luxury Cruise Delta',
    timestamp: '2025-10-23T16:20:00',
    projectName: 'Luxury Cruise Delta',
    priority: 'medium'
  }
];