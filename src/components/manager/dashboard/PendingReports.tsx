// src/components/manager/dashboard/PendingReports.tsx

'use client';

import React from 'react';
import { Project } from '@/types/project.types';

interface PendingReportsProps {
  projects: Project[];
  onViewReports?: (projectId: string) => void;
}

export default function PendingReports({ projects, onViewReports }: PendingReportsProps) {
  const projectsWithPendingReports = projects.filter(p => p.pendingReports > 0);

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Pending Approvals</h2>
        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
          {projectsWithPendingReports.reduce((sum, p) => sum + p.pendingReports, 0)}
        </span>
      </div>

      <div className="space-y-3">
        {projectsWithPendingReports.map((project) => (
          <div
            key={project.id}
            className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30 hover:border-blue-500/50 transition-all cursor-pointer"
            onClick={() => onViewReports?.(project.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold text-sm truncate flex-1 pr-4">
                {project.name}
              </h3>
              <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                {project.pendingReports} pending
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Manager: {project.manager}</span>
              <span>•</span>
              <span>Progress: {project.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      {projectsWithPendingReports.length === 0 && (
        <div className="text-center py-8">
          <span className="text-5xl mb-2 block">✅</span>
          <p className="text-slate-400">All reports reviewed!</p>
        </div>
      )}
    </div>
  );
}