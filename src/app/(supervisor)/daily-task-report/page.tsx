"use client";

import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
import { ReportData, initialReportData } from '@/components/supervisor/daily-task-report/types';
import { customStyles } from '@/components/supervisor/daily-task-report/customStyles';
import { Send, CheckCircle, UserCheck } from '@/components/supervisor/daily-task-report/Icons';
import Section1BasicInformation from '@/components/supervisor/daily-task-report/Section1BasicInformation';
import Section2ResourceAllocation from '@/components/supervisor/daily-task-report/Section2ResourceAllocation';
import Section3MaterialsUsed from '@/components/supervisor/daily-task-report/Section3MaterialsUsed';
import Section4EquipmentUsed from '@/components/supervisor/daily-task-report/Section4EquipmentUsed';
import Section5PhotoDocumentation from '@/components/supervisor/daily-task-report/Section5PhotoDocumentation';
import Section6IssueReporting from '@/components/supervisor/daily-task-report/Section6IssueReporting';

export default function DailyTaskReport() {
    const [report, setReport] = useState<ReportData>(initialReportData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Dynamic state update for text inputs and selections
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // Handle nested properties (e.g., trades.welders.hours, materials.steel.quantity)
        if (name.includes('.')) {
            const parts = name.split('.');
            
            // Handle trades
            if (parts[0] === 'trades' && parts.length === 3) {
                const tradeKey = parts[1] as keyof ReportData['trades'];
                const field = parts[2] as 'hours' | 'count';
                setReport(prev => ({
                    ...prev,
                    trades: {
                        ...prev.trades,
                        [tradeKey]: {
                            ...prev.trades[tradeKey],
                            [field]: value === '' ? '' : Number(value)
                        }
                    }
                }));
                return;
            }
            
            // Handle materials
            if (parts[0] === 'materials' && parts.length === 3) {
                const materialKey = parts[1] as keyof ReportData['materials'];
                const field = parts[2] as 'quantity' | 'unit';
                setReport(prev => ({
                    ...prev,
                    materials: {
                        ...prev.materials,
                        [materialKey]: {
                            ...prev.materials[materialKey],
                            [field]: field === 'quantity' 
                                ? (value === '' ? '' : Number(value)) 
                                : value
                        }
                    }
                }));
                return;
            }
            
            // Handle equipment
            if (parts[0] === 'equipment' && parts.length === 3) {
                const equipmentKey = parts[1] as keyof ReportData['equipment'];
                const field = parts[2] as 'hours' | 'quantity';
                setReport(prev => ({
                    ...prev,
                    equipment: {
                        ...prev.equipment,
                        [equipmentKey]: {
                            ...prev.equipment[equipmentKey],
                            [field]: value === '' ? '' : Number(value)
                        }
                    }
                }));
                return;
            }
        }
        
        // Handle regular fields
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

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            {/* Custom styles for number input placeholders */}
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />
            
            {/* SUCCESS MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center animate-fade-in">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm text-center animate-scale-up">
                        <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted!</h3>
                        <p className="text-gray-600">Your daily task report has been successfully recorded.</p>
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
                {/* Page Indicator */}
                <div className="mb-6 flex justify-center items-center space-x-2">
                    <div className="flex space-x-2">
                        {[1, 2, 3].map((page) => (
                            <div
                                key={page}
                                className={`w-3 h-3 rounded-full ${
                                    currentPage === page ? 'bg-blue-900' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* PAGE 1: Sections 1 & 2 */}
                    {currentPage === 1 && (
                        <>
                            <Section1BasicInformation report={report} handleChange={handleChange} />
                            <Section2ResourceAllocation report={report} handleChange={handleChange} />
                        </>
                    )}

                    {/* PAGE 2: Sections 3 & 4 */}
                    {currentPage === 2 && (
                        <>
                            <Section3MaterialsUsed report={report} handleChange={handleChange} />
                            <Section4EquipmentUsed report={report} handleChange={handleChange} />
                        </>
                    )}

                    {/* PAGE 3: Sections 5 & 6 */}
                    {currentPage === 3 && (
                        <>
                            <Section5PhotoDocumentation report={report} handleFileSelect={handleFileSelect} />
                            <Section6IssueReporting report={report} handleChange={handleChange} />
                        </>
                    )}

                    {/* NAVIGATION BUTTONS */}
                    <div className="flex justify-between items-center pt-6">
                        {/* Previous Button - Hidden on first page */}
                        {currentPage > 1 && (
                            <button
                                type="button"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-6 py-2 rounded-lg font-medium transition duration-200 bg-blue-900 text-white hover:bg-blue-800"
                            >
                                ← Previous
                            </button>
                        )}
                        
                        {/* Spacer for first page to push Next button to the right */}
                        {currentPage === 1 && <div></div>}
                        
                        <div className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </div>

                        {/* Next Button - Shown on pages 1 and 2 */}
                        {currentPage < totalPages && (
                            <button
                                type="button"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-6 py-2 rounded-lg font-medium transition duration-200 bg-blue-900 text-white hover:bg-blue-800"
                            >
                                Next →
                            </button>
                        )}

                        {/* Submit Button - Only on last page (page 3) */}
                        {currentPage === totalPages && (
                            <button 
                                type="submit" 
                                className="px-6 py-2 rounded-lg font-medium transition duration-200 bg-blue-900 text-white hover:bg-blue-800 flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Submit Report</span>
                            </button>
                        )}
                    </div>
                </form>
            </main>

            <footer className="mt-12 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
                Dockyard Sri Lanka | Task Report Interface | Version 1.0
            </footer>
        </div>
    );
}
