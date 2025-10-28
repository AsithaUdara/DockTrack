// src/components/manager/dashboard/PendingReports.tsx
'use client';

import React from 'react';
import { Project } from '@/types/project.types';

type Props = {
  projects: Project[];
  onViewReports: (projectId: string) => void;
};

/* ---------------- helpers (unchanged semantics) ---------------- */
const titleOf = (p: any) =>
  p?.name || p?.vesselName || p?.projectName || 'Untitled Project';

const managerOf = (p: any) =>
  p?.manager || p?.projectManager || p?.owner || '—';

const progressOf = (p: any) =>
  typeof p?.progress === 'number' ? Math.max(0, Math.min(100, p.progress)) : 0;

const pendingCountOf = (p: any) =>
  (typeof p?.pendingReports === 'number' && p.pendingReports) ||
  (typeof p?.pending === 'number' && p.pending) ||
  0;

/* ---------------- small atoms ---------------- */
const RowIcon = () => (
  <div className="h-10 w-10 rounded-xl bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center">
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  </div>
);

const ProgressRight = ({ value }: { value: number }) => (
  <div className="min-w-60 sm:min-w-[280px] md:min-w-[320px] flex items-center gap-3">
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-gray-200/70 overflow-hidden">
        {/* subtle glossy fill using same brand blue */}
        <div
          className="h-2 bg-blue-700 rounded-full transition-[width] duration-500"
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        />
      </div>
    </div>
    <div className="w-8 text-right text-sm font-semibold text-slate-700">{value}</div>
  </div>
);

const PendingChip = ({ count }: { count: number }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 text-xs font-semibold">
    <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-bold">
      {count}
    </span>
    pending
  </span>
);

/* ---------------- component ---------------- */
export default function PendingReports({ projects, onViewReports }: Props) {
  const items = projects.filter((p) => pendingCountOf(p) > 0);

  return (
    <div className="space-y-4">
      {items.map((p: any) => {
        const title = titleOf(p);
        const manager = managerOf(p);
        const progress = progressOf(p);
        const pending = pendingCountOf(p);

        return (
          <div
            key={String(p.id ?? title)}
            className="
              rounded-xl border border-gray-200 bg-white
              px-4 sm:px-5 py-3
              hover:shadow-md transition-shadow
            "
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left: icon + text block */}
              <div className="flex items-start gap-4 min-w-0">
                <RowIcon />
                <div className="min-w-0">
                  {/* Project Name */}
                  <div className="text-base font-bold text-gray-900 truncate">
                    {title}
                  </div>

                  {/* Meta line (removed progress symbol/icon as requested) */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-500">Manager:</span>
                      <span className="font-semibold text-gray-800 truncate">{manager}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500">Progress:</span>
                      <span className="font-semibold text-gray-800">{progress}%</span>
                    </div>

                    <PendingChip count={pending} />
                  </div>
                </div>
              </div>

              {/* Right: slim rail + numeric value */}
              <ProgressRight value={progress} />
            </div>

            {/* CTA row */}
            <div className="mt-3 flex items-center justify-end">
              <button
                onClick={() => onViewReports(String(p.id))}
                type="button"
                className="
                  inline-flex items-center gap-1.5 rounded-lg
                  bg-blue-800 hover:bg-blue-900
                  px-3.5 py-2 text-sm font-semibold text-white
                  shadow-sm active:scale-[0.98] transition
                "
              >
                View reports
                <svg className="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <svg
            className="mx-auto mb-3 h-10 w-10 text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-base font-semibold text-gray-700">No pending approvals</p>
          <p className="text-sm text-gray-500 mt-1">You’re all caught up.</p>
        </div>
      )}
    </div>
  );
}
