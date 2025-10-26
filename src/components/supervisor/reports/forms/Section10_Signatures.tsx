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
import { 
  CheckCircle2, 
  Package, 
  Wrench, 
  Shield, 
  ClipboardCheck, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Camera,
  Clock,
  Users,
  FileCheck
} from 'lucide-react';

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
    router.push('/reports/status'); // Updated redirect to status page
  }, 2000);
};

  return (
    
      <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 10: Signatures</h2>

      {/* Overview of All Sections */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold text-gray-800">Report Overview</h3>

      
      </div>

      {/* Report Overview */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
        

        <div className="p-6 space-y-6">
          {/* Section 1: Work Completed */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Work Completed</h4>
                <p className="text-sm text-gray-600">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} completed</p>
              </div>
            </div>
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No tasks added.</p>
              ) : (
                tasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                    <img
                      src={task.images?.[0] || 'https://via.placeholder.com/40x40?text=Task'}
                      alt={`${task.type} Icon`}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{task.type}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Camera className="w-3 h-3" />
                        <span>{task.photoCount} photos</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 3: Materials Used */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Materials Used</h4>
                <p className="text-sm text-gray-600">{materials.length} {materials.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <div className="space-y-2">
              {materials.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No materials added.</p>
              ) : (
                materials.map((material, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{material.name}</span>
                      <span className="text-blue-600 font-bold">{material.quantity}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 4: Equipment Used */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Equipment Used</h4>
                <p className="text-sm text-gray-600">{equipment.length} {equipment.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <div className="space-y-2">
              {equipment.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No equipment added.</p>
              ) : (
                equipment.map((equip, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{equip.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {equip.hours} hours
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            equip.status === 'Working' ? 'bg-green-100 text-green-700' : 
                            equip.status === 'Needs Service' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {equip.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 5: Safety Observations */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Safety Observations</h4>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Safety Briefing:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  safety.briefing ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {safety.briefing ? 'Yes' : 'No'}
                </span>
              </div>
              {safety.briefing && (
                <>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-gray-800">{safety.briefingTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Attendees:
                    </span>
                    <span className="font-semibold text-gray-800">{safety.attendees}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">PPE Compliance:</span>
                <span className="font-semibold text-gray-800">{safety.ppeCompliance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Incidents:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  safety.incidents ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {safety.incidents ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 6: Quality Control */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border-2 border-teal-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Quality Control</h4>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-700">{quality.notes || 'No notes provided.'}</p>
            </div>
          </div>

          {/* Section 7: Issues & Delays */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 border-2 border-red-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Issues & Delays</h4>
                <p className="text-sm text-gray-600">{issues.length} {issues.length === 1 ? 'issue' : 'issues'} reported</p>
              </div>
            </div>
            <div className="space-y-3">
              {issues.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No issues reported.</p>
              ) : (
                issues.map((issue, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-gray-800">{issue.title}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        issue.priority === 'High' ? 'bg-red-100 text-red-700' :
                        issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {issue.priority}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{issue.description}</p>
                    {issue.impactLevel && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Impact:</span> {issue.impactLevel}
                      </p>
                    )}
                    {issue.timeLost && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Time Lost:</span> {issue.timeLost} hours
                      </p>
                    )}
                    {issue.actionTaken && (
                      <div className="bg-blue-50 rounded-lg p-2 mt-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Action Taken:</span> {issue.actionTaken}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 8: Progress Summary */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border-2 border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Progress Summary</h4>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-700">{summary.summary || 'No summary provided.'}</p>
            </div>
          </div>

          {/* Section 9: Tomorrow's Plan */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-5 border-2 border-violet-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Tomorrow's Plan</h4>
                <p className="text-sm text-gray-600">{tomorrowPlans.length} {tomorrowPlans.length === 1 ? 'task' : 'tasks'} planned</p>
              </div>
            </div>
            <div className="space-y-2">
              {tomorrowPlans.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No tasks planned.</p>
              ) : (
                tomorrowPlans.map((plan, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                    <p className="text-gray-700">{plan.task}</p>
                  </div>
                ))
              )}
            </div>
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