// src/app/manager/reports/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import HeaderWithSidebar from '@/components/shared/layout/Header';
import { ReportsService } from '@/services/reports.service';
import { ManagerService } from '@/services/manager.service';
import { Report, Project } from '@/types/project.types';

export default function ReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');

  const [reports, setReports] = useState<Report[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (projectId) {
          const [projectData, reportsData] = await Promise.all([
            ManagerService.getProjectById(projectId),
            ReportsService.getReportsByProjectId(projectId),
          ]);
          setProject(projectData ?? null);
          setReports(reportsData ?? []);
        } else {
          const reportsData = await ReportsService.getAllReports();
          setReports(reportsData ?? []);
        }
      } catch (e) {
        console.error('Error fetching reports:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  const handleApprove = async (reportId: string) => {
    try {
      await ReportsService.approveReport(reportId);
      setReports(prev => prev.map(r => (r.id === reportId ? { ...r, status: 'Approved' as const } : r)));
    } catch (e) {
      console.error('Error approving report:', e);
    }
  };

  const handleReject = async (reportId: string) => {
    try {
      await ReportsService.rejectReport(reportId);
      setReports(prev => prev.map(r => (r.id === reportId ? { ...r, status: 'Rejected' as const } : r)));
    } catch (e) {
      console.error('Error rejecting report:', e);
    }
  };

  const filteredReports = reports.filter((report) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (report.reportType || '').toLowerCase().includes(q) ||
      (report.submittedBy || '').toLowerCase().includes(q) ||
      (report.projectName || '').toLowerCase().includes(q) ||
      (report.id || '').toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200 rounded-full';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border border-rose-200 rounded-full';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200 rounded-full';
    }
  };

  const leftBorderByStatus = (status: string) => {
    if (status === 'Pending') return 'border-l-4 border-amber-400';
    if (status === 'Approved') return 'border-l-4 border-emerald-500';
    if (status === 'Rejected') return 'border-l-4 border-rose-500';
    return 'border-l-4 border-slate-300';
    };

  // Loading view inside the shared shell (keeps sidebar visible)
  if (loading) {
    return (
      <HeaderWithSidebar
        title="Reports"
        active="Reports"
        userName="Manager John Silva"
        userEmail="manager@cdl.lk"
      >
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3" />
            <p className="text-gray-600">Loading reports…</p>
          </div>
        </div>
      </HeaderWithSidebar>
    );
  }

  return (
    <HeaderWithSidebar
      title={project ? `Reports · ${project.vesselName}` : 'Reports'}
      active="Reports"
      userName="Manager John Silva"
      userEmail="manager@cdl.lk"
    >
      {/* Page header */}
      <div className="mb-5 sm:mb-7">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              {project ? project.vesselName : 'All Reports'}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              {project ? project.projectType : 'Review and manage submitted reports'}
            </p>
          </div>
          {project && (
            <button
              onClick={() => router.push('/manager/reports')}
              className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 hover:bg-slate-50"
            >
              View all
            </button>
          )}
        </div>
      </div>

      {/* Search / Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
              Search Reports
            </label>
            <input
              type="text"
              placeholder="Search by report ID, project, or supervisor…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder:text-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            >
              <option value="all">All Reports</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project-specific table view */}
      {project ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">Daily Reports</h2>
          </div>

          {/* horizontal scroll on small screens */}
          <div className="responsive-scroll overflow-x-auto">
            <table className="min-w-[720px] w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Report ID</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Submitted By</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                      No reports for this project
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-slate-800">{r.submittedDate}</td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-slate-700 font-mono">{r.id}</td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-slate-700">{r.submittedBy}</td>
                      <td className="px-3 sm:px-4 py-3">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold ${statusBadge(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        {r.status === 'Pending' ? (
                          <div className="flex">
                            <button
                              onClick={() => handleApprove(r.id)}
                              className="px-3 sm:px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg"
                            >
                              Approve
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs sm:text-sm text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <button
                          onClick={() => router.push(`/manager/reports/${r.id}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium
                                     text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
                        >
                          View
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // All reports card list (restyled, green/red buttons)
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Reports List ({filteredReports.length})
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            {filteredReports.length === 0 ? (
              <div className="text-center py-12 text-slate-500">No reports found</div>
            ) : (
              <div className="space-y-4">
                {filteredReports.map((r) => (
                  <div
                    key={r.id}
                    className={`group relative overflow-hidden rounded-xl bg-linear-to-br from-white to-slate-50 border border-slate-200 hover:shadow-md transition ${leftBorderByStatus(r.status)}`}
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                              {r.reportType}
                            </h3>
                            <span
                              className={`text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded ${r.status === 'Pending'
                                ? 'bg-amber-100 text-amber-700'
                                : r.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-rose-100 text-rose-700'
                              }`}
                            >
                              {r.status}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600">{r.projectName}</p>
                        </div>

                        <button
                          onClick={() => router.push(`/manager/reports/${r.id}`)}
                          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                                     text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
                        >
                          View
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-sm text-slate-700 mt-2 mb-3">{r.description}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <div className="flex items-center gap-5 text-xs sm:text-sm text-slate-600">
                          <span>{r.submittedBy}</span>
                          <span>{r.submittedDate}</span>
                        </div>

                        {r.status === 'Pending' && (
                          <div className="flex">
                            <button
                              onClick={() => handleApprove(r.id)}
                              className="px-3 sm:px-4 py-2 rounded-lg text-white text-xs sm:text-sm font-medium bg-emerald-600 hover:bg-emerald-700"
                            >
                              Approve
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </HeaderWithSidebar>
  );
}
