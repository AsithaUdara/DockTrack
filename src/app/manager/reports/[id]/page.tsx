// src/app/manager/projects/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ManagerService } from '@/services/manager.service';
import { ReportsService } from '@/services/reports.service';
import { Project, Report } from '@/types/project.types';

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('daily-reports');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectData, reportsData] = await Promise.all([
          ManagerService.getProjectById(projectId),
          ReportsService.getReportsByProjectId(projectId)
        ]);
        setProject(projectData);
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const handleViewReport = (reportId: string) => {
    router.push(`/manager/reports/${reportId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-600 text-white';
      case 'Approved': return 'bg-green-600 text-white';
      case 'Rejected': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1d29] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#1a1d29] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Project not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1d29]">
      {/* Header */}
      <header className="bg-[#0f1117] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-white">Dockyard Digital Work Report</h1>
              </div>
            </div>

            <nav className="flex items-center gap-6">
              <a href="/manager/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
              <a href="/manager/projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
              <a href="/manager/reports" className="text-gray-400 hover:text-white transition-colors">Reports</a>
              <a href="/manager/analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</a>
              <a href="/manager/resources" className="text-gray-400 hover:text-white transition-colors">Resources</a>
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Project: {project.vesselName} - {project.projectType}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Contract No: CDPLC-2025-001</span>
            <span>•</span>
            <span>Client: Maritime Shipping Co.</span>
            <span>•</span>
            <span>Project Manager: Mr. {project.manager}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab('daily-reports')}
              className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'daily-reports'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Daily Reports
            </button>
            <button
              onClick={() => setActiveTab('photo-gallery')}
              className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'photo-gallery'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'timeline'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'issues'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Issues
            </button>
          </nav>
        </div>

        {/* Daily Reports Tab Content */}
        {activeTab === 'daily-reports' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Daily Reports</h2>

            {/* Reports Table */}
            <div className="bg-[#0f1117] rounded-lg border border-gray-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#1a1d29] border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Report ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Submitted By</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-gray-400 text-lg">No reports found for this project</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    reports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">{report.submittedDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-300 font-mono">{report.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{report.submittedBy}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewReport(report.id)}
                            className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab === 'photo-gallery' && (
          <div className="bg-[#0f1117] rounded-lg border border-gray-800 p-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-lg">Photo Gallery Coming Soon</p>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-[#0f1117] rounded-lg border border-gray-800 p-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-400 text-lg">Timeline Coming Soon</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-[#0f1117] rounded-lg border border-gray-800 p-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-400 text-lg">Analytics Coming Soon</p>
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="bg-[#0f1117] rounded-lg border border-gray-800 p-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-400 text-lg">Issues Tracking Coming Soon</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}