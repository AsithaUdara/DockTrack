'use client';

import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { TimelineProps } from '@/types/timeline.types';

const TimelineView: React.FC<TimelineProps> = ({ tasks, onExport, view: initialView = 'Day' }) => {
  const [view, setView] = useState(initialView);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Hard-coded datasets for Day / Week / Month views.
  // These are intentionally separate so switching the view shows different date granularities.
  // Expanded mock datasets per your request:
  // Day: 20 rows (detailed, same-day entries) using real dockyard task names
  const dayTaskNames = [
    'Hull Cleaning',
    'Surface Preparation',
    'Coating Application',
    'Propeller Polishing',
    'Anode Replacement',
    'Sea Chest Cleaning',
    'Valve Overhaul',
    'Pipe Repair',
    'System Testing',
    'Final Inspection',
    'Welding Support',
    'Electrical Inspection',
    'Painting Touch-up',
    'Bilge Cleaning',
    'Rudder Alignment',
    'Tank Cleaning',
    'Pump Maintenance',
    'Cargo Securing',
    'Mast Inspection',
    'Navigation Check',
  ];

  const dayTasks = dayTaskNames.map((name, i) => {
    const idx = i + 1;
    const status = idx % 3 === 0 ? 'Completed' : idx % 3 === 1 ? 'In Progress' : 'Not Started';
    return {
      task: name,
      phase: status === 'Completed' ? 'Completed' : status === 'In Progress' ? 'In Progress' : 'Planned',
      plannedStart: '2025-10-28',
      plannedEnd: '2025-10-28',
      actualStart: status === 'Completed' || status === 'In Progress' ? '2025-10-28' : '-',
      actualEnd: status === 'Completed' ? '2025-10-28' : '-',
      status: status,
    };
  });

  // Week: 10 rows (short multi-day ranges within a week) with descriptive names
  const weekTaskNames = [
    'Hull Cleaning',
    'Surface Preparation',
    'Coating Application',
    'Propeller Polishing',
    'Anode Replacement',
    'Sea Chest Cleaning',
    'Valve Overhaul',
    'Pipe Repair',
    'System Testing',
    'Final Inspection',
  ];

  const weekBase = new Date('2025-10-26');
  const weekTasks = weekTaskNames.map((name, i) => {
    const start = new Date(weekBase);
    start.setDate(weekBase.getDate() + (i % 7));
    const end = new Date(start);
    end.setDate(start.getDate() + (1 + (i % 3)));
    const plannedStart = start.toISOString().slice(0, 10);
    const plannedEnd = end.toISOString().slice(0, 10);
    const idx = i + 1;
    const status = idx % 3 === 0 ? 'Completed' : idx % 3 === 1 ? 'In Progress' : 'Not Started';
    return {
      task: name,
      phase: status === 'Completed' ? 'Completed' : status === 'In Progress' ? 'In Progress' : 'Planned',
      plannedStart,
      plannedEnd,
      actualStart: status === 'Completed' || status === 'In Progress' ? plannedStart : '-',
      actualEnd: status === 'Completed' ? plannedEnd : '-',
      status: status,
    };
  });

  // Month: 7 rows (broader ranges across the month)
  const monthTasks = [
    {
      task: 'Monthly: Hull Cleaning',
      phase: 'Planned',
      plannedStart: '2025-10-01',
      plannedEnd: '2025-10-05',
      actualStart: '-',
      actualEnd: '-',
      status: 'Not Started',
    },
    {
      task: 'Monthly: Surface Preparation',
      phase: 'Planned',
      plannedStart: '2025-10-06',
      plannedEnd: '2025-10-10',
      actualStart: '-',
      actualEnd: '-',
      status: 'Not Started',
    },
    {
      task: 'Monthly: Coating Application',
      phase: 'In Progress',
      plannedStart: '2025-10-11',
      plannedEnd: '2025-10-18',
      actualStart: '2025-10-12',
      actualEnd: '-',
      status: 'In Progress',
    },
    {
      task: 'Monthly: Propeller Polishing',
      phase: 'Completed',
      plannedStart: '2025-10-19',
      plannedEnd: '2025-10-20',
      actualStart: '2025-10-19',
      actualEnd: '2025-10-20',
      status: 'Completed',
    },
    {
      task: 'Monthly: Anode Replacement',
      phase: 'Completed',
      plannedStart: '2025-10-21',
      plannedEnd: '2025-10-22',
      actualStart: '2025-10-21',
      actualEnd: '2025-10-22',
      status: 'Completed',
    },
    {
      task: 'Monthly: Sea Chest Cleaning',
      phase: 'Planned',
      plannedStart: '2025-10-23',
      plannedEnd: '2025-10-25',
      actualStart: '-',
      actualEnd: '-',
      status: 'Not Started',
    },
    {
      task: 'Monthly: Valve Overhaul',
      phase: 'Planned',
      plannedStart: '2025-10-26',
      plannedEnd: '2025-10-31',
      actualStart: '-',
      actualEnd: '-',
      status: 'Not Started',
    },
  ];

  const displayedTasks = view === 'Day' ? dayTasks : view === 'Week' ? weekTasks : monthTasks;

  return (
    <div className="w-full bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timeline Visualization</h1>
          <p className="text-gray-600">Track project progress with a Gantt chart view</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Timeline
        </button>
      </div>

      {/* View Controls */}
      <div className="flex gap-2 mb-6">
        {(['Day', 'Week', 'Month'] as const).map((viewOption) => (
          <button
            key={viewOption}
            onClick={() => setView(viewOption)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === viewOption
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {viewOption}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Timeline Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Task</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phase</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Planned Start</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Planned End</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actual Start</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actual End</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
                <tbody>
                  {displayedTasks.map((task, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-900">{task.task}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{task.phase}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{task.plannedStart}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{task.plannedEnd}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{task.actualStart}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{task.actualEnd}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(task.status)}`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimelineView;