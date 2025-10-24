// src/components/supervisor/reports/forms/Section1_WorkCompleted.tsx
import { mockDailyTasks, mockDailyIssues } from '@/data/mock-daily-activity';

const TaskCard = ({ task }: { task: typeof mockDailyTasks[0] }) => (
  <div className="border border-gray-200 rounded-lg p-4 bg-white">
    <div className="h-32 bg-gray-100 rounded-md mb-3">
      {/* Placeholder for photo previews */}
    </div>
    <h3 className="font-semibold text-gray-800">{task.type}</h3>
    <p className="text-sm text-green-600">✓ {task.photoCount} photos automatically included</p>
  </div>
);

export default function Section1_WorkCompleted() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 1: Work Completed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDailyTasks.map(task => <TaskCard key={task.type} task={task} />)}
      </div>
      <button className="font-semibold text-blue-600 hover:text-blue-800 text-sm">
        + Add Another Task
      </button>

      {/* Issues Logged Today */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900">Issues Logged Today</h3>
        <div className="mt-2 border-t border-yellow-200 pt-2">
          {mockDailyIssues.map(issue => (
            <div key={issue.title} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-medium text-gray-800">{issue.title}</p>
                <p className="text-sm text-gray-600">{issue.description}</p>
                <p className="text-xs text-gray-500 mt-1">Priority: {issue.priority}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-yellow-800 mt-3 p-2 bg-yellow-100 rounded-md">
          <strong>Note:</strong> These issues will be automatically included in Section 7 (Issues & Delays) of your report.
        </p>
      </div>
    </div>
  );
}
