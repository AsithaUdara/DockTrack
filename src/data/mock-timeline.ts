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
  {
    id: 2,
    name: 'MV Ocean Star',
    vessel: 'IMO: 9234567',
    startDate: '2025-10-15',
    endDate: '2025-11-05',
    currentDay: 5,
    totalDays: 14,
    progress: 35,
    status: 'delayed',
    phases: [
      {
        id: 1,
        name: 'Initial Assessment',
        startDay: 1,
        endDay: 3,
        progress: 100,
        status: 'completed',
        color: 'bg-green-500'
      },
      {
        id: 2,
        name: 'Engine Overhaul',
        startDay: 4,
        endDay: 10,
        progress: 45,
        status: 'in-progress',
        color: 'bg-yellow-500'
      },
      {
        id: 3,
        name: 'Testing',
        startDay: 11,
        endDay: 14,
        progress: 0,
        status: 'planned',
        color: 'bg-gray-300'
      }
    ],
    milestones: [
      { day: 3, name: 'Assessment Complete', status: 'completed' },
      { day: 5, name: 'Engine Dismantling', status: 'current' },
      { day: 10, name: 'Reassembly Complete', status: 'upcoming' },
      { day: 14, name: 'Sea Trial', status: 'upcoming' }
    ]
  },
  {
    id: 3,
    name: 'MV Pacific Dawn',
    vessel: 'IMO: 9345678',
    startDate: '2025-10-05',
    endDate: '2025-10-25',
    currentDay: 18,
    totalDays: 20,
    progress: 64,
    status: 'on-track',
    phases: [
      {
        id: 1,
        name: 'Hull Repairs',
        startDay: 1,
        endDay: 8,
        progress: 100,
        status: 'completed',
        color: 'bg-green-500'
      },
      {
        id: 2,
        name: 'Mechanical Work',
        startDay: 9,
        endDay: 15,
        progress: 100,
        status: 'completed',
        color: 'bg-green-500'
      },
      {
        id: 3,
        name: 'Finishing',
        startDay: 16,
        endDay: 20,
        progress: 40,
        status: 'in-progress',
        color: 'bg-blue-500'
      }
    ],
    milestones: [
      { day: 8, name: 'Hull Work Complete', status: 'completed' },
      { day: 15, name: 'Mechanical Complete', status: 'completed' },
      { day: 18, name: 'Finishing Work', status: 'current' },
      { day: 20, name: 'Final Handover', status: 'upcoming' }
    ]
  }
];