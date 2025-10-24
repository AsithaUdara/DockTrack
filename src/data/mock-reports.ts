// src/data/mock-reports.ts
import { Report } from '@/types/report.types';

export const mockSupervisorReports: Report[] = [
  // Pending
  { id: 'REP-001', vesselName: 'MV Sea Princess', date: '2025-10-21', dayOfProject: 12, status: 'Pending' },

  // Drafts
  { id: 'REP-002', vesselName: 'MV Ocean Star', date: '2025-10-21', dayOfProject: 5, status: 'Draft' },
  { id: 'REP-003', vesselName: 'MV Sea Princess', date: '2025-10-20', dayOfProject: 11, status: 'Draft' },

  // Approved
  { id: 'REP-004', vesselName: 'MV Sea Princess', date: '2025-10-19', dayOfProject: 10, status: 'Approved' },
  { id: 'REP-005', vesselName: 'MV Sea Princess', date: '2025-10-18', dayOfProject: 9, status: 'Approved' },
  { id: 'REP-006', vesselName: 'MV Sea Princess', date: '2025-10-17', dayOfProject: 8, status: 'Approved' },

  // Revision
  { id: 'REP-007', vesselName: 'MV Pacific Dawn', date: '2025-10-20', dayOfProject: 18, status: 'Revision' },
];
