export type TimelineStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface TimelineTask {
  task: string;
  phase: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string | '-';
  actualEnd: string | '-';
  status: TimelineStatus;
}

export interface TimelineProps {
  tasks: TimelineTask[];
  onExport?: () => void;
  view?: 'Day' | 'Week' | 'Month';
}