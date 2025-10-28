// src/app/(supervisor)/dashboard/page.tsx
'use client';
import { useState } from 'react';
import { mockSupervisorReports } from '@/data/mock-reports';
import { Report, ReportStatus } from '@/types/report.types';
import { mockSupervisorProjects, Project } from '@/data/mock-projects';
import ProjectSelectorModal from '@/components/supervisor/ProjectSelectorModal';
import { useRouter } from 'next/navigation';

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactElement }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-200 flex items-center">
    <div className="flex-shrink-0 bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center">
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

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

export default function SupervisorDashboard() {
  const [activeProject, setActiveProject] = useState<Project>(mockSupervisorProjects[0]);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const handleProjectSelect = (project: Project) => {
    setActiveProject(project);
    setModalOpen(false);
  };

  const pendingReports = mockSupervisorReports.filter(r => r.status === 'Pending');
  const draftReports = mockSupervisorReports.filter(r => r.status === 'Draft');
  
  return (
    <>
      <ProjectSelectorModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelectProject={handleProjectSelect}
        currentProjectId={activeProject.id}
      />
      <div className={`space-y-6 transition-all duration-300 ${isModalOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, Supervisor Udara</h1>
          <p className="text-gray-600 mt-1">Here's a summary of your projects for today.</p>
        </div>
        <button
  onClick={() => router.push('/reports/new')}
  className="mt-4 md:mt-0 w-full md:w-auto flex items-center justify-center px-5 py-2.5 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
  Start New Report
</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Man-Hours Logged" value="56 Hours" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
        />
        <StatCard title="Open Safety Issues" value="2" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} 
        />
        <StatCard title="Photos Uploaded" value="15" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current Project</h2>
            <button onClick={() => setModalOpen(true)} className="text-sm font-semibold text-blue-600 hover:text-blue-800">Change Project</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline"><p className="w-32 text-gray-500">Vessel Name:</p><p className="font-semibold text-gray-800">{activeProject.vesselName}</p></div>
            <div className="flex items-baseline"><p className="w-32 text-gray-500">Project ID:</p><p className="text-gray-700">{activeProject.projectId}</p></div>
            <div className="flex items-baseline"><p className="w-32 text-gray-500">Dock No:</p><p className="text-gray-700">{activeProject.dockNo}</p></div>
            <div className="flex items-baseline"><p className="w-32 text-gray-500">Status:</p><p className="font-semibold text-green-600">{activeProject.status}</p></div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">My Reports</h2>
           {pendingReports.length > 0 && (
              <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">PENDING ({pendingReports.length})</h3>
                  <div className="border-t border-gray-200 pt-2">
                    {pendingReports.map(report => <ReportListItem key={report.id} report={report} />)}
                  </div>
              </div>
          )}
          {draftReports.length > 0 && (
              <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">DRAFTS ({draftReports.length})</h3>
                   <div className="border-t border-gray-200 pt-2 space-y-2">
                    {draftReports.map(report => <ReportListItem key={report.id} report={report} />)}
                  </div>
              </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}