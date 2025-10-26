import React from 'react';
import { RecentActivity } from '@/types/project.types';

interface AlertsPanelProps {
  activities: RecentActivity[];
}

export default function AlertsPanel({ activities }: AlertsPanelProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report':
        return (
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'alert':
        return (
          <div className="bg-red-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'approval':
        return (
          <div className="bg-green-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getLeftBorderColor = (type: string) => {
    switch (type) {
      case 'report':
        return 'border-l-4 border-l-blue-500';
      case 'alert':
        return 'border-l-4 border-l-red-500';
      case 'approval':
        return 'border-l-4 border-l-green-500';
      default:
        return 'border-l-4 border-l-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          Recent Activities
        </h2>
      </div>

      {/* Activities List */}
      <div className="p-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-base text-gray-600 font-medium">No recent activities</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`bg-gray-50 rounded-lg p-3 ${getLeftBorderColor(activity.type)} hover:bg-gray-100 transition-colors`}
              >
                <div className="flex gap-3">
                  {getActivityIcon(activity.type)}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="truncate">{activity.project}</span>
                      <span>•</span>
                      <span className="whitespace-nowrap">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Link */}
      {activities.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200">
          <button className="w-full text-center text-sm text-[#003d82] hover:text-[#002d5f] font-semibold transition-colors">
            View all activities
          </button>
        </div>
      )}
    </div>
  );
}