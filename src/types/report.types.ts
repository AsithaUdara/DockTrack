// src/types/report.types.ts

export interface DailyReport {
  id: string;
  reportId: string;
  date: string;
  projectId: string;
  projectName: string;
  vesselName: string;
  submittedBy: string;
  supervisorName: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submissionTime: string;
  weatherConditions?: string;
  temperature?: string;
  manpowerCount?: number;
  workHours?: number;
  progressPercentage?: number;
  criticalIssues?: number;
  photosCount?: number;
}

export interface ReportDetail extends DailyReport {
  tasks: Task[];
  manpower: ManpowerEntry[];
  materials: MaterialEntry[];
  weather: WeatherInfo;
  safety: SafetyInfo;
  issues: Issue[];
  tomorrowPlan: string;
  photos: Photo[];
  signature?: string;
  managerComments?: ManagerComment[];
}

export interface Task {
  id: string;
  taskName: string;
  location: string;
  startTime: string;
  endTime: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
  assignedCrew: string[];
}

export interface ManpowerEntry {
  id: string;
  category: string;
  tradeType: string;
  planned: number;
  actual: number;
  hours: number;
}

export interface MaterialEntry {
  id: string;
  materialName: string;
  quantity: number;
  unit: string;
  supplier?: string;
  status: 'delivered' | 'pending' | 'used';
}

export interface WeatherInfo {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  visibility: string;
}

export interface SafetyInfo {
  incidentsCount: number;
  nearMissCount: number;
  ppeCompliance: number;
  safetyBriefingConducted: boolean;
  hazardsIdentified: string[];
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  reportedTime: string;
  status: 'open' | 'in-progress' | 'resolved';
  assignedTo?: string;
  photos?: string[];
}

export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  location: string;
  timestamp: string;
  annotations?: Annotation[];
}

export interface Annotation {
  type: 'arrow' | 'text' | 'circle' | 'rectangle';
  position: { x: number; y: number };
  data: any;
}

export interface ManagerComment {
  id: string;
  managerId: string;
  managerName: string;
  comment: string;
  timestamp: string;
  type: 'approval' | 'feedback' | 'question';
}

// Simple Report type for basic report data
export type ReportStatus = 'Draft' | 'Pending' | 'Approved' | 'Revision';

export interface Report {
  id: string;
  vesselName: string;
  date: string;
  dayOfProject: number;
  status: ReportStatus;
}
