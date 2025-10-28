"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock task data - in real app this would come from API/database
const taskDetailsData: { [key: string]: any } = {
    "TSK-2025-001": {
        id: "TSK-2025-001",
        taskName: "Hull Cleaning and Inspection",
        status: "Completed",
        assignedBy: "Operations Manager",
        date: "2025-10-26",
        vessel: "MV Sea Serpent",
        dockLocation: "Dry Dock 3, West Side",
        weatherCondition: "Sunny",
        completionPercentage: 100,
        
        manHours: {
            estimated: 48,
            actual: 48,
            trades: {
                welders: { hours: 16, count: 2 },
                fitters: { hours: 16, count: 2 },
                painters: { hours: 8, count: 1 },
                riggers: { hours: 8, count: 1 },
            }
        },

        materials: {
            steel: { quantity: 100, unit: 'kg' },
            paint: { quantity: 50, unit: 'liters' },
            weldingRods: { quantity: 30, unit: 'rods' },
            bolts: { quantity: 200, unit: 'pcs' },
        },

        equipment: {
            crane: { hours: 8, quantity: 1 },
            weldingMachine: { hours: 16, quantity: 2 },
            grinder: { hours: 8, quantity: 2 },
            scaffolding: { hours: 48, quantity: 4 },
        },

        photoDocumentation: {
            beforePhotos: 5,
            afterPhotos: 5,
        },

        issues: {
            severity: "None",
            category: "N/A",
            description: "No issues encountered. Task completed smoothly.",
        },

        progressSummary: "Hull cleaning completed successfully. All rust removed and surface prepared for painting. Inspection revealed no structural issues. Work quality meets standards.",
    },

    "TSK-2025-002": {
        id: "TSK-2025-002",
        taskName: "Propeller Maintenance",
        status: "In Progress",
        assignedBy: "Chief Engineer",
        date: "2025-10-26",
        vessel: "MV Sea Serpent",
        dockLocation: "Dry Dock 3, West Side",
        weatherCondition: "Cloudy",
        completionPercentage: 75,
        
        manHours: {
            estimated: 32,
            actual: 32,
            trades: {
                welders: { hours: 16, count: 2 },
                fitters: { hours: 16, count: 2 },
                painters: { hours: 0, count: 0 },
                riggers: { hours: 0, count: 0 },
            }
        },

        materials: {
            steel: { quantity: 80, unit: 'kg' },
            paint: { quantity: 0, unit: 'liters' },
            weldingRods: { quantity: 50, unit: 'rods' },
            bolts: { quantity: 150, unit: 'pcs' },
        },

        equipment: {
            crane: { hours: 8, quantity: 1 },
            weldingMachine: { hours: 16, quantity: 1 },
            grinder: { hours: 8, quantity: 2 },
            scaffolding: { hours: 32, quantity: 2 },
        },

        photoDocumentation: {
            beforePhotos: 4,
            afterPhotos: 2,
        },

        issues: {
            severity: "Minor",
            category: "Material Shortage",
            description: "Welding rods supply ran low. Replenished from backup storage.",
        },

        progressSummary: "Propeller blade repairs 75% complete. Two blades fully repaired, one remaining. Final balancing and testing scheduled for tomorrow.",
    },

    "TSK-2025-003": {
        id: "TSK-2025-003",
        taskName: "Deck Painting",
        status: "Completed",
        assignedBy: "Operations Manager",
        date: "2025-10-26",
        vessel: "MV Sea Serpent",
        dockLocation: "Dry Dock 3, West Side",
        weatherCondition: "Sunny",
        completionPercentage: 100,
        
        manHours: {
            estimated: 24,
            actual: 24,
            trades: {
                welders: { hours: 0, count: 0 },
                fitters: { hours: 0, count: 0 },
                painters: { hours: 24, count: 3 },
                riggers: { hours: 0, count: 0 },
            }
        },

        materials: {
            steel: { quantity: 0, unit: 'kg' },
            paint: { quantity: 100, unit: 'liters' },
            weldingRods: { quantity: 0, unit: 'rods' },
            bolts: { quantity: 0, unit: 'pcs' },
        },

        equipment: {
            crane: { hours: 0, quantity: 0 },
            weldingMachine: { hours: 0, quantity: 0 },
            grinder: { hours: 4, quantity: 1 },
            scaffolding: { hours: 24, quantity: 2 },
        },

        photoDocumentation: {
            beforePhotos: 6,
            afterPhotos: 6,
        },

        issues: {
            severity: "Critical",
            category: "Safety Hazard",
            description: "Scaffolding stability issue detected on Deck 3. Work halted, scaffolding reinforced.",
        },

        progressSummary: "All deck surfaces painted with anti-corrosion coating. Two layers applied for maximum protection. Drying time monitored. Quality inspection passed.",
    },
};

export default function TaskDetailsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('id') || 'TSK-2025-001';
    
    const task = taskDetailsData[taskId];

    if (!task) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Task Not Found</h1>
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-[#104E8B] shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-extrabold text-white tracking-wide">
                            Task Details <span className="text-[#FBBF24]">|</span> {task.id}
                        </h1>
                        <button
                            onClick={() => router.back()}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Report
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                
                {/* Task Overview */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#104E8B] mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{task.taskName}</h2>
                            <p className="text-gray-600">Task ID: <span className="font-semibold">{task.id}</span></p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            task.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {task.status}
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div>
                            <p className="text-sm text-gray-600">Assigned By</p>
                            <p className="font-semibold text-gray-800">{task.assignedBy}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-semibold text-gray-800">{task.date}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Weather</p>
                            <p className="font-semibold text-gray-800">{task.weatherCondition}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Vessel</p>
                            <p className="font-semibold text-gray-800">{task.vessel}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-semibold text-gray-800">{task.dockLocation}</p>
                        </div>
                    </div>
                </div>

                {/* Man-Hours Details */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Man-Hours & Resources
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Estimated Hours</p>
                            <p className="text-2xl font-bold text-blue-900">{task.manHours.estimated} hrs</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Actual Hours</p>
                            <p className="text-2xl font-bold text-green-700">{task.manHours.actual} hrs</p>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-700 mb-3">Trade Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(task.manHours.trades).map(([trade, data]: [string, any]) => (
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

                {/* Materials Used */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Materials Used
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Steel</h4>
                            <p className="text-2xl font-bold text-blue-900">{task.materials.steel.quantity}</p>
                            <p className="text-sm text-gray-600">{task.materials.steel.unit}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Paint</h4>
                            <p className="text-2xl font-bold text-blue-900">{task.materials.paint.quantity}</p>
                            <p className="text-sm text-gray-600">{task.materials.paint.unit}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Welding Rods</h4>
                            <p className="text-2xl font-bold text-blue-900">{task.materials.weldingRods.quantity}</p>
                            <p className="text-sm text-gray-600">{task.materials.weldingRods.unit}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">Bolts & Fasteners</h4>
                            <p className="text-2xl font-bold text-blue-900">{task.materials.bolts.quantity}</p>
                            <p className="text-sm text-gray-600">{task.materials.bolts.unit}</p>
                        </div>
                    </div>
                </div>

                {/* Equipment Used */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Equipment Used
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(task.equipment).map(([equipment, data]: [string, any]) => (
                            <div key={equipment} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 capitalize mb-2">
                                    {equipment.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">Hours: <span className="font-semibold text-gray-800">{data.hours} hrs</span></p>
                                    <p className="text-sm text-gray-600">Quantity: <span className="font-semibold text-gray-800">{data.quantity} units</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photo Documentation */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-900 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Photo Documentation
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-6 text-center">
                            <svg className="w-12 h-12 mx-auto text-blue-900 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-gray-600 mb-1">Before Task Photos</p>
                            <p className="text-3xl font-bold text-blue-900">{task.photoDocumentation.beforePhotos}</p>
                            <p className="text-xs text-gray-500 mt-1">photos uploaded</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 text-center">
                            <svg className="w-12 h-12 mx-auto text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-gray-600 mb-1">After Task Photos</p>
                            <p className="text-3xl font-bold text-green-600">{task.photoDocumentation.afterPhotos}</p>
                            <p className="text-xs text-gray-500 mt-1">photos uploaded</p>
                        </div>
                    </div>
                </div>

                {/* Issues */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 mb-6">
                    <h2 className="text-xl font-bold text-yellow-700 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Issue Reporting
                    </h2>
                    <div className={`border-l-4 p-4 rounded ${
                        task.issues.severity === 'Critical' 
                            ? 'border-red-500 bg-red-50'
                            : task.issues.severity === 'Minor'
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-green-500 bg-green-50'
                    }`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                task.issues.severity === 'Critical'
                                    ? 'bg-red-200 text-red-800'
                                    : task.issues.severity === 'Minor'
                                    ? 'bg-yellow-200 text-yellow-800'
                                    : 'bg-green-200 text-green-800'
                            }`}>
                                {task.issues.severity}
                            </span>
                            <span className="text-sm font-medium text-gray-700">{task.issues.category}</span>
                        </div>
                        <p className="text-sm text-gray-700">{task.issues.description}</p>
                    </div>
                </div>

            </main>

            <footer className="mt-12 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
                Dockyard Sri Lanka | Task Details | Version 1.0
            </footer>
        </div>
    );
}
