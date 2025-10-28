// src/types/project.types.ts
// Type definitions for Manager Dashboard

export interface Project {
  id: string;
  vesselName: string;
  projectType: string;
  manager: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed' | 'Cancelled' | 'On Hold'; // Added 'Completed', 'Cancelled', 'On Hold' statuses
  progress: number; // 0-100
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  pendingReports: number;
  totalReports: number;
  workers: number;
  priority: 'low' | 'medium' | 'high';
  projectStatus: 'active' | 'completed' | 'upcoming' | 'cancelled' | 'on-hold';
  imageUrl?: string; // Added optional imageUrl property
}

export interface DashboardStats {
  activeProjects: number;
  pendingReports: number;
  totalWorkers: number;
  criticalAlerts: number;
}

export interface RecentActivity {
  id: string;
  type: 'report' | 'alert' | 'approval' | 'update';
  title: string;
  project: string;
  timestamp: string;
}

export interface Report {
  id: string;
  projectId: string;
  projectName: string;
  reportType: string;
  submittedBy: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priority: 'low' | 'medium' | 'high';
  description: string;
}