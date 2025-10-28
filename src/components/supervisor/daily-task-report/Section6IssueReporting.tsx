import React, { ChangeEvent } from 'react';
import { ReportData } from './types';
import { AlertTriangle } from './Icons';

interface Section6Props {
    report: ReportData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const accentBorder = 'focus:border-blue-900 focus:ring-blue-900 focus:border-2';

export default function Section6IssueReporting({ report, handleChange }: Section6Props) {
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
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-blue-900" />
                <span>6. Issue Reporting</span>
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
                <span className="block text-sm font-medium text-gray-700 mb-1 ">Issue Description / Supervisor Notes</span>
                <textarea
                    id="issueDescription" name="issueDescription" rows={4}
                    value={report.issueDescription} onChange={handleChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${accentBorder} transition duration-150 shadow-sm placeholder:text-gray-400 focus:outline-none `}
                    placeholder="Provide detailed notes on the issue, required actions, or any special observations."
                ></textarea>
            </label>
        </div>
    );
}
