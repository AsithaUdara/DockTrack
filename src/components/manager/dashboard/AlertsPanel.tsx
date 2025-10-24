// src/components/manager/dashboard/AlertsPanel.tsx

'use client';

import React from 'react';
import { RecentActivity } from '@/types/project.types';

interface AlertsPanelProps {
  activities: RecentActivity[];
}

export default function AlertsPanel({ activities }: AlertsPanelProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report':
        return '📄';
      case 'issue':
        return '⚠️';
      case 'approval':
        return '✅';
      case 'update':
        return '📊';
      default:
        return '📌';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-500/10';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'border-l-green-500 bg-green-500/10';
      default:
        return 'border-l-blue-500 bg-blue-500/10';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Recent Activities</h2>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`border-l-4 ${getPriorityColor(activity.priority)} p-4 rounded-r-lg transition-all hover:bg-slate-700/30`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium mb-1">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">{activity.projectName}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{formatTimestamp(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <p className="text-slate-400 text-center py-8">No recent activities</p>
      )}
    </div>
  );
}