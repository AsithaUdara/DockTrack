// src/app/(supervisor)/reports/new/page.tsx
'use client';
import { useState } from 'react';
import Section1_WorkCompleted from '@/components/supervisor/reports/forms/Section1_WorkCompleted';
import Section2_Manpower from '@/components/supervisor/reports/forms/Section2_Manpower';
// Import other sections here as they are created

export default function NewReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10; // Total number of sections in the report

  const sections = [
    { number: 1, title: "Work Completed" },
    { number: 2, title: "Manpower" },
    { number: 3, title: "Materials Used" },
    { number: 4, title: "Equipment Used" },
    { number: 5, title: "Safety Observations" },
    { number: 6, title: "Quality Control" },
    { number: 7, title: "Issues & Delays" },
    { number: 8, title: "Progress Summary" },
    { number: 9, title: "Next Day Planning" },
    { number: 10, title: "Signatures" },
  ];

  const goToNextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const goToPrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return <Section1_WorkCompleted />;
      case 2:
        return <Section2_Manpower />;
      // Add cases for other sections here
      default:
        return <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Section {currentStep}: {sections[currentStep-1]?.title}</h3>
          <p className="text-gray-600">This section is coming soon...</p>
        </div>;
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
      {/* Header and Stepper */}
      <div className="border-b border-gray-200 pb-5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">New Daily Report</h1>
        <p className="text-gray-600 mt-1">Project: MV Sea Princess | Date: October 22, 2025</p>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">
            Step {currentStep}: <span className="font-semibold text-gray-800">{sections[currentStep-1]?.title || ''}</span>
          </p>
          <div className="mt-1 bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Render the current section's component */}
      {renderSection()}

      {/* Page Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center mt-8 pt-6 border-t border-gray-200 gap-4">
        <div>
          {currentStep > 1 && (
            <button onClick={goToPrevStep} className="w-full sm:w-auto px-5 py-2 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50">
              ← Previous Section
            </button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
          <button className="w-full sm:w-auto px-5 py-2 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50">Save as Draft</button>
          {currentStep < totalSteps ? (
            <button onClick={goToNextStep} className="w-full sm:w-auto px-5 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900">
              Next Section: {sections[currentStep]?.title || '...'} →
            </button>
          ) : (
            <button className="w-full sm:w-auto px-5 py-2 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900">
              Submit Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}