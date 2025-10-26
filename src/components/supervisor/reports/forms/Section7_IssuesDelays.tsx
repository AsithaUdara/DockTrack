// src/components/supervisor/reports/forms/Section7_IssuesDelays.tsx
import { useState } from 'react';
import { DailyIssue } from '@/data/mock-daily-activity';

export default function Section7_IssuesDelays() {
  const [issues, setIssues] = useState<DailyIssue[]>([]); // Start with empty array for new report

  const addIssue = () => {
    setIssues([
      ...issues,
      {
        title: '',
        description: '',
        priority: 'Low',
        impactLevel: 'Minor',
        timeLost: 0,
        actionTaken: '',
      },
    ]);
  };

  const updateIssue = (index: number, field: keyof DailyIssue, value: string | number | undefined) => {
    const updatedIssues = [...issues];
    updatedIssues[index] = { ...updatedIssues[index], [field]: value };
    setIssues(updatedIssues);
  };

  const removeIssue = (index: number) => {
    setIssues(issues.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 7: Issues & Delays</h2>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-3">Issues Reported</h3>
        <div className="space-y-4">
          {issues.length === 0 ? (
            <p className="text-gray-600 text-sm">No issues reported yet. Click below to add an issue.</p>
          ) : (
            issues.map((issue, index) => (
              <div key={index} className="space-y-2 border-b border-yellow-200 pb-2">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={issue.title}
                    onChange={(e) => updateIssue(index, 'title', e.target.value)}
                    placeholder="Issue Title"
                    className="flex-1 p-2 border border-gray-300 rounded-md text-gray-800"
                  />
                  <button
                    onClick={() => removeIssue(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  value={issue.description}
                  onChange={(e) => updateIssue(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <select
                    value={issue.impactLevel || 'Minor'} // Default to 'Minor' if undefined
                    onChange={(e) => updateIssue(index, 'impactLevel', e.target.value as DailyIssue['impactLevel'])}
                    className="p-2 border border-gray-300 rounded-md text-gray-600"
                  >
                    <option value="Minor">Minor (&lt; 4h)</option>
                    <option value="Moderate">Moderate (4-8h)</option>
                    <option value="Major">Major (&gt; 8h)</option>
                  </select>
                  <input
                    type="number"
                    value={issue.timeLost ?? 0} // Use nullish coalescing to handle undefined
                    onChange={(e) => updateIssue(index, 'timeLost', parseFloat(e.target.value) || 0)}
                    placeholder="Time Lost (hours)"
                    step="0.1"
                    className="p-2 border border-gray-300 rounded-md text-gray-600"
                  />
                  <select
                    value={issue.priority}
                    onChange={(e) => updateIssue(index, 'priority', e.target.value as DailyIssue['priority'])}
                    className="p-2 border border-gray-300 rounded-md text-gray-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <textarea
                  value={issue.actionTaken ?? ''} // Use nullish coalescing to handle undefined
                  onChange={(e) => updateIssue(index, 'actionTaken', e.target.value)}
                  placeholder="Action Taken"
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                  rows={2}
                />
              </div>
            ))
          )}
        </div>
        <button
          onClick={addIssue}
          className="font-semibold text-blue-600 hover:text-blue-800 text-sm mt-4"
        >
          + Add Another Issue
        </button>
      </div>
    </div>
  );
}