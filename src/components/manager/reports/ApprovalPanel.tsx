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
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-300 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        ✅ Report Approval Decision
      </h2>

      {/* Review Checklist */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Review Checklist</h3>
        <div className="space-y-2">
          {Object.entries({
            photoQuality: 'Photo quality and documentation adequate',
            dataCompleteness: 'All required data fields completed',
            safetyCompliance: 'Safety protocols followed',
            progressRealistic: 'Progress claims realistic and verified',
            issuesAddressed: 'Issues properly documented and addressed'
          }).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
              <input
                type="checkbox"
                checked={checklist[key as keyof typeof checklist]}
                onChange={(e) => setChecklist({ ...checklist, [key]: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Your Decision</h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setDecision('approve')}
            disabled={!allChecksPassed}
            className={`p-4 border-2 rounded-lg font-medium transition-all ${
              decision === 'approve'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <div className="text-3xl mb-2">✅</div>
            <div>Approve Report</div>
            <div className="text-xs mt-1 opacity-75">Publish to client</div>
          </button>

          <button
            onClick={() => setDecision('revision')}
            className={`p-4 border-2 rounded-lg font-medium transition-all ${
              decision === 'revision'
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-300 hover:border-yellow-500 hover:bg-yellow-50'
            }`}
          >
            <div className="text-3xl mb-2">📝</div>
            <div>Request Revision</div>
            <div className="text-xs mt-1 opacity-75">Send back for edits</div>
          </button>

          <button
            onClick={() => setDecision('reject')}
            className={`p-4 border-2 rounded-lg font-medium transition-all ${
              decision === 'reject'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
            }`}
          >
            <div className="text-3xl mb-2">❌</div>
            <div>Reject Report</div>
            <div className="text-xs mt-1 opacity-75">Major issues found</div>
          </button>
        </div>
      </div>

      {/* Conditional Reason Input */}
      {decision && decision !== 'approve' && (
        <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {decision === 'revision' ? 'What needs to be revised?' : 'Reason for rejection (required)'}
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3">Actions after approval:</h4>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Report published to client portal
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Email notification sent to client
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Project dashboard updated
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Timeline chart refreshed
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Supervisor notified
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Report archived
            </li>
          </ul>
        </div>
      )}

      {/* Optional Manager Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Optional Manager Notes
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          placeholder="Add any additional comments or instructions..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {decision === 'approve' && allChecksPassed
            ? '✅ All checks passed. Ready to approve.'
            : decision === 'approve' && !allChecksPassed
            ? '⚠️ Complete all checklist items before approving.'
            : decision
            ? '⚠️ This action will notify the supervisor.'
            : 'Select a decision above to continue.'}
        </p>
        
        <button
          onClick={handleSubmit}
          disabled={
            !decision ||
            (decision === 'approve' && !allChecksPassed) ||
            (decision !== 'approve' && !reason.trim()) ||
            isProcessing
          }
          className={`px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
            decision === 'approve'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : decision === 'revision'
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
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