import { TimelineTask } from '@/types/timeline.types';

export const mockTimelineTasks: TimelineTask[] = [
  {
    task: "Hull Cleaning",
    phase: "Not Started",
    plannedStart: "2024-07-15",
    plannedEnd: "2024-07-18",
    actualStart: "-",
    actualEnd: "-",
    status: "Not Started"
  },
  {
    task: "Surface Preparation",
    phase: "Not Started",
    plannedStart: "2024-07-19",
    plannedEnd: "2024-07-22",
    actualStart: "-",
    actualEnd: "-",
    status: "Not Started"
  },
  {
    task: "Coating Application",
    phase: "In Progress",
    plannedStart: "2024-07-23",
    plannedEnd: "2024-07-26",
    actualStart: "2024-07-23",
    actualEnd: "2024-07-26",
    status: "In Progress"
  },
  {
    task: "Propeller Polishing",
    phase: "Completed",
    plannedStart: "2024-07-27",
    plannedEnd: "2024-07-28",
    actualStart: "2024-07-27",
    actualEnd: "2024-07-28",
    status: "Completed"
  },
  {
    task: "Anode Replacement",
    phase: "Completed",
    plannedStart: "2024-07-29",
    plannedEnd: "2024-07-30",
    actualStart: "2024-07-29",
    actualEnd: "2024-07-30",
    status: "Completed"
  },
  {
    task: "Sea Chest Cleaning",
    phase: "Completed",
    plannedStart: "2024-07-31",
    plannedEnd: "2024-08-01",
    actualStart: "2024-07-31",
    actualEnd: "2024-08-01",
    status: "Completed"
  },
  {
    task: "Valve Overhaul",
    phase: "Completed",
    plannedStart: "2024-08-02",
    plannedEnd: "2024-08-03",
    actualStart: "2024-08-02",
    actualEnd: "2024-08-03",
    status: "Completed"
  },
  {
    task: "Pipe Repair",
    phase: "Completed",
    plannedStart: "2024-08-04",
    plannedEnd: "2024-08-05",
    actualStart: "2024-08-04",
    actualEnd: "2024-08-05",
    status: "Completed"
  },
  {
    task: "System Testing",
    phase: "Completed",
    plannedStart: "2024-08-06",
    plannedEnd: "2024-08-07",
    actualStart: "2024-08-06",
    actualEnd: "2024-08-07",
    status: "Completed"
  },
  {
    task: "Final Inspection",
    phase: "Completed",
    plannedStart: "2024-08-08",
    plannedEnd: "2024-08-09",
    actualStart: "2024-08-08",
    actualEnd: "2024-08-09",
    status: "Completed"
  }
];