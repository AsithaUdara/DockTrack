import React from 'react';
import { DashboardStats as StatsType } from '@/types/project.types';

interface DashboardStatsProps {
  stats: StatsType;
}

const CardShell: React.FC<
  React.PropsWithChildren<{ accent: string; icon: React.ReactNode }>
> = ({ accent, icon, children }) => {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl border border-gray-200 bg-white
        shadow-sm hover:shadow-lg transition-all
      "
    >
      {/* subtle gradient accent */}
      <div
        className={`absolute inset-x-0 -top-16 h-28 ${accent} opacity-10 blur-2xl`}
      />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className="
              shrink-0 rounded-xl p-2.5 sm:p-3
              bg-white/70 ring-1 ring-gray-200
              shadow-sm
            "
          >
            <div className="text-[22px] sm:text-2xl">{icon}</div>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      accent: 'bg-blue-500',
      valueClass: 'text-blue-700',
      icon: (
        <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h10" />
        </svg>
      ),
    },
    {
      label: 'Pending Reports',
      value: stats.pendingReports,
      accent: 'bg-amber-500',
      valueClass: 'text-amber-600',
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Workers',
      value: stats.totalWorkers,
      accent: 'bg-emerald-500',
      valueClass: 'text-emerald-600',
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M12 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Critical Alerts',
      value: stats.criticalAlerts,
      accent: 'bg-rose-500',
      valueClass: 'text-rose-600',
      icon: (
        <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 19h14.14c1.2 0 1.95-1.3 1.3-2.34L13.3 4.66c-.6-1.02-2.01-1.02-2.6 0L3.63 16.66C2.98 17.7 3.73 19 4.93 19z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-5 sm:mb-7">
      {cards.map((c) => (
        <CardShell key={c.label} accent={c.accent} icon={c.icon}>
          <p className="text-sm text-gray-500 font-medium">
            {c.label}
          </p>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-2">
            <p className={`text-2xl sm:text-3xl font-extrabold ${c.valueClass}`}>
              {Intl.NumberFormat().format(c.value as number)}
            </p>
            {/* Removed "updated just now" */}
          </div>
        </CardShell>
      ))}
    </div>
  );
}