// src/app/manager/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import HeaderWithSidebar from '@/components/shared/layout/Header';
import DashboardStats from '@/components/manager/dashboard/DashboardStats';
import ProjectOverview from '@/components/manager/dashboard/ProjectOverview';
import PendingReports from '@/components/manager/dashboard/PendingReports';
import AlertsPanel from '@/components/manager/dashboard/AlertsPanel';

import { ManagerService } from '@/services/manager.service';
import {
  DashboardStats as StatsType,
  Project,
  RecentActivity,
} from '@/types/project.types';

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
          ManagerService.getActiveProjects(),
          ManagerService.getRecentActivities(),
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
      <HeaderWithSidebar
        title="Manager Dashboard"
        active="Dashboard"
        userName="Manager John Silva"
        userEmail="manager@cdl.lk"
      >
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003d82] mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </HeaderWithSidebar>
    );
  }

  return (
    <HeaderWithSidebar
      title="Manager Dashboard"
      active="Dashboard"
      userName="Manager John Silva"
      userEmail="manager@cdl.lk"
    >
      {/* Page Title */}
      <div className="mb-5 sm:mb-7">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a3b76]">
          Operations Dashboard
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Overview of all ongoing projects and shipyard activities
        </p>
      </div>

      {/* Stat cards */}
      {stats && <DashboardStats stats={stats} />}

      {/* Pending Approvals + Recent Activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-5 sm:mb-7">
        {/* Pending Approvals */}
        <section className="sm:col-span-2 lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow hover:shadow-md transition-shadow">
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Pending Approvals
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Review and approve daily reports from supervisors
              </p>
            </div>
            <div className="px-5 pb-5">
              <PendingReports
                projects={projects}
                onViewReports={handleViewReports}
              />
            </div>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="sm:col-span-1 lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow hover:shadow-md transition-shadow">
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Recent Activities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Latest updates across your projects
              </p>
            </div>
            <div className="px-5 pb-5">
              <AlertsPanel activities={activities} />
            </div>
          </div>
        </section>
      </div>

      {/* Project Overview */}
      <ProjectOverview
        withHeader={true}
        projects={projects}
        onProjectClick={handleProjectClick}
      />
    </HeaderWithSidebar>
  );
}