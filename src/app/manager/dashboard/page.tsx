// src/app/(manager)/dashboard/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from '@/components/manager/dashboard/DashboardStats';
import ProjectOverview from '@/components/manager/dashboard/ProjectOverview';
import PendingReports from '@/components/manager/dashboard/PendingReports';
import AlertsPanel from '@/components/manager/dashboard/AlertsPanel';
import { ManagerService } from '@/services/manager.service';
import { DashboardStats as StatsType, Project, RecentActivity } from '@/types/project.types';

export default function ManagerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsType | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, projectsData, activitiesData] = await Promise.all([
          ManagerService.getDashboardStats(),
          ManagerService.getAllProjects(),
          ManagerService.getRecentActivities()
        ]);
        
        setStats(statsData);
        setProjects(projectsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleProjectClick = (project: Project) => {
    router.push(`/manager/reports?project=${project.id}`);
  };

  const handleViewReports = (projectId: string) => {
    router.push(`/manager/reports?project=${projectId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">Dockyard Manager</h1>
            </div>

            <nav className="flex items-center gap-6">
              <a href="/manager/dashboard" className="text-white font-medium">Dashboard</a>
              <a href="/manager/projects" className="text-slate-400 hover:text-white transition-colors">Projects</a>
              <a href="/manager/reports" className="text-slate-400 hover:text-white transition-colors">Reports</a>
              <a href="/manager/resources" className="text-slate-400 hover:text-white transition-colors">Resources</a>
              <a href="/manager/settings" className="text-slate-400 hover:text-white transition-colors">Settings</a>
              
              <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Manager Dashboard</h1>
          <p className="text-slate-400">Overview of all ongoing projects and activities</p>
        </div>

        {stats && <DashboardStats stats={stats} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PendingReports 
              projects={projects} 
              onViewReports={handleViewReports}
            />
          </div>

          <div className="lg:col-span-1">
            <AlertsPanel activities={activities} />
          </div>
        </div>

        <ProjectOverview 
          projects={projects}
          onProjectClick={handleProjectClick}
        />
      </main>
    </div>
  );
}