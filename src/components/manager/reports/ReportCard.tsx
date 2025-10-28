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
      completed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-blue-100 text-blue-800 border-blue-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
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
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-gray-900 font-semibold text-lg group-hover:text-blue-600 transition-colors">
              {report.reportId}
            </h3>
            {getStatusBadge(report.status)}
          </div>
          <p className="text-gray-700 font-medium mb-1">{report.projectName}</p>
          <p className="text-gray-500 text-sm">Submitted by: {report.supervisorName}</p>
        </div>
        
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          View
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-gray-500 text-xs mb-1">Date</p>
          <p className="text-gray-900 text-sm font-medium">{new Date(report.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Weather</p>
          <p className="text-gray-900 text-sm font-medium">{report.weatherConditions}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Manpower</p>
          <p className="text-gray-900 text-sm font-medium">{report.manpowerCount} workers</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Photos</p>
          <p className="text-gray-900 text-sm font-medium">{report.photosCount} images</p>
        </div>
      </div>

      {report.criticalIssues && report.criticalIssues > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
          <span className="text-red-600 text-xl">⚠️</span>
          <span className="text-red-700 text-sm font-medium">
            {report.criticalIssues} Critical Issue{report.criticalIssues > 1 ? 's' : ''} Reported
          </span>
        </div>
      )}
    </div>
  );
}