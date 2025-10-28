import React from 'react';
import { Project } from '@/types/project.types';

interface GanttChartProps {
  project: Project;
  showMilestones: boolean;
}

const getMilestoneStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500 border-green-600';
    case 'current':
      return 'bg-blue-500 border-blue-600 ring-4 ring-blue-200';
    case 'upcoming':
      return 'bg-gray-300 border-gray-400';
    default:
      return 'bg-gray-200 border-gray-300';
  }
};

export const GanttChart: React.FC<GanttChartProps> = ({ project, showMilestones }) => {
  return (
    <div className="overflow-x-auto">
      {/* Timeline Header */}
      <div className="flex mb-4 min-w-max">
        <div className="w-64 flex-shrink-0"></div>
        <div className="flex-1 flex">
          {Array.from({ length: project.totalDays }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`flex-1 min-w-[40px] text-center text-xs font-medium py-2 border-r border-gray-200 ${
                day === project.currentDay
                  ? 'bg-blue-100 text-blue-700'
                  : day < project.currentDay
                  ? 'bg-gray-50 text-gray-600'
                  : 'text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Phase Rows */}
      <div className="space-y-3 min-w-max">
        {project.phases.map((phase) => (
          <div key={phase.id} className="flex items-center">
            {/* Phase Info */}
            <div className="w-64 flex-shrink-0 pr-4">
              <div className="font-medium text-gray-900">{phase.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                Day {phase.startDay} - {phase.endDay}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${phase.color} transition-all`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{phase.progress}%</span>
              </div>
            </div>

            {/* Timeline Bar */}
            <div className="flex-1 relative h-12">
              <div className="absolute inset-0 flex">
                {Array.from({ length: project.totalDays }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className="flex-1 min-w-[40px] border-r border-gray-200"
                  />
                ))}
              </div>
              <div
                className={`absolute h-8 rounded-lg shadow-md flex items-center justify-center text-white text-sm font-medium transition-all ${phase.color}`}
                style={{
                  left: `${((phase.startDay - 1) / project.totalDays) * 100}%`,
                  width: `${((phase.endDay - phase.startDay + 1) / project.totalDays) * 100}%`
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div
                    className="absolute left-0 h-full bg-black bg-opacity-20 rounded-lg transition-all"
                    style={{ width: `${phase.progress}%` }}
                  />
                  <span className="relative z-10">{phase.status === 'completed' ? '✓' : phase.status === 'in-progress' ? '▶' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      {showMilestones && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Milestones</h3>
          <div className="flex items-start min-w-max">
            <div className="w-64 flex-shrink-0"></div>
            <div className="flex-1 relative" style={{ height: '80px' }}>
              <div className="absolute inset-0 flex">
                {Array.from({ length: project.totalDays }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className="flex-1 min-w-[40px] border-r border-gray-200"
                  />
                ))}
              </div>
              {project.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${((milestone.day - 0.5) / project.totalDays) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${getMilestoneStatusColor(milestone.status)}`} />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 text-center">
                    <div className="text-xs font-medium text-gray-900 whitespace-nowrap">
                      {milestone.name}
                    </div>
                    <div className="text-xs text-gray-500">Day {milestone.day}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};