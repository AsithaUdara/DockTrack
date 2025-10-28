import React, { ChangeEvent } from 'react';
import { ReportData } from './types';
import { Package } from './Icons';

interface Section3Props {
    report: ReportData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function Section3MaterialsUsed({ report, handleChange }: Section3Props) {
    const materials = [
        { key: 'steel', label: 'Steel' },
        { key: 'paint', label: 'Paint' },
        { key: 'welding', label: 'Welding Rods' },
        { key: 'bolts', label: 'Bolts & Fasteners' },
    ];

    const renderMaterialRows = materials.map((material) => (
        <div key={material.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="font-medium text-gray-800 flex items-center">
                {material.label}
            </div>
            <div>
                <label htmlFor={`${material.key}-quantity`} className="block md:hidden text-xs text-gray-600 mb-1">Quantity</label>
                <input
                    type="number"
                    id={`${material.key}-quantity`}
                    name={`materials.${material.key}.quantity`}
                    min="0"
                    value={report.materials[material.key as keyof typeof report.materials].quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 shadow-sm focus:outline-none focus:border-2"
                    placeholder="e.g., 50"
                />
            </div>
            <div>
                <label htmlFor={`${material.key}-unit`} className="block md:hidden text-xs text-gray-600 mb-1">Unit</label>
                <select
                    id={`${material.key}-unit`}
                    name={`materials.${material.key}.unit`}
                    value={report.materials[material.key as keyof typeof report.materials].unit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 shadow-sm focus:outline-none focus:border-2 text-gray-700"
                >
                    <option value="tons">Tons</option>
                    <option value="kg">Kilograms</option>
                    <option value="liters">Liters</option>
                    <option value="gallons">Gallons</option>
                    <option value="rods">Rods</option>
                    <option value="pcs">Pieces</option>
                    <option value="boxes">Boxes</option>
                </select>
            </div>
        </div>
    ));

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center space-x-2">
                <Package className="w-6 h-6 text-[#104E8B]" />
                <span>3. Materials Used</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Specify the quantity and unit of materials consumed for this task.</p>
            
            <div className="space-y-4">
                {/* Column Headers for Desktop View */}
                <div className="hidden md:grid grid-cols-3 gap-4 font-bold text-xs uppercase text-gray-500 pb-1 border-b">
                    <span className="col-span-1">Material Type</span>
                    <span className="col-span-1">Quantity</span>
                    <span className="col-span-1">Unit</span>
                </div>

                {/* Rendered Material Rows */}
                {renderMaterialRows}
            </div>
        </div>
    );
}
