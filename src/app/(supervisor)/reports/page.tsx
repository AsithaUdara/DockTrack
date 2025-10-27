// src/app/(supervisor)/reports/page.tsx
'use client'
import { useState } from 'react';
import { mockSupervisorReports } from '@/data/mock-reports';
import { Report, ReportStatus } from '@/types/report.types';

const ReportListItem = ({ report }: { report: Report }) => {
  const statusStyles: { [key in ReportStatus]: string } = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Revision: 'bg-red-100 text-red-800',
    Draft: 'bg-gray-100 text-gray-800',
  };
  return (
    <div className="flex justify-between items-center py-3 px-1 hover:bg-gray-50 rounded-md">
      <div>
        <p className="font-semibold text-gray-800 text-sm">{report.vesselName} - Day {report.dayOfProject}</p>
        <p className="text-xs text-gray-500">{report.date}</p>
      </div>
      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusStyles[report.status]}`}>
        {report.status}
      </span>
    </div>
  );
};

export default function MyReportsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Pending', 'Draft', 'Approved', 'Revision'];

    const filteredReports = activeTab === 'All' 
        ? mockSupervisorReports 
        : mockSupervisorReports.filter(r => r.status === activeTab);

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reports</h1>
            <p className="text-gray-600 mb-6">View and manage all your submitted and drafted reports.</p>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === tab 
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-4">
                {filteredReports.map(report => (
                   <div key={report.id} className="border-b last:border-b-0 border-gray-200">
                     <ReportListItem report={report} />
                   </div>
                ))}
            </div>
        </div>
    );
}
