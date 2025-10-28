import React, { ChangeEvent } from 'react';
import { ReportData } from './types';
import { Camera } from './Icons';

interface Section5Props {
    report: ReportData;
    handleFileSelect: (e: ChangeEvent<HTMLInputElement>, field: 'photoBeforeCount' | 'photoAfterCount') => void;
}

const primaryText = 'text-[#104E8B]';

export default function Section5PhotoDocumentation({ report, handleFileSelect }: Section5Props) {
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

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center space-x-2">
                <Camera className="w-6 h-6" />
                <span>5. Photo Documentation</span>
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
    );
}
