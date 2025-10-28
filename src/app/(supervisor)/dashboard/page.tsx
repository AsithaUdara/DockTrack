// src/app/(supervisor)/dashboard/page.tsx
'use client';
import { useState } from 'react';
import { mockSupervisorReports } from '@/data/mock-reports';
import { Report, ReportStatus } from '@/types/report.types';
import { mockSupervisorProjects, Project } from '@/data/mock-projects';
import ProjectSelectorModal from '@/components/supervisor/ProjectSelectorModal';
import { useRouter } from 'next/navigation';

const StatCard = ({
  title,
  value,
  icon,
  onClick,
  actionLabel,
  onActionClick,
}: {
  title: string;
  value: string;
  icon: React.ReactElement;
  onClick?: () => void;
  actionLabel?: string;
  onActionClick?: () => void;
}) => {
  const clickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-lg border border-gray-200 flex flex-col justify-between
        ${clickable ? "cursor-pointer hover:bg-gray-50" : "cursor-default"}`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>

      {actionLabel && onActionClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onActionClick();
          }}
          className="mt-4 text-xs px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

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
  const router = useRouter();

  const [showManpowerModal, setShowManpowerModal] = useState(false);

  // Sample data for table
  const manpowerData = [
    { trade: "Welders", workers: 8, hours: 8 },
    { trade: "Fitters", workers: 4, hours: 8 },
    { trade: "Painters", workers: 3, hours: 7 },
    { trade: "Electricians", workers: 2, hours: 6 },
    { trade: "Engineers", workers: 1, hours: 8 },
  ];

  const totalWorkers = manpowerData.reduce((acc, item) => acc + item.workers, 0);
  const totalHours = manpowerData.reduce((acc, item) => acc + item.workers * item.hours, 0);


  const [activeProject, setActiveProject] = useState<Project>(mockSupervisorProjects[0]);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const handleProjectSelect = (project: Project) => {
    setActiveProject(project);
    setModalOpen(false);
  };

  const [showSafetyModal, setShowSafetyModal] = useState(false);

  const previousIssues = [
    {
      date: "12/10/2025",
      type: "Material Shortage",
      desc: "Steel plate A3-15 not available in stores. Welding stopped at 4:30 PM. Need urgent procurement.",
      impact: "Minor (< 4h)",
      lost: "0.5 hours",
      action: "Informed stores manager. Moved team to deck painting work instead to maintain productivity.",
      priority: "Medium",
    },
    {
      date: "09/08/2025",
      type: "Weather change - Rain in 1 hour",
      desc: "The weather forecast shows there will be raining in an hour, the planned work will have to be delayed",
      impact: "Minor (< 10h)",
      lost: "5 hour",
      action: "Informed the ship building crew",
      priority: "High",
    },
  ];

  const [showNewIssueModal, setShowNewIssueModal] = useState(false);
  const [newIssueData, setNewIssueData] = useState({
    date: '',
    type: '',
    desc: '',
    impact: '',
    lost: '',
    action: '',
    priority: 'Medium',
  });

  const pendingReports = mockSupervisorReports.filter(r => r.status === 'Pending');
  const draftReports = mockSupervisorReports.filter(r => r.status === 'Draft');

  return (
    <>
      {showManpowerModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Manpower Table</h2>
              <button
                onClick={() => setShowManpowerModal(false)}
                className="text-gray-600 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <table className="min-w-full border border-blue-200 text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b text-gray-700">Trade</th>
                  <th className="px-4 py-2 text-left border-b text-gray-700">Workers</th>
                  <th className="px-4 py-2 text-left border-b text-gray-700">Hours</th>
                  <th className="px-4 py-2 text-left border-b text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {manpowerData.map((item, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 text-gray-700">{item.trade}</td>
                    <td className="px-4 py-2 text-gray-700">{item.workers}</td>
                    <td className="px-4 py-2 text-gray-700">{item.hours}h</td>
                    <td className="px-4 py-2 text-gray-700">{item.workers * item.hours}h</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="px-4 py-2 text-gray-700">Total</td>
                  <td className="px-4 py-2 text-gray-700">{totalWorkers} workers</td>
                  <td className="px-4 py-2 text-gray-700"></td>
                  <td className="px-4 py-2 text-gray-700">{totalHours}h</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 space-y-1 text-gray-700 text-sm">
              <p><span className="font-semibold">Overtime Hours:</span> Welders: 2 workers × 2 hours = 4 OT</p>
              <p><span className="font-semibold">Absentees:</span> Kumar (Welder) - Sick leave</p>
            </div>
          </div>
        </div>
      )}

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
          <button className="mt-4 md:mt-0 w-full md:w-auto flex items-center justify-center px-5 py-2.5 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Start New Report
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Man-Hours Logged" value="56 Hours"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            onClick={() => setShowManpowerModal(true)}
          />
          <StatCard title="Open Safety Issues" value="2"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
            onClick={() => setShowSafetyModal(true)}
            actionLabel="Report Issue Now"
            onActionClick={() => setShowNewIssueModal(true)}
          />
          <StatCard title="Photos Uploaded" value="15"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            onClick={() => router.push('/capture')}
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

      {showSafetyModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Previous Safety Issues</h2>
              <button
                onClick={() => setShowSafetyModal(false)}
                className="text-gray-600 hover:text-gray-700 text-xl"
              >×</button>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {previousIssues.map((issue, i) => (
                <div className="p-4 bg-gray-50 rounded-md border">
                  <div className="grid grid-cols-[140px_1fr] gap-y-1 gap-x-4">
                    <span className="font-semibold text-gray-800">Date:</span>
                    <span className="text-gray-700">{issue.date}</span>

                    <span className="font-semibold text-gray-800">Type:</span>
                    <span className="text-gray-700">{issue.type}</span>

                    <span className="font-semibold text-gray-800">Description:</span>
                    <span className="text-gray-700 leading-snug">{issue.desc}</span>

                    <span className="font-semibold text-gray-800">Impact Level:</span>
                    <span className="text-gray-700">{issue.impact}</span>

                    <span className="font-semibold text-gray-800">Time Lost:</span>
                    <span className="text-gray-700">{issue.lost}</span>

                    <span className="font-semibold text-gray-800">Action Taken:</span>
                    <span className="text-gray-700 leading-snug">{issue.action}</span>

                    <span className="font-semibold text-gray-800">Priority:</span>
                    <span className="flex items-center gap-2 text-gray-800">
                      <span
                        className={`w-2 h-2 rounded-full inline-block ${issue.priority === "High" ? "bg-red-600" : "bg-yellow-500"
                          }`}
                      ></span>
                      {issue.priority}
                    </span>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      )}

      {showNewIssueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Report New Safety Issue</h2>
              <button
                onClick={() => setShowNewIssueModal(false)}
                className="text-gray-600 hover:text-gray-700 text-xl"
              >×</button>
            </div>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              {/* Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 text-gray-600"
                  value={newIssueData.date}
                  onChange={e => setNewIssueData({ ...newIssueData, date: e.target.value })}
                />
              </div>

              {/* Type */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Type</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 text-gray-600"
                  value={newIssueData.type}
                  onChange={e => setNewIssueData({ ...newIssueData, type: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="border border-gray-300 rounded-md p-2 text-gray-600"
                  value={newIssueData.desc}
                  onChange={e => setNewIssueData({ ...newIssueData, desc: e.target.value })}
                />
              </div>

              {/* Impact */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Impact</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 text-gray-600"
                  value={newIssueData.impact}
                  onChange={e => setNewIssueData({ ...newIssueData, impact: e.target.value })}
                />
              </div>

              {/* Time Lost */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Time Lost</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 text-gray-600"
                  value={newIssueData.lost}
                  onChange={e => setNewIssueData({ ...newIssueData, lost: e.target.value })}
                />
              </div>

              {/* Action Taken */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Action Taken</label>
                <textarea
                  rows={2}
                  className="border border-gray-300 rounded-md p-2 text-gray-600"
                  value={newIssueData.action}
                  onChange={e => setNewIssueData({ ...newIssueData, action: e.target.value })}
                />
              </div>

              {/* Priority */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Priority</label>
                <select
                  className="border border-gray-300 rounded-md p-2 text-gray-600"
                  value={newIssueData.priority}
                  onChange={e => setNewIssueData({ ...newIssueData, priority: e.target.value })}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              {/* Submit */}
              <button
                onClick={() => {
                  console.log("Submit new issue:", newIssueData);
                  setShowNewIssueModal(false);
                }}
                className="mt-3 w-full bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}