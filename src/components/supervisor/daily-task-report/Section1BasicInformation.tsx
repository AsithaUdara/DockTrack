import React, { ChangeEvent } from 'react';
import { ReportData } from './types';
import { ClipboardList } from './Icons';

interface Section1Props {
    report: ReportData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const accentBorder = 'focus:border-blue-900 focus:ring-blue-900 focus:border-2';
const primaryText = 'text-[#104E8B]';

export default function Section1BasicInformation({ report, handleChange }: Section1Props) {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-[#104E8B]">
            <h2 className={`text-xl font-bold ${primaryText} mb-6 flex items-center space-x-2`}>
                <ClipboardList className="w-6 h-6" />
                <span>1. Task & Location Details</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Task ID */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Task ID</span>
                    <input
                        type="text" id="taskId" name="taskId" required
                        value={report.taskId} onChange={handleChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400 focus:outline-none `}
                        placeholder="e.g., TSK-2025-001"
                    />
                </label>

                {/* Task Name */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Task</span>
                    <input
                        type="text" id="task" name="task" required
                        value={report.task} onChange={handleChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400 focus:outline-none `}
                        placeholder="e.g., Hull cleaning and inspection"
                    />
                </label>

                {/* Assigned By */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Assigned by</span>
                    <input
                        type="text" id="assignedBy" name="assignedBy" required
                        value={report.assignedBy} onChange={handleChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400 focus:outline-none`}
                        placeholder="e.g., Mr. Silva (Operations Manager)"
                    />
                </label>

                {/* Date */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Date</span>
                    <input
                        type="date" id="date" name="date" required
                        value={report.date} onChange={handleChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-black focus:outline-none`}
                        placeholder="Select date"
                    />
                </label>

                {/* Vessel */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Vessel</span>
                    <input
                        type="text" id="vessel" name="vessel" required
                        value={report.vessel} onChange={handleChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400 focus:outline-none`}
                        placeholder="e.g., MV 'Sea Serpent'"
                    />
                </label>

                {/* Dock Location */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Dock location</span>
                    <input
                        type="text" id="dockLocation" name="dockLocation" required
                        value={report.dockLocation} onChange={handleChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400 focus:outline-none`}
                        placeholder="e.g., Dry Dock 3, West Side"
                    />
                </label>

                {/* Task Status (Dropdown Selection) */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Task Status</span>
                    <select
                        id="taskStatus" name="taskStatus" required
                        value={report.taskStatus} onChange={handleChange}
                        className={`w-full px-4  py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm text-gray-400 focus:outline-none`}
                    >
                        <option value="" disabled className="text-gray-400">Select current status</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>

                {/* Weather Condition (Dropdown Selection) */}
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Weather Condition</span>
                    <select
                        id="weatherCondition" name="weatherCondition" required
                        value={report.weatherCondition} onChange={handleChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm text-gray-400 focus:outline-none`}
                    >
                        <option value="" disabled className="text-gray-400">Select weather condition</option>
                        <option value="sunny">Sunny</option>
                        <option value="cloudy">Cloudy</option>
                        <option value="rainy">Rainy</option>
                        <option value="stormy">Stormy</option>
                        <option value="windy">Windy</option>
                        <option value="foggy">Foggy</option>
                    </select>
                </label>

            </div>
        </div>
    );
}
