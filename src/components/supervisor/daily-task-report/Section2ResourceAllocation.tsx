import React, { ChangeEvent } from 'react';
import { ReportData } from './types';
import { Users } from './Icons';

interface Section2Props {
    report: ReportData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function Section2ResourceAllocation({ report, handleChange }: Section2Props) {
    const trades = [
        { key: 'welders', label: 'Welders' },
        { key: 'fitters', label: 'Fitters' },
        { key: 'painters', label: 'Painters' },
        { key: 'riggers', label: 'Riggers' },
    ];

    const renderTradeRows = trades.map((trade) => (
        <div key={trade.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="font-medium text-gray-800 flex items-center">
                {trade.label}
            </div>
            <div>
                <label htmlFor={`${trade.key}-hours`} className="block md:hidden text-xs text-gray-600 mb-1">Hours</label>
                <input
                    type="number"
                    id={`${trade.key}-hours`}
                    name={`trades.${trade.key}.hours`}
                    min="0"
                    value={report.trades[trade.key as keyof typeof report.trades].hours}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 shadow-sm focus:outline-none focus:border-2"
                    placeholder="e.g., 8"
                />
            </div>
            <div>
                <label htmlFor={`${trade.key}-count`} className="block md:hidden text-xs text-gray-600 mb-1">Count</label>
                <input
                    type="number"
                    id={`${trade.key}-count`}
                    name={`trades.${trade.key}.count`}
                    min="0"
                    value={report.trades[trade.key as keyof typeof report.trades].count}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 shadow-sm focus:outline-none focus:border-2"
                    placeholder="e.g., 2"
                />
            </div>
        </div>
    ));

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-[#104E8B]" />
                <span>2. Resource Allocation & Man-Hours</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Total Estimated Man-Hours */}
                <div>
                    <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700 mb-1">Total Estimated Man-Hours</label>
                    <input 
                        type="number" 
                        id="estimatedHours" 
                        name="estimatedHours" 
                        required 
                        min="0" 
                        value={report.estimatedHours} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-blue-900 focus:border-blue-900 transition duration-150 shadow-sm placeholder:text-gray-400 focus:border-2" 
                        placeholder="e.g., 48 " 
                    />
                </div>
                {/* Total Personnel Assigned */}
                <div>
                    <label htmlFor="personnelCount" className="block text-sm font-medium text-gray-700 mb-1">Total Personnel Assigned</label>
                    <input 
                        type="number" 
                        id="personnelCount" 
                        name="personnelCount" 
                        required 
                        min="0" 
                        value={report.personnelCount} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900 transition duration-150 shadow-sm placeholder:text-gray-400 focus:border-2" 
                        placeholder="e.g., 6" 
                    />
                </div>
            </div>

            {/* Detailed Resource Table */}
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Allocated Trades (Daily)</h3>
            <p className="text-sm text-gray-600 mb-4">Specify the hours and headcount for key trades contributing to the task.</p>
            
            <div className="space-y-4">
                {/* Column Headers for Desktop View */}
                <div className="hidden md:grid grid-cols-3 gap-4 font-bold text-xs uppercase text-gray-500 pb-1 border-b">
                    <span className="col-span-1">Trade/Resource</span>
                    <span className="col-span-1">Hours Allocated</span>
                    <span className="col-span-1">Personnel Count</span>
                </div>

                {/* Rendered Trade Rows */}
                {renderTradeRows}
            </div>
        </div>
    );
}
