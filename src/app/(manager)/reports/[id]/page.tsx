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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
          <p className="text-gray-600 mt-2">The report you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportDetailView report={report} />
    </div>
  );
}