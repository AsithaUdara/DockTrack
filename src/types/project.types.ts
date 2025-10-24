// src/types/project.types.ts

export interface Project {
  id: string;
  name: string;
  vesselName: string;
  vesselImage: string;
  progress: number;
  daysRemaining: number;
  status: 'active' | 'pending' | 'completed' | 'on-hold';
  clientName: string;
  startDate: string;
  endDate: string;
  manager: string;
  criticalIssues: number;
  pendingReports: number;
}

export interface DashboardStats {
  activeProjects: number;
  pendingApprovals: number;
  todayManHours: number;
  criticalIssues: number;
}

export interface RecentActivity {
  id: string;
  type: 'report' | 'issue' | 'approval' | 'update';
  message: string;
  timestamp: string;
  projectName: string;
  priority?: 'high' | 'medium' | 'low';
}