import { Project } from '@/types/project.types';

export const mockProjects: Project[] = [
  {
    id: 1,
    name: 'MV Sea Princess',
    vessel: 'IMO: 9123456',
    startDate: '2025-10-10',
    endDate: '2025-10-30',
    currentDay: 12,
    totalDays: 21,
    progress: 59,
    status: 'ahead',
    phases: [
      {
        id: 1,
        name: 'Hull Cleaning & Inspection',
        startDay: 1,
        endDay: 5,
        progress: 100,
        status: 'completed',
        color: 'bg-green-500'
      },
      {
        id: 2,
        name: 'Welding & Structural Repairs',
        startDay: 6,
        endDay: 12,
        progress: 80,
        status: 'in-progress',
        color: 'bg-blue-500'
      },
      {
        id: 3,
        name: 'Painting & Coating',
        startDay: 13,
        endDay: 17,
        progress: 0,
        status: 'planned',
        color: 'bg-gray-300'
      },
      {
        id: 4,
        name: 'Final Inspection & Testing',
        startDay: 18,
        endDay: 21,
        progress: 0,
        status: 'planned',
        color: 'bg-gray-300'
      }
    ],
    milestones: [
      { day: 1, name: 'Drydocking Complete', status: 'completed' },
      { day: 5, name: 'Hull Inspection Passed', status: 'completed' },
      { day: 12, name: 'Welding 80% Done', status: 'current' },
      { day: 13, name: 'Welding Complete', status: 'upcoming' },
      { day: 13, name: 'Painting Start', status: 'upcoming' },
      { day: 18, name: 'Final Inspection', status: 'upcoming' },
      { day: 21, name: 'Vessel Handover', status: 'upcoming' }
    ]
  },
  // ... other projects remain the same
];