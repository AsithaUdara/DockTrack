'use client';

import { useState } from 'react';
import { DetailedReport } from '@/types/report.types';
import PhotoGalleryView from './PhotoGalleryView';
import TomorrowPlanView from './TommorowPlanView';
import ManagerCommentBox from './ManagerCommentBox';
import ApprovalPanel from './ApprovalPanel';

interface Props {
  report: DetailedReport;
}

export default function ReportDetailView({ report: initialReport }: Props) {
  const [report, setReport] = useState<DetailedReport>(initialReport);
  const [activeSection, setActiveSection] = useState<'report' | 'tomorrow'>('report');

  // Update field handler
  const updateField = (section: string, field: string, value: any, index?: number) => {
    setReport(prev => {
      const updated = { ...prev };
      if (index !== undefined && Array.isArray((updated as any)[section])) {
        (updated as any)[section][index] = {
          ...(updated as any)[section][index],
          [field]: value
        };
      } else {
        (updated as any)[section] = {
          ...(updated as any)[section],
          [field]: value
        };
      }
      return updated;
    });
  };

  return (
    <>
      {/* Page Title - Matching manager dashboard style */}
      <div className="mb-5 sm:mb-7">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a3b76]">
          Daily Work Report
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Review and approve supervisor's daily activity report
        </p>
      </div>

      {/* Report Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 mb-5 sm:mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {report.projectName}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-slate-500">Supervisor:</span>
                <span className="font-semibold text-slate-800">{report.supervisorName}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-slate-500">Submitted:</span>
                <span className="font-semibold text-slate-800">{report.submittedAt}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span>Vessel: {report.vesselName}</span>
              <span>•</span>
              <span>Day {report.dayOfProject}</span>
              <span>•</span>
              <span>{report.date}</span>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`shrink-0 ml-4 px-3.5 py-1.5 rounded-full text-xs font-bold ${
            String(report.status).toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
            String(report.status).toLowerCase() === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            String(report.status).toLowerCase() === 'revision' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
            'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {String(report.status).toUpperCase()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Progress', value: `${report.overallProgress}%`, icon: '📊', color: 'bg-blue-50 border-blue-200 text-[#0a3b76]' },
            { label: 'Workers', value: report.totalWorkers, icon: '👷', color: 'bg-slate-50 border-slate-200 text-slate-700' },
            { label: 'Man-Hours', value: `${report.totalManHours}h`, icon: '⏱️', color: 'bg-slate-100 border-slate-300 text-slate-700' },
            { label: 'Issues', value: report.issues.length, icon: '⚠️', color: 'bg-amber-50 border-amber-200 text-amber-700' }
          ].map((stat, idx) => (
            <div key={idx} className={`rounded-xl border p-3 sm:p-4 ${stat.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-xs font-medium opacity-80">{stat.label}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-5 sm:mb-6">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveSection('report')}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold transition-all ${
              activeSection === 'report'
                ? 'text-[#0a3b76] border-b-2 border-[#0a3b76] bg-blue-50/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span>📋</span>
              <span className="hidden sm:inline">Daily Report</span>
              <span className="sm:hidden">Report</span>
            </span>
          </button>
          <button
            onClick={() => setActiveSection('tomorrow')}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold transition-all ${
              activeSection === 'tomorrow'
                ? 'text-[#0a3b76] border-b-2 border-[#0a3b76] bg-blue-50/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span>📅</span>
              <span className="hidden sm:inline">Tomorrow's Plan</span>
              <span className="sm:hidden">Tomorrow</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeSection === 'report' ? (
        <div className="space-y-6">
          {/* Section 1: Work Completed */}
          <Section1_WorkCompleted report={report} updateField={updateField} />

          {/* Section 2: Manpower */}
          <Section2_Manpower report={report} updateField={updateField} />

          {/* Section 3: Materials Used */}
          <Section3_Materials report={report} updateField={updateField} />

          {/* Section 4: Equipment Used */}
          <Section4_Equipment report={report} updateField={updateField} />

          {/* Section 5: Safety Observations */}
          <Section5_Safety report={report} updateField={updateField} />

          {/* Section 6: Quality Control */}
          <Section6_Quality report={report} updateField={updateField} />

          {/* Section 7: Issues & Delays */}
          <Section7_Issues report={report} updateField={updateField} />

          {/* Section 8: Progress Summary */}
          <Section8_Progress report={report} updateField={updateField} />

          {/* Section 9: Weather Conditions */}
          <Section9_Weather report={report} updateField={updateField} />

          {/* Section 10: Photos */}
          <Section10_Photos report={report} />
        </div>
      ) : (
        <TomorrowPlanView 
          plan={report.tomorrowPlan} 
          updateField={updateField}
          onApprovePlan={() => {/* Handle plan approval */}}
          onRequestChanges={() => {/* Handle request changes */}}
        />
      )}

      {/* Manager Comments and Approval Panel - Only show in report tab */}
      {activeSection === 'report' && (
        <>
          {/* Manager Comments Section */}
          <div className="mt-6">
            <ManagerCommentBox reportId={report.id} existingComments={report.managerComments} />
          </div>

          {/* Approval Panel at the bottom */}
          {String(report.status).toLowerCase() === 'pending' && (
            <div className="mt-6">
              <ApprovalPanel
                reportId={report.id}
                onApprove={() => {/* Handle approval */}}
                onReject={() => {/* Handle rejection */}}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

// Section 1: Work Completed
function Section1_WorkCompleted({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 mb-5">
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Section 1: Work Completed</h2>
        <p className="text-sm text-slate-500 mt-1">Tasks and achievements for today</p>
      </div>
      <div className="space-y-4">
        {report.tasks.map((task, index) => (
          <div key={task.id} className="rounded-xl border border-blue-200 bg-blue-50/30 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Type</label>
                <input
                  type="text"
                  value={task.workType}
                  onChange={(e) => updateField('tasks', 'workType', e.target.value, index)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                <input
                  type="text"
                  value={task.location}
                  onChange={(e) => updateField('tasks', 'location', e.target.value, index)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Planned Work</label>
              <textarea
                value={task.plannedWork}
                onChange={(e) => updateField('tasks', 'plannedWork', e.target.value, index)}
                rows={2}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Actually Completed</label>
              <textarea
                value={task.actuallyCompleted}
                onChange={(e) => updateField('tasks', 'actuallyCompleted', e.target.value, index)}
                rows={2}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Completion %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={task.completion}
                  onChange={(e) => updateField('tasks', 'completion', parseInt(e.target.value), index)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quality</label>
                <select
                  value={task.quality}
                  onChange={(e) => updateField('tasks', 'quality', e.target.value, index)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Acceptable">Acceptable</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Section 2: Manpower
function Section2_Manpower({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 mb-5">
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Section 2: Manpower & Man-Hours</h2>
        <p className="text-sm text-slate-500 mt-1">Workforce allocation and hours logged</p>
      </div>
      <div className="overflow-x-auto -mx-5 sm:-mx-6">
        <div className="inline-block min-w-full align-middle px-5 sm:px-6">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Trade</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Workers</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Hours</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {report.manpower.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.trade}
                      onChange={(e) => updateField('manpower', 'trade', e.target.value, index)}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm text-slate-800 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.workers}
                      onChange={(e) => updateField('manpower', 'workers', parseInt(e.target.value), index)}
                      className="w-20 px-2 py-1.5 border border-slate-200 rounded text-sm text-slate-600 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.hours}
                      onChange={(e) => updateField('manpower', 'hours', parseInt(e.target.value), index)}
                      className="w-20 px-2 py-1.5 border border-slate-200 rounded text-sm text-slate-600 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-[#0a3b76]">
                    {item.totalHours}h
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                  Total Man-Hours:
                </td>
                <td className="px-4 py-3 text-sm font-extrabold text-[#0a3b76]">
                  {report.totalManHours}h
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

// Section 3: Materials Used
function Section3_Materials({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 mb-5">
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Section 3: Materials Used</h2>
        <p className="text-sm text-slate-500 mt-1">Materials consumed during operations</p>
      </div>
      <div className="space-y-3">
        {report.materials.map((material, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <input
              type="text"
              value={material.name}
              onChange={(e) => updateField('materials', 'name', e.target.value, index)}
              placeholder="Material Name"
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
            />
            <input
              type="text"
              value={material.quantity}
              onChange={(e) => updateField('materials', 'quantity', e.target.value, index)}
              placeholder="Quantity"
              className="w-24 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
            />
            <input
              type="text"
              value={material.unit}
              onChange={(e) => updateField('materials', 'unit', e.target.value, index)}
              placeholder="Unit"
              className="w-24 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Section 4: Equipment Used
function Section4_Equipment({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 4: Equipment Used</h2>
      <div className="space-y-2">
        {report.equipment.map((equip, index) => (
          <div key={index} className="flex items-center space-x-2 py-2 border-b border-gray-200">
            <input
              type="text"
              value={equip.name}
              onChange={(e) => updateField('equipment', 'name', e.target.value, index)}
              placeholder="Equipment Name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={equip.hours}
              onChange={(e) => updateField('equipment', 'hours', parseFloat(e.target.value), index)}
              placeholder="Hours"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={equip.status}
              onChange={(e) => updateField('equipment', 'status', e.target.value, index)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Working">Working</option>
              <option value="Needs Service">Needs Service</option>
              <option value="Down">Down</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

// Section 5: Safety Observations
function Section5_Safety({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 5: Safety Observations</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Briefing Conducted</label>
            <select
              value={report.safety.briefingConducted ? 'Yes' : 'No'}
              onChange={(e) => updateField('safety', 'briefingConducted', e.target.value === 'Yes')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Briefing Time</label>
            <input
              type="text"
              value={report.safety.briefingTime}
              onChange={(e) => updateField('safety', 'briefingTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
            <input
              type="number"
              value={report.safety.attendees}
              onChange={(e) => updateField('safety', 'attendees', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PPE Compliance %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={report.safety.ppeCompliance}
              onChange={(e) => updateField('safety', 'ppeCompliance', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incidents</label>
            <input
              type="number"
              value={report.safety.incidents}
              onChange={(e) => updateField('safety', 'incidents', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {report.safety.incidentDetails && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Incident Details</label>
              <textarea
                value={report.safety.incidentDetails}
                onChange={(e) => updateField('safety', 'incidentDetails', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Section 6: Quality Control
function Section6_Quality({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 6: Quality Control</h2>
      <textarea
        value={report.overallComments || ''}
        onChange={(e) => updateField('', 'overallComments', e.target.value)}
        placeholder="Enter quality control observations..."
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

// Section 7: Issues & Delays
function Section7_Issues({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 7: Issues & Delays</h2>
      <div className="space-y-4">
        {report.issues.length === 0 ? (
          <p className="text-gray-600 text-sm">No issues reported.</p>
        ) : (
          report.issues.map((issue, index) => (
            <div key={issue.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                  <input
                    type="text"
                    value={issue.type}
                    onChange={(e) => updateField('issues', 'type', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={issue.description}
                    onChange={(e) => updateField('issues', 'description', e.target.value, index)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action Taken</label>
                  <textarea
                    value={issue.actionTaken}
                    onChange={(e) => updateField('issues', 'actionTaken', e.target.value, index)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                  <select
                    value={issue.impact}
                    onChange={(e) => updateField('issues', 'impact', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Minor">Minor</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Major">Major</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={issue.priority}
                    onChange={(e) => updateField('issues', 'priority', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Lost</label>
                  <input
                    type="text"
                    value={issue.timeLost}
                    onChange={(e) => updateField('issues', 'timeLost', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={issue.status}
                    onChange={(e) => updateField('issues', 'status', e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Section 8: Progress Summary
function Section8_Progress({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 8: Progress Summary</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Overall Progress %</label>
        <input
          type="number"
          min="0"
          max="100"
          value={report.overallProgress}
          onChange={(e) => updateField('', 'overallProgress', parseInt(e.target.value))}
          className="w-32 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <textarea
        value={report.overallComments || ''}
        onChange={(e) => updateField('', 'overallComments', e.target.value)}
        placeholder="Enter progress summary..."
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

// Section 9: Weather Conditions
function Section9_Weather({ report, updateField }: { report: DetailedReport; updateField: Function }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 9: Weather Conditions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Morning Condition</label>
          <input
            type="text"
            value={report.weather.morning}
            onChange={(e) => updateField('weather', 'morning', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Afternoon Condition</label>
          <input
            type="text"
            value={report.weather.afternoon}
            onChange={(e) => updateField('weather', 'afternoon', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
          <input
            type="text"
            value={report.weather.temperature}
            onChange={(e) => updateField('weather', 'temperature', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wind Speed</label>
          <input
            type="text"
            value={report.weather.windSpeed}
            onChange={(e) => updateField('weather', 'windSpeed', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Impact on Work</label>
          <textarea
            value={report.weather.impact}
            onChange={(e) => updateField('weather', 'impact', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

// Section 10: Photos
function Section10_Photos({ report }: { report: DetailedReport }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Section 10: Photo Documentation</h2>
      <PhotoGalleryView photos={report.photos} />
    </div>
  );
}