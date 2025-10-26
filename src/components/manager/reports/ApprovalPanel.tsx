'use client';

import { useState } from 'react';

interface Props {
  reportId: string;
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalPanel({ reportId, onApprove, onReject }: Props) {
  const [decision, setDecision] = useState<'approve' | 'revision' | 'reject' | null>(null);
  const [reason, setReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checklist, setChecklist] = useState({
    photoQuality: false,
    dataCompleteness: false,
    safetyCompliance: false,
    progressRealistic: false,
    issuesAddressed: false
  });

  const handleSubmit = async () => {
    if (!decision) return;

    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (decision === 'approve') {
      onApprove();
    } else {
      onReject();
    }

    setIsProcessing(false);
  };

  const allChecksPassed = Object.values(checklist).every(v => v);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        ✅ Report Approval Decision
      </h2>

      {/* Review Checklist */}
      <div className="mb-6 p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">Review Checklist</h3>
        <div className="space-y-2">
          {Object.entries({
            photoQuality: 'Photo quality and documentation adequate',
            dataCompleteness: 'All required data fields completed',
            safetyCompliance: 'Safety protocols followed',
            progressRealistic: 'Progress claims realistic and verified',
            issuesAddressed: 'Issues properly documented and addressed'
          }).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={checklist[key as keyof typeof checklist]}
                onChange={(e) => setChecklist({ ...checklist, [key]: e.target.checked })}
                className="w-5 h-5 text-[#0a3b76] border-slate-300 rounded focus:ring-[#0a3b76] focus:ring-2"
              />
              <span className="text-slate-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-3">Your Decision</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => setDecision('approve')}
            className={`p-4 border-2 rounded-xl font-semibold transition-all ${
              decision === 'approve'
                ? 'border-[#0a3b76] bg-blue-50 text-[#0a3b76] shadow-md'
                : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-[#0a3b76] hover:shadow-sm'
            }`}
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="font-bold">Approve Report</div>
            <div className="text-xs mt-1 opacity-75">Publish to client</div>
          </button>

          <button
            onClick={() => setDecision('revision')}
            className={`p-4 border-2 rounded-xl font-semibold transition-all ${
              decision === 'revision'
                ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-md'
                : 'border-slate-300 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 hover:shadow-sm'
            }`}
          >
            <div className="text-3xl mb-2">📝</div>
            <div className="font-bold">Request Revision</div>
            <div className="text-xs mt-1 opacity-75">Send back for edits</div>
          </button>

          <button
            onClick={() => setDecision('reject')}
            className={`p-4 border-2 rounded-xl font-semibold transition-all ${
              decision === 'reject'
                ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-md'
                : 'border-slate-300 bg-white text-slate-700 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 hover:shadow-sm'
            }`}
          >
            <div className="text-3xl mb-2">❌</div>
            <div className="font-bold">Reject Report</div>
            <div className="text-xs mt-1 opacity-75">Major issues found</div>
          </button>
        </div>
      </div>

      {/* Conditional Reason Input */}
      {decision && decision !== 'approve' && (
        <div className="mb-6 p-4 sm:p-5 bg-amber-50 border-2 border-amber-300 rounded-xl">
          <label className="block text-sm font-semibold text-amber-900 mb-2">
            {decision === 'revision' ? 'What needs to be revised?' : 'Reason for rejection (required)'}
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] text-slate-900 bg-white"
            placeholder={
              decision === 'revision'
                ? 'Specify what changes are needed...'
                : 'Explain why this report is being rejected...'
            }
          />
        </div>
      )}

      {/* Approval Actions Summary */}
      {decision === 'approve' && (
        <div className="mb-6 p-4 sm:p-5 bg-blue-50 border-2 border-blue-300 rounded-xl">
          <h4 className="font-semibold text-[#0a3b76] mb-3">Actions after approval:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <span className="text-[#0a3b76] font-bold">✓</span>
              Report published to client portal
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0a3b76] font-bold">✓</span>
              Email notification sent to client
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0a3b76] font-bold">✓</span>
              Project dashboard updated
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0a3b76] font-bold">✓</span>
              Timeline chart refreshed
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0a3b76] font-bold">✓</span>
              Supervisor notified
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#0a3b76] font-bold">✓</span>
              Report archived
            </li>
          </ul>
        </div>
      )}

      {/* Optional Manager Notes */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Optional Manager Notes
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0a3b76] focus:border-[#0a3b76] text-slate-900 bg-white"
          placeholder="Add any additional comments or instructions..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          {decision === 'approve' && !allChecksPassed
            ? '⚠️ Complete all checklist items before approving for best practice.'
            : decision
            ? '⚠️ This action will notify the supervisor.'
            : 'Select a decision above to continue.'}
        </p>
        
        <button
          onClick={handleSubmit}
          disabled={
            !decision ||
            (decision !== 'approve' && !reason.trim()) ||
            isProcessing
          }
          className={`px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap ${
            decision === 'approve'
              ? 'bg-[#0a3b76] hover:bg-blue-800 text-white shadow-sm hover:shadow-md'
              : decision === 'revision'
              ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow-md'
              : decision === 'reject'
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-md'
              : 'bg-slate-600 hover:bg-slate-700 text-white shadow-sm hover:shadow-md'
          }`}
        >
          {isProcessing ? (
            <>
              <span className="animate-spin">⏳</span>
              Processing...
            </>
          ) : (
            <>
              {decision === 'approve' && '✅ Approve & Publish'}
              {decision === 'revision' && '📝 Request Revision'}
              {decision === 'reject' && '❌ Reject Report'}
              {!decision && 'Select Decision'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}