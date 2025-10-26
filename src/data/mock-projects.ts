// src/data/mock-projects.ts
export interface Project {
  id: string;
  vesselName: string;
  projectId: string;
  dockNo: string;
  status: 'Active' | 'Upcoming';
}

export const mockSupervisorProjects: Project[] = [
  { id: 'proj-01', vesselName: 'MV Sea Princess', projectId: 'CDPLC-2025-045', dockNo: 'Dry Dock No. 04', status: 'Active' },
  { id: 'proj-02', vesselName: 'MV Ocean Star', projectId: 'CDPLC-2025-051', dockNo: 'Dry Dock No. 02', status: 'Upcoming' },
  { id: 'proj-03', vesselName: 'MV Pacific Dawn', projectId: 'CDPLC-2025-039', dockNo: 'Repair Berth 1', status: 'Upcoming' },
];
