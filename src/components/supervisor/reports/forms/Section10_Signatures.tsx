// src/components/supervisor/reports/forms/Section10_Signatures.tsx
'use client';
import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useRouter } from 'next/navigation';
import {
  DailyTask,
  DailyIssue,
  MaterialUsed,
  EquipmentUsed,
  SafetyObservation,
  QualityControl,
  ProgressSummary,
  TomorrowPlan,
  Signature,
} from '@/data/mock-daily-activity';

interface Section10Props {
  tasks: (DailyTask & { images?: string[] })[];
  issues: DailyIssue[];
  materials: MaterialUsed[];
  equipment: EquipmentUsed[];
  safety: SafetyObservation;
  quality: QualityControl;
  summary: ProgressSummary;
  tomorrowPlans: TomorrowPlan[];
  onSubmit: (signature: Signature) => void;
}

export default function Section10_Signatures({
  tasks,
  issues,
  materials,
  equipment,
  safety,
  quality,
  summary,
  tomorrowPlans,
  onSubmit,
}: Section10Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const router = useRouter();

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = () => {
    const signatureData = sigCanvas.current?.toDataURL() || '';
    onSubmit({ signatureData });
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 10: Signatures</h2>

      {/* Overview of All Sections */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold text-gray-800">Report Overview</h3>

        {/* Section 1: Work Completed */}
        <div>
          <h4 className="font-medium text-gray-800">Work Completed</h4>
          <div className="mt-2 space-y-2">
            {tasks.length === 0 ? (
              <p className="text-gray-600 text-sm">No tasks added.</p>
            ) : (
              tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img
                    src={task.images?.[0] || 'https://via.placeholder.com/24x24?text=Task'}
                    alt={`${task.type} Icon`}
                    className="w-6 h-6"
                  />
                  <p className="text-gray-600">
                    {task.type} ({task.photoCount} photos)
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section 3: Materials Used */}
        <div>
          <h4 className="font-medium text-gray-800">Materials Used</h4>
          <div className="mt-2 space-y-2">
            {materials.length === 0 ? (
              <p className="text-gray-600 text-sm">No materials added.</p>
            ) : (
              materials.map((material, index) => (
                <p key={index} className="text-gray-600">
                  {material.name}: {material.quantity}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Section 4: Equipment Used */}
        <div>
          <h4 className="font-medium text-gray-800">Equipment Used</h4>
          <div className="mt-2 space-y-2">
            {equipment.length === 0 ? (
              <p className="text-gray-600 text-sm">No equipment added.</p>
            ) : (
              equipment.map((equip, index) => (
                <p key={index} className="text-gray-600">
                  {equip.name}: {equip.hours} hours, Status: {equip.status}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Section 5: Safety Observations */}
        <div>
          <h4 className="font-medium text-gray-800">Safety Observations</h4>
          <div className="mt-2 text-gray-600">
            <p>Safety Briefing: {safety.briefing ? 'Yes' : 'No'}</p>
            {safety.briefing && (
              <>
                <p>Time: {safety.briefingTime}</p>
                <p>Attendees: {safety.attendees}</p>
              </>
            )}
            <p>PPE Compliance: {safety.ppeCompliance}</p>
            <p>Incidents: {safety.incidents ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Section 6: Quality Control */}
        <div>
          <h4 className="font-medium text-gray-800">Quality Control</h4>
          <p className="text-gray-600">{quality.notes || 'No notes provided.'}</p>
        </div>

        {/* Section 7: Issues & Delays */}
        <div>
          <h4 className="font-medium text-gray-800">Issues & Delays</h4>
          <div className="mt-2 space-y-2">
            {issues.length === 0 ? (
              <p className="text-gray-600 text-sm">No issues reported.</p>
            ) : (
              issues.map((issue, index) => (
                <div key={index} className="text-gray-600">
                  <p>
                    {issue.title} (Priority: {issue.priority})
                  </p>
                  <p>{issue.description}</p>
                  {issue.impactLevel && <p>Impact: {issue.impactLevel}</p>}
                  {issue.timeLost && <p>Time Lost: {issue.timeLost} hours</p>}
                  {issue.actionTaken && <p>Action Taken: {issue.actionTaken}</p>}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section 8: Progress Summary */}
        <div>
          <h4 className="font-medium text-gray-800">Progress Summary</h4>
          <p className="text-gray-600">{summary.summary || 'No summary provided.'}</p>
        </div>

        {/* Section 9: Tomorrow's Plan */}
        <div>
          <h4 className="font-medium text-gray-800">Tomorrow's Plan</h4>
          <div className="mt-2 space-y-2">
            {tomorrowPlans.length === 0 ? (
              <p className="text-gray-600 text-sm">No tasks planned.</p>
            ) : (
              tomorrowPlans.map((plan, index) => (
                <p key={index} className="text-gray-600">{plan.task}</p>
              ))
            )}
          </div>
        </div>
      </div>

      {/* E-Signature */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">E-Signature</h3>
        <div className="border border-gray-300 rounded-md">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className: 'w-full h-32 bg-gray-50',
            }}
          />
        </div>
        <button
          onClick={clearSignature}
          className="mt-2 text-red-600 hover:text-red-800 text-sm"
        >
          Clear Signature
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900"
        >
          Submit Report
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Report Submitted Successfully!
            </h3>
            <p className="text-gray-600">Redirecting to home page...</p>
          </div>
        </div>
      )}
    </div>
  );
}