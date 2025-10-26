'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ManagerService } from '@/services/manager.service';
import { Project } from '@/types/project.types';
import HeaderWithSidebar from '@/components/shared/layout/Header';

export default function AllProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'On Track' | 'At Risk' | 'Delayed'>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await ManagerService.getAllProjects();
        setProjects(data ?? []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.vesselName.toLowerCase().includes(q) ||
      project.projectType.toLowerCase().includes(q) ||
      project.manager.toLowerCase().includes(q);

    const matchesFilter = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on track':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'at risk':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'delayed':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/manager/projects/${projectId}`);
  };

  if (loading) {
    return (
      <HeaderWithSidebar
        title="Projects"
        active="Projects"
        userName="Manager John Silva"
        userEmail="manager@cdl.lk"
      >
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003d82] mx-auto mb-3" />
            <p className="text-gray-600">Loading projects…</p>
          </div>
        </div>
      </HeaderWithSidebar>
    );
  }

  return (
    <HeaderWithSidebar
      title="Projects"
      active="Projects"
      userName="Manager John Silva"
      userEmail="manager@cdl.lk"
    >
      {/* Keep page content centered and consistent */}
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a3b76]">
            All Projects
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Overview of all ongoing projects at Colombo Dockyard
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by vessel, project type, or manager…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'On Track', 'At Risk', 'Delayed'] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setStatusFilter(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === tag
                      ? 'bg-[#003d82] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tag === 'all' ? 'All' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects grid */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-600">No projects found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredProjects.map((project) => {
                const daysRemaining = calculateDaysRemaining(project.endDate);
                return (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-[#003d82] hover:shadow-md transition-all cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 mb-1 truncate">
                          {project.vesselName}
                        </h3>
                        <p className="text-sm text-slate-600 truncate">{project.projectType}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded border ml-2 whitespace-nowrap ${getPriorityBadge(
                          project.priority
                        )}`}
                      >
                        {project.priority.toUpperCase()}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <span
                        className={`inline-flex text-xs font-medium px-2.5 py-1 rounded border ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Manager:</span>
                        <span className="font-medium text-slate-900">{project.manager}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Workers:</span>
                        <span className="font-medium text-slate-900">{project.workers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Days Left:</span>
                        <span className={`font-medium ${daysRemaining < 7 ? 'text-rose-600' : 'text-slate-900'}`}>
                          {daysRemaining} days
                        </span>
                      </div>
                      {project.pendingReports > 0 && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                          <span className="text-slate-600">Pending Reports:</span>
                          <span className="font-medium text-amber-600">{project.pendingReports}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </HeaderWithSidebar>
  );
}
