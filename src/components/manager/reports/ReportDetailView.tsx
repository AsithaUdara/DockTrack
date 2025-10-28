'use client';

import { useState } from 'react';
import { DetailedReport } from '@/types/report.types';
import PhotoGalleryView from './PhotoGalleryView';
import IssuesView from './IssuesView';
import TomorrowPlanView from './TommorowPlanView';
import ManagerCommentBox from './ManagerCommentBox';
import ApprovalPanel from './ApprovalPanel';
import Header from '../../shared/layout/Header';

interface Props {
  report: DetailedReport;
}

export default function ReportDetailView({ report }: Props) {
  const [activeTab, setActiveTab] = useState<'details' | 'photos' | 'issues' | 'timeline'>('details');
  const [showApprovalPanel, setShowApprovalPanel] = useState(false);

  const tabs = [
    { id: 'details', label: 'Details', icon: '📋' },
    { id: 'photos', label: 'Photos', icon: '📸', count: report.photos.length },
    { id: 'issues', label: 'Issues', icon: '⚠️', count: report.issues.length },
    { id: 'timeline', label: 'Timeline', icon: '📈' }
  ];

  return (
    <Header title={report.projectName} active="Reports">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {report.projectName}
              </h1>
              <p className="text-gray-600 mt-1">
                Supervisor: {report.supervisorName} | Submitted: {report.submittedAt}
              </p>
            </div>
            
            {/* Status Badge */}
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              String(report.status) === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              String(report.status) === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {String(report.status).toUpperCase()}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">📋 Quick Overview</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Progress:</span>
                <span className="ml-2 text-blue-900">{report.overallProgress}%</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Workers:</span>
                <span className="ml-2 text-blue-900">{report.totalWorkers}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Man-Hours:</span>
                <span className="ml-2 text-blue-900">{report.totalManHours}h</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Issues:</span>
                <span className="ml-2 text-blue-900">{report.issues.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'details' && (
              <DetailsTab report={report} />
            )}
            {activeTab === 'photos' && (
              <PhotoGalleryView photos={report.photos} />
            )}
            {activeTab === 'issues' && (
              <IssuesView issues={report.issues} reportId={report.id} />
            )}
            {activeTab === 'timeline' && (
              <TimelineTab report={report} />
            )}
          </div>
        </div>

        {/* Tomorrow's Plan Section */}
        <TomorrowPlanView plan={report.tomorrowPlan} />

        {/* Manager Comments Section */}
        <ManagerCommentBox reportId={report.id} existingComments={report.managerComments} />

        {/* Approval Panel */}
        {String(report.status) === 'pending' && (
          <ApprovalPanel
            reportId={report.id}
            onApprove={() => {/* Handle approval */}}
            onReject={() => {/* Handle rejection */}}
          />
        )}
      </div>
    </Header>
  );
}

// Details Tab Component
function DetailsTab({ report }: { report: DetailedReport }) {
  return (
    <div className="space-y-6">
      {/* Work Completed */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Work Completed</h3>
        <div className="space-y-3">
          {report.tasks.map((task, index) => (
            <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{task.workType}</h4>
                  <p className="text-sm text-gray-600 mt-1">{task.location}</p>
                  <p className="text-sm text-gray-700 mt-2">{(task as any).description || (task as any).notes || ''}</p>
                </div>
                <div className="ml-4">
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">{task.completion}%</span>
                    <p className="text-xs text-gray-600 mt-1">{task.quality}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manpower */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">👷 Manpower & Man-Hours</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {report.manpower.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.trade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.workers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.hours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {item.totalHours}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Weather & Safety */}
      <div className="grid grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">☀️ Weather Conditions</h3>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
            <p className="text-sm text-gray-900"><span className="font-medium">Morning:</span> {report.weather.morning}</p>
            <p className="text-sm text-gray-900"><span className="font-medium">Afternoon:</span> {report.weather.afternoon}</p>
            <p className="text-sm text-gray-900"><span className="font-medium">Temperature:</span> {report.weather.temperature}</p>
            <p className="text-sm text-gray-900"><span className="font-medium">Impact:</span> {report.weather.impact}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🦺 Safety Information</h3>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2">
            <p className="text-sm text-gray-900"><span className="font-medium">Briefing:</span> {report.safety.briefingTime}</p>
            <p className="text-sm text-gray-900"><span className="font-medium">Attendees:</span> {report.safety.attendees}</p>
            <p className="text-sm text-gray-900"><span className="font-medium">PPE Compliance:</span> {report.safety.ppeCompliance}%</p>
            <p className="text-sm text-gray-900"><span className="font-medium">Incidents:</span> {report.safety.incidents}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function TimelineTab({ report }: { report: DetailedReport }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Project Timeline</h3>
      {/* Add Gantt chart or timeline visualization here */}
      <p className="text-gray-600">Timeline visualization will be implemented by Himashi</p>
    </div>
  );
}