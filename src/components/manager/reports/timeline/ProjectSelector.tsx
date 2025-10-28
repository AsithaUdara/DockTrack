import React from 'react';
import Header from '../../../shared/layout/Header';
import { Project } from '@/types/project.types';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: Project;
  onProjectSelect: (project: Project) => void;
}

interface StatusColorMap {
  [key: string]: string;
}

const getStatusColor = (status: string): string => {
  const colors: StatusColorMap = {
    ahead: 'text-green-600 bg-green-50',
    'on-track': 'text-blue-600 bg-blue-50',
    delayed: 'text-red-600 bg-red-50'
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
};

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProject,
  onProjectSelect
}) => {
  return (
    <Header title="Timeline Visualization" active="Projects">
      <div className="flex gap-3 overflow-x-auto pb-2">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onProjectSelect(project)}
          className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
            selectedProject.id === project.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-left">
            <div className="font-semibold text-gray-900">{project.name}</div>
            <div className="text-sm text-gray-600">{project.vessel}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-xs font-medium text-gray-700">
                Day {project.currentDay}/{project.totalDays}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </div>
            </div>
          </div>
        </button>
      ))}
      </div>
    </Header>
  );
};