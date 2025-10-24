// src/types/report.types.ts

export type ReportStatus = 'Draft' | 'Pending' | 'Approved' | 'Revision';

export interface Report {
  id: string;
  vesselName: string;
  date: string; // e.g., "2025-10-21"
  dayOfProject: number;
  status: ReportStatus;
}
