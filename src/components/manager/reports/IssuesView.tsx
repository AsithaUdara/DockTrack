'use client';

import { useState } from 'react';
import { Issue } from '@/types/report.types';
import ManagerCommentBox from './ManagerCommentBox';
import Header from '../../shared/layout/Header';

interface Props {
  issues: Issue[];
  reportId: string;
}

export default function IssuesView({ issues, reportId }: Props) {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  if (issues.length === 0) {
    return (
      <Header title="Issues" active="Reports">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-gray-900">No Issues Reported</h3>
          <p className="text-gray-600 mt-2">Everything proceeded smoothly today.</p>
        </div>
      </Header>
    );
  }

  return (
    <Header title="Issues" active="Reports">
      <div className="space-y-4">
      {issues.map((issue, index) => (
        <div
          key={index}
          className={`border rounded-lg p-6 transition-all ${
            issue.priority === 'high' ? 'border-red-300 bg-red-50' :
            issue.priority === 'medium' ? 'border-yellow-300 bg-yellow-50' :
            'border-blue-300 bg-blue-50'
          }`}
        >
          {/* Issue Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  issue.priority === 'high' ? 'bg-red-600 text-white' :
                  issue.priority === 'medium' ? 'bg-yellow-600 text-white' :
                  'bg-blue-600 text-white'
                }`}>
                  {issue.priority.toUpperCase()} PRIORITY
                </span>
                <span className="text-sm text-gray-600">{issue.type}</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Issue #{index + 1}: {issue.type}
              </h4>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
              issue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {issue.status}
            </span>
          </div>

          {/* Issue Details */}
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Description:</span>
              <p className="text-gray-900 mt-1">{issue.description}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Action Taken:</span>
              <p className="text-gray-900 mt-1">{issue.actionTaken}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-300">
              <div>
                <span className="text-sm font-medium text-gray-700">Impact Level:</span>
                <p className="text-gray-900">{issue.impact}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Time Lost:</span>
                <p className="text-gray-900">{issue.timeLost}</p>
              </div>
            </div>
          </div>

          {/* Manager Actions */}
          <div className="mt-6 pt-4 border-t border-gray-300">
            <button
              onClick={() => setSelectedIssue(issue)}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              📝 Add Manager Comment & Actions
            </button>
          </div>

          {/* Existing Manager Comments */}
          {issue.managerComments && issue.managerComments.length > 0 && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <h5 className="font-medium text-gray-900 mb-2">Manager's Response:</h5>
              {issue.managerComments.map((comment, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <p className="text-gray-900">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {comment.authorId} - {comment.timestamp}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Issue Comment Modal */}
      {selectedIssue && (
        <IssueCommentModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onSave={(comment) => {
            // Handle saving comment
            console.log('Saving comment:', comment);
            setSelectedIssue(null);
          }}
        />
      )}
      </div>
    </Header>
  );
}

// Issue Comment Modal
function IssueCommentModal({ 
  issue, 
  onClose, 
  onSave 
}: { 
  issue: Issue;
  onClose: () => void;
  onSave: (comment: string) => void;
}) {
  const [comment, setComment] = useState('');
  const [actionItems, setActionItems] = useState<string[]>(['']);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Manager Comment - Issue #{issue.type}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Comment Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Provide guidance, solutions, or follow-up actions..."
            />
          </div>

          {/* Action Items Checklist */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Items
            </label>
            {actionItems.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...actionItems];
                    newItems[index] = e.target.value;
                    setActionItems(newItems);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="Action item..."
                />
                {actionItems.length > 1 && (
                  <button
                    onClick={() => setActionItems(actionItems.filter((_, i) => i !== index))}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setActionItems([...actionItems, ''])}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Add Action Item
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => onSave(comment)}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              💾 Save Comment
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}