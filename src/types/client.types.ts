// src/types/client.types.ts

export type ProjectStatus = 'In Progress' | 'Completed' | 'Pending' | 'On Hold';
export type ProjectPhase = 'Hull Repair' | 'Engine Overhaul' | 'Deck Painting' | 'Electrical Works' | 'Final Inspection';

export interface ClientProject {
  id: string;
  vesselName: string;
  projectId: string;
  projectName: string;
  status: ProjectStatus;
  phase: ProjectPhase;
  progress: number; // 0-100
  dockNo: string;
  startDate: string;
  expectedEndDate: string;
  remainingDays: number;
  imageUrl: string;
  clientId: string;
  clientName: string;
}

export interface ProjectTimeline {
  projectId: string;
  reports: DailyReportSummary[];
  milestones: ProjectMilestone[];
}

export interface DailyReportSummary {
  id: string;
  date: string;
  dayOfProject: number;
  workCompleted: string[];
  materialsUsed: MaterialSummary[];
  manHours: number;
  tomorrowPlan: string[];
  photoCount: number;
  photos: string[]; // URLs
  supervisorName: string;
  overallProgress: number;
}

export interface MaterialSummary {
  name: string;
  quantity: string;
  unit: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description: string;
}

export interface BeforeAfterPhoto {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  workType: string;
  location: string;
  description: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  emailReports: boolean;
  smsAlerts: boolean;
  projectUpdates: boolean;
  maintenanceReminders: boolean;
}

export interface RecentActivity {
  id: string;
  type: 'milestone' | 'photo' | 'report' | 'status';
  projectId: string;
  vesselName: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  message: string;
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
