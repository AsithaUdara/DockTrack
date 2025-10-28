// src/app/(manager)/reports/[id]/page.tsx
'use client';

import { use } from 'react';
import { getDetailedReport } from '@/data/mock-reports';
import ReportDetailView from '@/components/manager/reports/ReportDetailView';

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const report = getDetailedReport(id);

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-full py-12">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Report Not Found</h2>
          <p className="text-slate-600 mt-2">The report you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <ReportDetailView report={report} />;
}