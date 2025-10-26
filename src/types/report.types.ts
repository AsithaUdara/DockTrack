// src/types/report.types.ts

export type ReportStatus = 'Draft' | 'Pending' | 'Approved' | 'Revision';

export interface Report {
  id: string;
  vesselName: string;
  date: string; // e.g., "2025-10-21"
  dayOfProject: number;
  status: ReportStatus;
}

/**
 * Complete Report with all details (used by Manager for review)
 */
export interface DetailedReport extends Report {
  // Project Info
  projectId: string;
  projectName: string;
  supervisorId: string;
  supervisorName: string;
  submittedAt: string; // "2025-10-21 17:18"
  
  // Work Details
  tasks: Task[];
  overallProgress: number; // 0-100
  
  // Resources
  manpower: ManpowerEntry[];
  totalWorkers: number;
  totalManHours: number;
  overtimeHours: number;
  absentees: string[];
  
  materials: MaterialEntry[];
  equipment: EquipmentEntry[];
  
  // Conditions
  weather: WeatherConditions;
  safety: SafetyInfo;
  
  // Issues & Plans
  issues: Issue[];
  tomorrowPlan: TomorrowPlan;
  
  // Documentation
  photos: Photo[];
  signature: string;
  overallComments?: string;
  
  // Manager Review (optional - only if reviewed)
  managerComments?: ManagerComment[];
  approvalDecision?: ApprovalDecision;
  reviewedBy?: string;
  reviewedAt?: string;
  
  // Flags
  requiresUrgentAttention?: boolean;
  hasUnresolvedIssues?: boolean;
}

/**
 * Individual task entry
 */
export interface Task {
  id: string;
  workType: string; // "Hull Welding", "Deck Painting", etc.
  location: string; // "Port Side - A3"
  plannedWork: string;
  actuallyCompleted: string;
  completion: number; // 0-100
  quality: 'Excellent' | 'Good' | 'Acceptable' | 'Poor';
  photoIds: string[]; // References to photos
}

/**
 * Manpower entry
 */
export interface ManpowerEntry {
  trade: string; // "Welders", "Fitters", etc.
  workers: number;
  hours: number;
  totalHours: number;
}

/**
 * Material usage entry
 */
export interface MaterialEntry {
  name: string;
  quantity: string;
  unit: string;
}

/**
 * Equipment usage entry
 */
export interface EquipmentEntry {
  name: string;
  hours: number;
  status: 'Working' | 'Needs Service' | 'Down';
  notes?: string;
}

/**
 * Weather conditions
 */
export interface WeatherConditions {
  morning: string;
  afternoon: string;
  temperature: string;
  windSpeed: string;
  rain: boolean;
  impact: string;
}

/**
 * Safety information
 */
export interface SafetyInfo {
  briefingConducted: boolean;
  briefingTime: string;
  attendees: number;
  ppeCompliance: number; // 0-100
  incidents: number;
  incidentDetails?: string;
}

/**
 * Issue/Delay entry
 */
export interface Issue {
  id: string;
  type: string; // "Material Shortage", "Equipment Failure", etc.
  description: string;
  actionTaken: string;
  impact: 'Minor' | 'Moderate' | 'Major';
  timeLost: string; // "0.5 hours"
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  managerComments?: ManagerComment[];
  resolutionNotes?: string;
}

/**
 * Tomorrow's work plan
 */
export interface TomorrowPlan {
  date: string;
  plannedWork: PlannedWorkItem[];
  requiredMaterials?: MaterialRequirement[];
  requiredEquipment?: string[];
  expectedWorkers: number;
  manpowerBreakdown?: Record<string, number>;
  specialNotes?: string;
}

export interface PlannedWorkItem {
  description: string;
  location?: string;
  estimatedDuration?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface MaterialRequirement {
  name: string;
  quantity?: string;
  urgent?: boolean;
}

/**
 * Photo documentation
 */
export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  workType: string;
  location: string;
  description: string;
  date: string;
  timestamp: string; // "10:32 AM"
  gps?: string;
  fileSize: string;
  annotations?: PhotoAnnotation[];
  
  // Manager additions
  managerNotes?: string;
  flaggedForClient?: boolean;
  qualityRating?: 1 | 2 | 3 | 4 | 5;
}

export interface PhotoAnnotation {
  type: 'arrow' | 'circle' | 'text' | 'freehand';
  data: any;
}

/**
 * Manager's comment
 */
export interface ManagerComment {
  id: string;
  reportId: string;
  issueId?: string; // If comment is on specific issue
  authorId: string;
  authorName: string;
  role: 'Project Manager' | 'Operations Manager' | 'Senior Manager';
  text: string;
  timestamp: string;
  actionItems?: ActionItem[];
  attachments?: string[];
}

/**
 * Action item within comments
 */
export interface ActionItem {
  id: string;
  text: string;
  assignedTo?: string;
  dueDate?: string;
  completed: boolean;
  completedAt?: string;
}

/**
 * Approval decision by manager
 */
export interface ApprovalDecision {
  decision: 'approved' | 'revision-requested' | 'rejected';
  decidedBy: string;
  decidedAt: string;
  reason?: string;
  notes?: string;
  checklist: ApprovalChecklist;
}

/**
 * Approval checklist
 */
export interface ApprovalChecklist {
  photoQuality: boolean;
  dataCompleteness: boolean;
  safetyCompliance: boolean;
  progressRealistic: boolean;
  issuesAddressed: boolean;
}

/**
 * For manager dashboard - report summary
 */
export interface ReportSummary {
  id: string;
  vesselName: string;
  date: string;
  dayOfProject: number;
  status: ReportStatus;
  supervisorName: string;
  submittedAt: string;
  overallProgress: number;
  issueCount: number;
  photoCount: number;
  requiresAttention: boolean;
}
