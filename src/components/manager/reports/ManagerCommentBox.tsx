'use client';

import { useState } from 'react';
import { ManagerComment } from '@/types/report.types';
import Header from '../../shared/layout/Header';

interface Props {
  reportId: string;
  existingComments?: ManagerComment[];
}

export default function ManagerCommentBox({ reportId, existingComments = [] }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setComment('');
    setIsSubmitting(false);
    setIsExpanded(false);
    
    // Show success message
    alert('Comment saved successfully!');
  };

  return (
    <Header title="Manager Comments" active="Reports">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          💬 Manager Comments
        </h2>
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            + Add Comment
          </button>
        )}
      </div>

      {/* Existing Comments */}
      {existingComments.length > 0 && (
        <div className="space-y-4 mb-6">
          {existingComments.map((comment, index) => (
            <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {comment.authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{comment.authorName}</p>
                    <p className="text-xs text-gray-500">{comment.timestamp}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {comment.role}
                </span>
              </div>
              <p className="text-gray-900 ml-13">{comment.text}</p>
              
              {comment.actionItems && comment.actionItems.length > 0 && (
                <div className="mt-3 ml-13 p-3 bg-white border border-gray-200 rounded">
                  <p className="text-sm font-medium text-gray-700 mb-2">Action Items:</p>
                  <ul className="space-y-1">
                    {comment.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-900">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          readOnly
                          className="mt-0.5 rounded border-gray-300"
                        />
                        <span className={item.completed ? 'line-through text-gray-500' : ''}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Comment Form */}
      {isExpanded && (
        <div className="space-y-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 bg-white"
              placeholder="Provide feedback, guidance, or instructions for the supervisor..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length} / 1000 characters
            </p>
          </div>

          {/* Quick Templates */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Quick Templates:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Report approved. Good progress and excellent documentation. Keep up the quality work.",
                "Report approved with minor notes. Please address the material shortage issue urgently.",
                "Good work managing the delay efficiently. Continue with current approach.",
                "Excellent photo documentation. Quality standards maintained throughout."
              ].map((template, index) => (
                <button
                  key={index}
                  onClick={() => setComment(template)}
                  className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 transition-colors"
                >
                  {template.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded">
            <button className="p-2 hover:bg-gray-100 rounded text-sm font-semibold">B</button>
            <button className="p-2 hover:bg-gray-100 rounded text-sm italic">I</button>
            <button className="p-2 hover:bg-gray-100 rounded text-sm underline">U</button>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button className="p-2 hover:bg-gray-100 rounded text-sm">• List</button>
            <button className="p-2 hover:bg-gray-100 rounded text-sm">1. Numbered</button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setIsExpanded(false);
                setComment('');
              }}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!comment.trim() || isSubmitting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  💾 Save Comment
                </>
              )}
            </button>
          </div>
        </div>
      )}
      </div>
    </Header>
  );
}