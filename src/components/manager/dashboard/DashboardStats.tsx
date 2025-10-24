// src/components/manager/dashboard/DashboardStats.tsx

'use client';

import React from 'react';
import { DashboardStats as StatsType } from '@/types/project.types';

interface DashboardStatsProps {
  stats: StatsType;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      bgColor: 'bg-slate-700/50',
      textColor: 'text-white'
    },
    {
      label: 'Pending Approvals',
      value: stats.pendingApprovals,
      bgColor: 'bg-slate-700/50',
      textColor: 'text-white'
    },
    {
      label: "Today's Man-Hours",
      value: stats.todayManHours,
      bgColor: 'bg-slate-700/50',
      textColor: 'text-white'
    },
    {
      label: 'Critical Issues',
      value: stats.criticalIssues,
      bgColor: 'bg-slate-700/50',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, index) => (
        <div 
          key={index}
          className={`${card.bgColor} rounded-lg p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200`}
        >
          <h3 className="text-slate-400 text-sm font-medium mb-2">
            {card.label}
          </h3>
          <p className={`${card.textColor} text-4xl font-bold`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}