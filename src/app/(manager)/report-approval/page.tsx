"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock static data
const reportData = {
    reportId: "DR-2025-10-26-001",
    date: "2025-10-26",
    supervisorName: "John Silva",
    supervisorId: "SUP-001",
    vessel: "MV Sea Serpent",
    dockLocation: "Dry Dock 3, West Side",
    
    dailyTasks: [
        {
            id: "TSK-2025-001",
            taskName: "Hull Cleaning and Inspection",
            status: "Completed",
            assignedBy: "Operations Manager",
            manHours: 48,
            personnelCount: 6,
            completionPercentage: 100,
        },
        {
            id: "TSK-2025-002",
            taskName: "Propeller Maintenance",
            status: "In Progress",
            assignedBy: "Chief Engineer",
            manHours: 32,
            personnelCount: 4,
            completionPercentage: 75,
        },
        {
            id: "TSK-2025-003",
            taskName: "Deck Painting",
            status: "Completed",
            assignedBy: "Operations Manager",
            manHours: 24,
            personnelCount: 3,
            completionPercentage: 100,
        },
    ],

    totalManHours: {
        estimatedHours: 104,
        actualHours: 104,
        trades: {
            welders: { hours: 40, count: 5 },
            fitters: { hours: 32, count: 4 },
            painters: { hours: 24, count: 3 },
            riggers: { hours: 8, count: 1 },
        }
    },

    totalMaterials: {
        steel: { quantity: 250, unit: 'kg' },
        paint: { quantity: 150, unit: 'liters' },
        weldingRods: { quantity: 100, unit: 'rods' },
        bolts: { quantity: 500, unit: 'pcs' },
    },

    totalEquipment: {
        crane: { hours: 16, quantity: 2 },
        weldingMachine: { hours: 40, quantity: 3 },
        grinder: { hours: 20, quantity: 4 },
        scaffolding: { hours: 104, quantity: 8 },
    },

    issues: [
        {
            severity: "Minor",
            category: "Material Shortage",
            description: "Welding rods supply ran low in the afternoon. Replenished from backup storage.",
            resolvedStatus: "Resolved",
        },
        {
            severity: "Critical",
            category: "Safety Hazard",
            description: "Scaffolding stability issue detected on Deck 3. Work halted, scaffolding reinforced.",
            resolvedStatus: "Resolved",
        },
    ],

    tomorrowPlan: [
        "Complete propeller blade repairs and balancing tests",
        "Begin electrical system inspection on main deck",
        "Continue deck painting on port side sections",
        "Schedule crane for lifting equipment to upper deck",
        "Conduct safety toolbox meeting at 7:30 AM",
        "Request additional welding rods supply",
        "Inspect all scaffolding structures before use"
    ],

    overallProgress: {
        dailyCompletionRate: 85,
        scheduleStatus: "On Track",
        qualityRating: "Excellent",
        safetyCompliance: 100,
        remarks: "Productive day with all major tasks completed or progressing well. Team coordination was excellent. Minor material shortage was quickly resolved. Safety incident was handled promptly and professionally.",
    }
};

export default function DailyReportApproval() {
    const router = useRouter();
    const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved'>('pending');
    const [managerFeedback, setManagerFeedback] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

    const handleApprove = () => {
        setApprovalStatus('approved');
        setNotificationType('success');
        setNotificationMessage('Successfully approved. Final report has been sent to the Supervisor.');
        setShowNotification(true);
        // In real app: send to backend
    };

    const viewTaskDetail = (taskId: string) => {
        // Navigate to task detail page
        router.push(`/report-approval/task-details?id=${taskId}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-[#104E8B] shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-extrabold text-white tracking-wide">
                        Daily Report Approval <span className="text-[#FBBF24]">|</span> Manager View
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                
                {/* Section 1: Basic Report Details */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#104E8B] mb-6">
                    <h2 className="text-xl font-bold text-[#104E8B] mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Basic Report Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Report ID</p>
                            <p className="font-semibold text-gray-800">{reportData.reportId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-semibold text-gray-800">{reportData.date}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Supervisor</p>
                            <p className="font-semibold text-gray-800">{reportData.supervisorName} ({reportData.supervisorId})</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Vessel</p>
                            <p className="font-semibold text-gray-800">{reportData.vessel}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-semibold text-gray-800">{reportData.dockLocation}</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Daily Tasks List */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Daily Tasks Summary ({reportData.dailyTasks.length} Tasks)
                    </h2>
                    <div className="space-y-4">
                        {reportData.dailyTasks.map((task) => (
                            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 mb-1">{task.taskName}</h3>
                                        <p className="text-sm text-gray-600">Task ID: <span className="font-medium text-gray-700">{task.id}</span></p>
                                    </div>
                                    <button
                                        onClick={() => viewTaskDetail(task.id)}
                                        className="ml-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition text-sm font-medium flex items-center gap-2"
                                    >
                                        View Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 3: Total Man-Hours */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Total Man-Hours Summary
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Estimated Hours</p>
                            <p className="text-2xl font-bold text-blue-900">{reportData.totalManHours.estimatedHours} hrs</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Actual Hours</p>
                            <p className="text-2xl font-bold text-green-700">{reportData.totalManHours.actualHours} hrs</p>
                        </div>
                    </div>
                    <h3 className="font-semibold text-gray-700 mb-3">Trade Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(reportData.totalManHours.trades).map(([trade, data]) => (
                            <div key={trade} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 capitalize mb-2">{trade}</h4>
                                <div className="space-y-1 text-sm">
                                    <p className="text-gray-600">Hours: <span className="font-semibold text-gray-800">{data.hours} hrs</span></p>
                                    <p className="text-gray-600">Workers: <span className="font-semibold text-gray-800">{data.count}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 4: Total Materials */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Total Materials Used
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Steel</h4>
                            <p className="text-2xl font-bold text-blue-900">{reportData.totalMaterials.steel.quantity}</p>
                            <p className="text-sm text-gray-600">{reportData.totalMaterials.steel.unit}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Paint</h4>
                            <p className="text-2xl font-bold text-blue-900">{reportData.totalMaterials.paint.quantity}</p>
                            <p className="text-sm text-gray-600">{reportData.totalMaterials.paint.unit}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Welding Rods</h4>
                            <p className="text-2xl font-bold text-blue-900">{reportData.totalMaterials.weldingRods.quantity}</p>
                            <p className="text-sm text-gray-600">{reportData.totalMaterials.weldingRods.unit}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Bolts & Fasteners</h4>
                            <p className="text-2xl font-bold text-blue-900">{reportData.totalMaterials.bolts.quantity}</p>
                            <p className="text-sm text-gray-600">{reportData.totalMaterials.bolts.unit}</p>
                        </div>
                    </div>
                </div>

                {/* Section 5: Total Equipment */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Total Equipment Used
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(reportData.totalEquipment).map(([equipment, data]) => (
                            <div key={equipment} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 capitalize mb-2">{equipment.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">Hours: <span className="font-semibold text-gray-800">{data.hours} hrs</span></p>
                                    <p className="text-sm text-gray-600">Quantity: <span className="font-semibold text-gray-800">{data.quantity} units</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 6: Issues Reporting */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 mb-6">
                    <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Issues Reported ({reportData.issues.length})
                    </h2>
                    <div className="space-y-4">
                        {reportData.issues.map((issue, index) => (
                            <div key={index} className={`border-l-4 p-4 rounded ${
                                issue.severity === 'Critical' 
                                    ? 'border-red-500 bg-red-50' 
                                    : 'border-yellow-500 bg-yellow-50'
                            }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        issue.severity === 'Critical' 
                                            ? 'bg-red-200 text-red-800' 
                                            : 'bg-yellow-200 text-yellow-800'
                                    }`}>
                                        {issue.severity}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">{issue.category}</span>
                                </div>
                                <p className="text-sm text-gray-700">{issue.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 7: Tomorrow's Work Suggestions */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 mb-6">
                    <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Tomorrow's Work Suggestions
                    </h2>
                    <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                        {reportData.tomorrowPlan.map((suggestion, index) => (
                            <p key={index} className="text-gray-700">• {suggestion}</p>
                        ))}
                    </div>
                </div>

                {/* Section 8: Overall Daily Progress */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 mb-6">
                    <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Overall Daily Progress
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600 mb-1">Daily Completion</p>
                            <p className="text-3xl font-bold text-green-700">{reportData.overallProgress.dailyCompletionRate}%</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600 mb-1">Schedule Status</p>
                            <p className="text-lg font-bold text-blue-700">{reportData.overallProgress.scheduleStatus}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600 mb-1">Safety Compliance</p>
                            <p className="text-3xl font-bold text-purple-700">{reportData.overallProgress.safetyCompliance}%</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">Supervisor Remarks</h3>
                        <p className="text-gray-700 leading-relaxed">{reportData.overallProgress.remarks}</p>
                    </div>
                </div>

                {/* Section 9: Manager Feedback */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 mb-6">
                    <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Manager Feedback
                    </h2>
                    <div>
                        <label htmlFor="managerFeedback" className="block text-sm font-medium text-gray-700 mb-2">
                            Provide your feedback on this daily report
                        </label>
                        <textarea
                            id="managerFeedback"
                            rows={6}
                            value={managerFeedback}
                            onChange={(e) => setManagerFeedback(e.target.value)}
                            placeholder="Enter your feedback, comments, recommendations, or concerns regarding this daily report..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
                            style={{ 
                                fontSize: '15px',
                                color: '#1f2937'
                            }}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            {managerFeedback.length} characters • Optional field
                        </p>
                    </div>
                </div>

                {/* Section 10: Manager Action */}
                    {approvalStatus === 'pending' && (
                        <div className="flex justify-end">
                            <button
                                onClick={handleApprove}
                                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Approve Report
                            </button>
                        </div>
                    )}

                    {approvalStatus === 'approved' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-green-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold">Report Approved Successfully</span>
                            </div>
                        </div>
                    )}
                              
            </main>

            {/* Toast Notification */}
            {showNotification && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
                    <div className={`bg-white rounded-lg shadow-2xl max-w-md p-4 border-l-4 ${
                        notificationType === 'success' ? 'border-green-500' : 'border-red-500'
                    }`}>
                        <div className="flex items-start gap-3">
                            {notificationType === 'success' ? (
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className={`text-sm font-bold mb-1 ${
                                    notificationType === 'success' ? 'text-green-800' : 'text-red-800'
                                }`}>
                                    {notificationType === 'success' ? 'Success' : 'Error'}
                                </h3>
                                <p className="text-sm text-gray-700">{notificationMessage}</p>
                            </div>
                            <button
                                onClick={() => setShowNotification(false)}
                                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="mt-12 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
                Dockyard Sri Lanka | Manager Dashboard | Version 1.0
            </footer>
        </div>
    );
}
