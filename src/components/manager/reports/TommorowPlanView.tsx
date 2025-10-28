// src/components/manager/reports/TomorrowPlanView.tsx
'use client';

import { useState } from 'react';
import { TomorrowPlan } from '@/types/report.types';

interface Props {
  plan: TomorrowPlan;
  updateField: (section: string, field: string, value: any, index?: number) => void;
  onApprovePlan: () => void;
  onRequestChanges: () => void;
}

export default function TomorrowPlanView({ plan, updateField, onApprovePlan, onRequestChanges }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [changeReason, setChangeReason] = useState('');
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [tasks, setTasks] = useState(plan.plannedWork);

  const handleAddTask = () => {
    const newTask = {
      description: '',
      location: '',
      estimatedDuration: ''
    };
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleTaskUpdate = (index: number, field: string, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  const handleApprovePlan = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onApprovePlan();
    setIsProcessing(false);
  };

  const handleRequestChanges = async () => {
    if (!changeReason.trim()) {
      alert('Please provide a reason for requesting changes');
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRequestChanges();
    setIsProcessing(false);
    setShowChangeModal(false);
    setChangeReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          📅 Tomorrow's Plan
        </h2>
        <p className="text-sm text-slate-500">Scheduled Date: {plan.date}</p>
      </div>

      {/* Planned Work Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Planned Work Tasks</h3>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-[#0a3b76] hover:bg-blue-800 text-white rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Add Task
          </button>
        </div>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl relative group">
              {/* Remove button - appears on hover */}
              <button
                onClick={() => handleRemoveTask(index)}
                className="absolute top-3 right-3 w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-bold transition-all shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 flex items-center justify-center"
                title="Remove task"
              >
                ×
              </button>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#0a3b76] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <div className="flex-1 space-y-3 pr-8">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Task Description</label>
                    <textarea
                      value={task.description}
                      onChange={(e) => handleTaskUpdate(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all resize-none"
                      placeholder="Enter task description..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">📍 Location</label>
                      <input
                        type="text"
                        value={task.location || ''}
                        onChange={(e) => handleTaskUpdate(index, 'location', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                        placeholder="e.g., Main Deck"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">⏱️ Est. Duration</label>
                      <input
                        type="text"
                        value={task.estimatedDuration || ''}
                        onChange={(e) => handleTaskUpdate(index, 'estimatedDuration', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all"
                        placeholder="e.g., 4 hours"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-3">No tasks planned yet</p>
              <button
                onClick={handleAddTask}
                className="px-6 py-2 bg-[#0a3b76] hover:bg-blue-800 text-white rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md"
              >
                + Add First Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Required Resources Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Required Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Materials */}
          {plan.requiredMaterials && plan.requiredMaterials.length > 0 && (
            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                📦 Materials Needed
              </h4>
              <ul className="space-y-2">
                {plan.requiredMaterials.map((material, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-600 font-bold">•</span>
                    <span className="text-slate-900 font-medium">{material.name}</span>
                    {material.quantity && (
                      <span className="text-slate-600">- {material.quantity}</span>
                    )}
                    {material.urgent && (
                      <span className="ml-auto px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-xs font-bold">
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
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                🔧 Equipment Required
              </h4>
              <ul className="space-y-2">
                {plan.requiredEquipment.map((equipment, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-slate-600 font-bold">•</span>
                    <span className="text-slate-900">{equipment}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Expected Manpower Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Expected Manpower</h3>
        <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-extrabold text-[#0a3b76]">{plan.expectedWorkers}</p>
              <p className="text-sm text-slate-600 font-medium">Total Workers</p>
            </div>
            {plan.manpowerBreakdown && (
              <div className="flex flex-wrap gap-4">
                {Object.entries(plan.manpowerBreakdown).map(([trade, count]) => (
                  <div key={trade} className="text-center bg-white px-4 py-2 rounded-lg border border-slate-200">
                    <p className="text-xl font-bold text-slate-900">{count}</p>
                    <p className="text-xs text-slate-600 font-medium">{trade}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special Notes Section */}
      {plan.specialNotes && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Special Notes</h3>
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
            <textarea
              value={plan.specialNotes}
              onChange={(e) => updateField('tomorrowPlan', 'specialNotes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all resize-none"
            />
          </div>
        </div>
      )}

      {/* Plan Approval Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Plan Review & Approval</h4>
            <p className="text-sm text-slate-600 mt-1">
              Review and approve tomorrow's work plan or request modifications
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleApprovePlan}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-[#0a3b76] hover:bg-blue-800 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin">⏳</span>
                Processing...
              </>
            ) : (
              <>
                ✅ Approve Plan
              </>
            )}
          </button>
          <button 
            onClick={() => setShowChangeModal(true)}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            📝 Request Changes
          </button>
        </div>
      </div>

      {/* Change Request Modal */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Request Changes to Plan</h3>
            <p className="text-sm text-slate-600 mb-4">
              Please specify what changes are needed in tomorrow's plan:
            </p>
            <textarea
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              rows={4}
              placeholder="Describe the required changes..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] transition-all resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowChangeModal(false);
                  setChangeReason('');
                }}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestChanges}
                disabled={isProcessing || !changeReason.trim()}
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}