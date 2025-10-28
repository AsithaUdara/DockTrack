import React, { ChangeEvent } from 'react';
import { ReportData } from './types';
import { Wrench } from './Icons';

interface Section4Props {
    report: ReportData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function Section4EquipmentUsed({ report, handleChange }: Section4Props) {
    const equipmentList = [
        { key: 'crane', label: 'Crane' },
        { key: 'welder', label: 'Welding Machine' },
        { key: 'grinder', label: 'Grinder' },
        { key: 'scaffold', label: 'Scaffolding' },
    ];

    const renderEquipmentRows = equipmentList.map((equipment) => (
        <div key={equipment.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="font-medium text-gray-800 flex items-center">
                {equipment.label}
            </div>
            <div>
                <label htmlFor={`${equipment.key}-hours`} className="block md:hidden text-xs text-gray-600 mb-1">Hours</label>
                <input
                    type="number"
                    id={`${equipment.key}-hours`}
                    name={`equipment.${equipment.key}.hours`}
                    min="0"
                    value={report.equipment[equipment.key as keyof typeof report.equipment].hours}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 shadow-sm focus:outline-none focus:border-2"
                    placeholder="e.g., 8"
                />
            </div>
            <div>
                <label htmlFor={`${equipment.key}-quantity`} className="block md:hidden text-xs text-gray-600 mb-1">Quantity</label>
                <input
                    type="number"
                    id={`${equipment.key}-quantity`}
                    name={`equipment.${equipment.key}.quantity`}
                    min="0"
                    value={report.equipment[equipment.key as keyof typeof report.equipment].quantity}
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
                <Wrench className="w-6 h-6 text-[#104E8B]" />
                <span>4. Equipment Used</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Specify the hours operated and quantity of equipment used for this task.</p>
            
            <div className="space-y-4">
                {/* Column Headers for Desktop View */}
                <div className="hidden md:grid grid-cols-3 gap-4 font-bold text-xs uppercase text-gray-500 pb-1 border-b">
                    <span className="col-span-1">Equipment Type</span>
                    <span className="col-span-1">Hours Operated</span>
                    <span className="col-span-1">Quantity</span>
                </div>

                {/* Rendered Equipment Rows */}
                {renderEquipmentRows}
            </div>
        </div>
    );
}
