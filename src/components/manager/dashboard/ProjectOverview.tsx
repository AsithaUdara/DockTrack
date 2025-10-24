// src/components/manager/dashboard/ProjectOverview.tsx

'use client';

import React, { useState } from 'react';
import { Project } from '@/types/project.types';
import Image from 'next/image';

interface ProjectOverviewProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export default function ProjectOverview({ projects, onProjectClick }: ProjectOverviewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.vesselName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">All Projects</h2>
      
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            View All
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            By Dock
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            By Status
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Search Projects
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onProjectClick?.(project)}
            className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
          >
            {/* Vessel Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
              <Image
                src={project.vesselImage}
                alt={project.vesselName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-1 truncate">
                {project.vesselName}
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                Progress: {project.progress}%
              </p>
              <p className="text-slate-400 text-sm">
                Days Remaining: {project.daysRemaining}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No projects found matching your criteria</p>
        </div>
      )}
    </div>
  );
}