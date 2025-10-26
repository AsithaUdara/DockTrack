// src/components/manager/reports/TomorrowPlanView.tsx
'use client';

import { TomorrowPlan } from '@/types/report.types';

interface Props {
  plan: TomorrowPlan;
}

export default function TomorrowPlanView({ plan }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        📅 Tomorrow's Plan ({plan.date})
      </h2>

      <div className="space-y-6">
        {/* Planned Work */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Planned Work Tasks</h3>
          <ol className="space-y-3">
            {plan.plannedWork.map((task, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{task.description}</p>
                  {task.location && (
                    <p className="text-sm text-gray-600 mt-1">📍 {task.location}</p>
                  )}
                  {task.estimatedDuration && (
                    <p className="text-sm text-gray-600 mt-1">⏱️ Est. {task.estimatedDuration}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Required Resources */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Required Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Materials */}
            {plan.requiredMaterials && plan.requiredMaterials.length > 0 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  📦 Materials Needed
                </h4>
                <ul className="space-y-2">
                  {plan.requiredMaterials.map((material, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-yellow-600">•</span>
                      <span className="text-gray-900">{material.name}</span>
                      {material.quantity && (
                        <span className="text-gray-600">- {material.quantity}</span>
                      )}
                      {material.urgent && (
                        <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                          URGENT
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Equipment */}
            {plan.requiredEquipment && plan.requiredEquipment.length > 0 && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  🔧 Equipment Required
                </h4>
                <ul className="space-y-2">
                  {plan.requiredEquipment.map((equipment, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-900">{equipment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Expected Manpower */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Expected Manpower</h3>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-700">{plan.expectedWorkers}</p>
                <p className="text-sm text-gray-600">Total Workers</p>
              </div>
              {plan.manpowerBreakdown && (
                <div className="flex gap-4">
                  {Object.entries(plan.manpowerBreakdown).map(([trade, count]) => (
                    <div key={trade} className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{count}</p>
                      <p className="text-xs text-gray-600">{trade}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Special Notes */}
        {plan.specialNotes && (
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Special Notes</h3>
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
              <p className="text-gray-900">{plan.specialNotes}</p>
            </div>
          </section>
        )}

        {/* Manager Approval Section */}
        <section className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Plan Review</h4>
              <p className="text-sm text-gray-600 mt-1">
                Approve or request modifications to tomorrow's plan
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                ✅ Approve Plan
              </button>
              <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                📝 Request Changes
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}