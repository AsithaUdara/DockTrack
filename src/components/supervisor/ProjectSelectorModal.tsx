// src/components/supervisor/ProjectSelectorModal.tsx
import { mockSupervisorProjects, Project } from "@/data/mock-projects";

interface ProjectSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  currentProjectId: string;
}

export default function ProjectSelectorModal({ isOpen, onClose, onSelectProject, currentProjectId }: ProjectSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-gray-800">Select Active Project</h2>
        <p className="text-gray-500 mb-4">Choose the project you are working on today.</p>
        <div className="space-y-2">
          {mockSupervisorProjects.map(project => (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                project.id === currentProjectId 
                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-300' 
                : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              }`}
            >
              <p className="font-semibold text-gray-900">{project.vesselName}</p>
              <p className="text-sm text-gray-600">{project.projectId} - {project.dockNo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
