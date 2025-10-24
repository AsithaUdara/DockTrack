// src/components/manager/reports/ReportsList.tsx

'use client';

import React from 'react';
import { DailyReport } from '@/types/report.types';
import ReportCard from './ReportCard';

interface ReportsListProps {
  reports: DailyReport[];
  onReportClick: (reportId: string) => void;
}

export default function ReportsList({ reports, onReportClick }: ReportsListProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Reports Found</h3>
        <p className="text-slate-400">There are no reports matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onClick={() => onReportClick(report.id)}
        />
      ))}
    </div>
  );
}