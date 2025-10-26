"use client";

import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';

// --- Icon Components (Simulating Lucide Icons using Inline SVG for Single-File Constraint) ---
const Icon = ({ children, className = 'w-5 h-5' }: { children: React.ReactNode, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {children}
    </svg>
);

const ClipboardList = (props: { className?: string }) => (
    <Icon className={props.className}>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M10 9h6" />
        <path d="M10 13h6" />
        <path d="M10 17h6" />
    </Icon>
);

const Camera = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
    </Icon>
);

const AlertTriangle = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
);

const Send = (props: { className?: string }) => (
    <Icon className={props.className}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </Icon>
);

const CheckCircle = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
);

const UserCheck = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M17 11l4 4-4 4" />
    </Icon>
);

const CloudUpload = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M4 14.8V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4.2" />
        <path d="M16 10L12 6 8 10" />
        <path d="M12 17V6" />
    </Icon>
);

// --- Type Definitions ---

type ReportData = {
    task: string;
    assignedBy: string;
    date: string;
    vessel: string;
    dockLocation: string;
    taskStatus: string;
    issueSeverity: 'none' | 'minor' | 'critical';
    issueCategory: string;
    issueDescription: string;
    photoBeforeCount: number;
    photoAfterCount: number;
};

// --- Initial State ---
const initialReportData: ReportData = {
    task: '',
    assignedBy: '',
    date: '',
    vessel: '',
    dockLocation: '',
    taskStatus: '',
    issueSeverity: 'none',
    issueCategory: 'N/A',
    issueDescription: '',
    photoBeforeCount: 0,
    photoAfterCount: 0,
};

// --- Component ---

export default function DailyTaskReport() {
    const [report, setReport] = useState<ReportData>(initialReportData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dynamic state update for text inputs and selections
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReport(prev => ({ ...prev, [name]: value }));
    }, []);

    // Handle file selection
    const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>, field: 'photoBeforeCount' | 'photoAfterCount') => {
        const files = e.target.files;
        setReport(prev => ({
            ...prev,
            [field]: files ? files.length : 0,
        }));
    }, []);

    // Simulate form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Submitting Report:", report);
        setIsModalOpen(true);
        setTimeout(() => setIsModalOpen(false), 3000);
        // Reset form state after successful submission simulation
        setReport(initialReportData);
    };

    // Custom color variables translated to Tailwind utility classes
    const primaryDark = 'bg-[#104E8B]';
    const primaryText = 'text-[#104E8B]';
    const accent500 = 'bg-[#FBBF24]';
    const accentBorder = 'focus:border-[#FBBF24] focus:ring-[#FBBF24]';

    // Photo Capture Component
    const FileUploadBox = ({ label, id, field }: { label: string, id: string, field: 'photoBeforeCount' | 'photoAfterCount' }) => {
        const fileCount = report[field];
        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer transition duration-150 ${fileCount > 0 ? 'border-green-500' : 'border-gray-300 hover:border-[#104E8B]'}`}>
                    <div className="space-y-1 text-center">
                        {fileCount > 0 ? (
                            <span className="text-green-600 font-medium">{fileCount} photo(s) captured.</span>
                        ) : (
                            <>
                                <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-gray-500">Click to take a photo</p>
                            </>
                        )}
                        <input
                            type="file"
                            id={id}
                            name={id}
                            accept="image/*"
                            className="sr-only"
                            multiple
                            onChange={(e) => handleFileSelect(e, field)}
                        />
                        <label htmlFor={id} className={`relative cursor-pointer text-sm font-medium ${primaryText} hover:opacity-80 transition`}>
                            Take a Photo
                        </label>
                    </div>
                </div>
            </div>
        );
    };

    // Radio Button Component
    const IssueRadio = ({ id, value, color, label }: { id: string, value: ReportData['issueSeverity'], color: string, label: string }) => (
        <div className="flex items-center">
            <input
                id={id}
                name="issueSeverity"
                type="radio"
                value={value}
                checked={report.issueSeverity === value}
                onChange={handleChange}
                className={`h-4 w-4 ${color} border-gray-300 focus:ring-${color.split('-')[1]} rounded-full`}
            />
            <label htmlFor={id} className="ml-3 block text-base font-medium text-gray-700">{label}</label>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            {/* Success Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
                        <div className="flex flex-col items-center">
                            <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Report Submitted!</h3>
                            <p className="text-sm text-gray-600 text-center">Thank you, your daily task report has been successfully logged.</p>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={`mt-4 px-4 py-2 ${primaryDark} text-white text-sm font-medium rounded-lg hover:opacity-90 transition`}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <header className={`${primaryDark} shadow-lg`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-white tracking-wide">
                        Dockyard <span className="text-[#FBBF24]">|</span> Daily Task Report
                    </h1>
                    <div className="flex items-center space-x-2">
                        <UserCheck className="text-white w-5 h-5" />
                        <span className="text-sm font-medium text-white/90 hidden sm:block">Supervisor View</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* SECTION 1: BASIC INFORMATION */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-[#104E8B]">
                        <h2 className={`text-xl font-bold ${primaryText} mb-6 flex items-center space-x-2`}>
                            <ClipboardList className="w-6 h-6" />
                            <span>1. Task & Location Details</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Task Name */}
                            <label className="block">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Task</span>
                                <input
                                    type="text" id="task" name="task" required
                                    value={report.task} onChange={handleChange}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400`}
                                    placeholder="e.g., Hull cleaning and inspection"
                                />
                            </label>

                            {/* Assigned By */}
                            <label className="block">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Assigned by</span>
                                <input
                                    type="text" id="assignedBy" name="assignedBy" required
                                    value={report.assignedBy} onChange={handleChange}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400`}
                                    placeholder="e.g., Mr. Silva (Operations Manager)"
                                />
                            </label>

                            {/* Date */}
                            <label className="block">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Date</span>
                                <input
                                    type="date" id="date" name="date" required
                                    value={report.date} onChange={handleChange}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-black`}
                                    placeholder="Select date"
                                />
                            </label>

                            {/* Vessel */}
                            <label className="block">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Vessel</span>
                                <input
                                    type="text" id="vessel" name="vessel" required
                                    value={report.vessel} onChange={handleChange}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400`}
                                    placeholder="e.g., MV 'Sea Serpent'"
                                />
                            </label>

                            {/* Dock Location */}
                            <label className="block">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Dock location</span>
                                <input
                                    type="text" id="dockLocation" name="dockLocation" required
                                    value={report.dockLocation} onChange={handleChange}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400`}
                                    placeholder="e.g., Dry Dock 3, West Side"
                                />
                            </label>

                            {/* Task Status (Dropdown Selection) */}
                            <label className="block">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Task Status</span>
                                <select
                                    id="taskStatus" name="taskStatus" required
                                    value={report.taskStatus} onChange={handleChange}
                                    className={`w-full px-4  py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm text-gray-400`}
                                >
                                    <option value="" disabled className="text-gray-400">Select current status</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    
                                </select>
                            </label>

                        </div>
                    </div>

                    {/* SECTION 2: TASK PHOTO UPDATING */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-gray-400">
                        <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center space-x-2">
                            <Camera className="w-6 h-6" />
                            <span>2. Photo Documentation</span>
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">Upload high-resolution images showing the workspace *before* and *after* the task.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Before Task Photo */}
                            <FileUploadBox
                                label="Before the Task"
                                id="photo-before"
                                field="photoBeforeCount"
                            />

                            {/* After Task Photo */}
                            <FileUploadBox
                                label="After the Task"
                                id="photo-after"
                                field="photoAfterCount"
                            />
                        </div>
                    </div>

                    {/* SECTION 3: ISSUE REPORTING */}
                    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 ${accent500.replace('bg-', 'border-')}`}>
                        <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center space-x-2">
                            <AlertTriangle className="w-6 h-6 text-blue-900" />
                            <span>3. Issue Reporting</span>
                        </h2>

                        {/* Issue Severity (Radio Buttons) */}
                        <fieldset className="mb-6">
                            <legend className="text-sm font-medium text-gray-700 mb-3">Select Issue Severity</legend>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-8">
                                <IssueRadio id="issue-none" value="none" color="text-green-600" label="No Issue Found" />
                                <IssueRadio id="issue-minor" value="minor" color="text-yellow-600" label="Minor Issue" />
                                <IssueRadio id="issue-critical" value="critical" color="text-red-600" label="Critical Issue" />
                            </div>
                        </fieldset>

                        {/* Issue Category (Dropdown) */}
                        <label className="block mb-6">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Issue Category (if applicable)</span>
                            <select
                                id="issueCategory" name="issueCategory"
                                value={report.issueCategory} onChange={handleChange}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm text-gray-400`}
                            >
                                <option value="N/A" disabled className="text-gray-400">Select category...</option>
                                <option value="mechanical">Mechanical Failure</option>
                                <option value="electrical">Electrical Fault</option>
                                <option value="corrosion">Severe Corrosion/Damage</option>
                                <option value="material">Material Shortage</option>
                                <option value="safety">Safety Hazard</option>
                                <option value="other">Other</option>
                            </select>
                        </label>

                        {/* Description Field */}
                        <label className="block">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Issue Description / Supervisor Notes</span>
                            <textarea
                                id="issueDescription" name="issueDescription" rows={4}
                                value={report.issueDescription} onChange={handleChange}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400`}
                                placeholder="Provide detailed notes on the issue, required actions, or any special observations."
                            ></textarea>
                        </label>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4 flex justify-end">
                        <button type="submit" className={`px-8 py-3 ${primaryDark} text-white text-lg font-semibold rounded-xl shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 transform hover:scale-[1.01] active:scale-[0.99]`}>
                            <Send className="w-5 h-5" />
                            <span>Submit Daily Report</span>
                        </button>
                    </div>
                </form>
            </main>

            <footer className="mt-12 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
                Dockyard Sri Lanka | Task Report Interface | Version 1.0
            </footer>
        </div>
    );
}
