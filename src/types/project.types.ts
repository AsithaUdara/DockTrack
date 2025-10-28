export interface Phase {
  id: number;
  name: string;
  startDay: number;
  endDay: number;
  progress: number;
  status: 'completed' | 'in-progress' | 'planned';
  color: string;
}

export interface Milestone {
  day: number;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface Project {
  id: number;
  name: string;
  vessel: string;
  startDate: string;
  endDate: string;
  currentDay: number;
  totalDays: number;
  progress: number;
  status: 'ahead' | 'on-track' | 'delayed';
  phases: Phase[];
  milestones: Milestone[];
}