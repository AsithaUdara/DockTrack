// src/app/(manager)/reports/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReportsList from '@/components/manager/reports/ReportsList';
import { ReportsService } from '@/services/reports.service';
import { DailyReport } from '@/types/report.types';

export default function ManagerReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');

  const [reports, setReports] = useState<DailyReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await ReportsService.getDailyReports(projectId || undefined);
        setReports(data);
        setFilteredReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [projectId]);

  useEffect(() => {
    let filtered = reports;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.supervisorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    setFilteredReports(filtered);
  }, [searchQuery, statusFilter, reports]);

  const handleReportClick = (reportId: string) => {
    router.push(`/manager/reports/${reportId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading reports...</p>
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
              <button
                onClick={() => router.push('/manager/dashboard')}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">Daily Reports</h1>
            </div>

            <nav className="flex items-center gap-6">
              <a href="/manager/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</a>
              <a href="/manager/projects" className="text-slate-400 hover:text-white transition-colors">Projects</a>
              <a href="/manager/reports" className="text-white font-medium">Reports</a>
              <a href="/manager/resources" className="text-slate-400 hover:text-white transition-colors">Resources</a>
              
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Daily Reports</h1>
          <p className="text-slate-400">Review and manage submitted daily reports</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Search Reports
              </label>
              <input
                type="text"
                placeholder="Search by report ID, project, or supervisor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Reports</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/50">
            <div>
              <p className="text-slate-500 text-xs mb-1">Total Reports</p>
              <p className="text-white text-2xl font-bold">{reports.length}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Pending Review</p>
              <p className="text-orange-400 text-2xl font-bold">
                {reports.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Completed</p>
              <p className="text-green-400 text-2xl font-bold">
                {reports.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Critical Issues</p>
              <p className="text-red-400 text-2xl font-bold">
                {reports.reduce((sum, r) => sum + (r.criticalIssues || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <ReportsList reports={filteredReports} onReportClick={handleReportClick} />
      </main>
    </div>
  );
}