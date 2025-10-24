// src/components/manager/reports/ReportCard.tsx

'use client';

import React from 'react';
import { DailyReport } from '@/types/report.types';

interface ReportCardProps {
  report: DailyReport;
  onClick: () => void;
}

export default function ReportCard({ report, onClick }: ReportCardProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      approved: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
              {report.reportId}
            </h3>
            {getStatusBadge(report.status)}
          </div>
          <p className="text-slate-300 font-medium mb-1">{report.projectName}</p>
          <p className="text-slate-400 text-sm">Submitted by: {report.supervisorName}</p>
        </div>
        
        <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          View
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700/50">
        <div>
          <p className="text-slate-500 text-xs mb-1">Date</p>
          <p className="text-white text-sm font-medium">{new Date(report.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs mb-1">Weather</p>
          <p className="text-white text-sm font-medium">{report.weatherConditions}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs mb-1">Manpower</p>
          <p className="text-white text-sm font-medium">{report.manpowerCount} workers</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs mb-1">Photos</p>
          <p className="text-white text-sm font-medium">{report.photosCount} images</p>
        </div>
      </div>

      {report.criticalIssues && report.criticalIssues > 0 && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
          <span className="text-red-400 text-xl">⚠️</span>
          <span className="text-red-400 text-sm font-medium">
            {report.criticalIssues} Critical Issue{report.criticalIssues > 1 ? 's' : ''} Reported
          </span>
        </div>
      )}
    </div>
  );
}