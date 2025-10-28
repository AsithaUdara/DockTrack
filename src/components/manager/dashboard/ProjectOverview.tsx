'use client';

import React from 'react';
import { Project } from '@/types/project.types';

type Props = {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  withHeader?: boolean;
};

const titleOf = (p: any) =>
  p?.name || p?.vesselName || p?.projectName || 'Untitled Project';

const progressOf = (p: any) =>
  typeof p?.progress === 'number' ? Math.max(0, Math.min(100, p.progress)) : 0;

const daysRemainingOf = (p: any): number | string => {
  if (typeof p?.daysRemaining === 'number') return p.daysRemaining;

  const end =
    p?.deadline ||
    p?.endDate ||
    p?.expectedCompletionDate ||
    p?.dueDate ||
    null;

  if (!end) return 0;
  const endDate = new Date(end);
  if (isNaN(endDate.getTime())) return 0;

  const today = new Date();
  const diffMs = endDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

const VESSEL_IMAGES = {
  ocean: [
    'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1568481445378-2eeb6e5eb0fc?w=500&h=350&fit=crop&q=80',
  ],
  tanker: [
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=500&h=350&fit=crop&q=80',
  ],
  container: [
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=350&fit=crop&q=80',
  ],
  cruise: [
    'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560800452-f2d475982b96?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=350&fit=crop&q=80',
  ],
  bulk: [
    'https://images.unsplash.com/photo-1511306404404-ad607bd7c601?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1568481445378-2eeb6e5eb0fc?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=500&h=350&fit=crop&q=80',
  ],
  drydock: [
    'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=500&h=350&fit=crop&q=80',
    'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&h=350&fit=crop&q=80',
  ]
};

let imageIndexCounter = 0;

const shipImageOf = (p: any) => {
  if (p?.imageUrl) return p.imageUrl as string;

  const type = (p?.vesselType || p?.projectType || '').toLowerCase();

  if (type.includes('tanker')) {
    const index = imageIndexCounter % VESSEL_IMAGES.tanker.length;
    imageIndexCounter++;
    return VESSEL_IMAGES.tanker[index];
  }
  if (type.includes('container')) {
    const index = imageIndexCounter % VESSEL_IMAGES.container.length;
    imageIndexCounter++;
    return VESSEL_IMAGES.container[index];
  }
  if (type.includes('cruise') || type.includes('passenger')) {
    const index = imageIndexCounter % VESSEL_IMAGES.cruise.length;
    imageIndexCounter++;
    return VESSEL_IMAGES.cruise[index];
  }
  if (type.includes('bulk')) {
    const index = imageIndexCounter % VESSEL_IMAGES.bulk.length;
    imageIndexCounter++;
    return VESSEL_IMAGES.bulk[index];
  }
  if (type.includes('repair') || type.includes('drydock')) {
    const index = imageIndexCounter % VESSEL_IMAGES.drydock.length;
    imageIndexCounter++;
    return VESSEL_IMAGES.drydock[index];
  }

  const index = imageIndexCounter % VESSEL_IMAGES.ocean.length;
  imageIndexCounter++;
  return VESSEL_IMAGES.ocean[index];
};

export default function ProjectOverview({
  projects,
  onProjectClick,
  withHeader = true
}: Props) {
  React.useEffect(() => {
    imageIndexCounter = 0;
  }, [projects]);

  return (
    <section className="mt-4">
      {withHeader && (
        <div className="flex items-center justify-between px-4 sm:px-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Project Overview
          </h2>
          <a
            href="/manager/projects"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            View all projects →
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6">
        {projects.map((p: any) => {
          const title = titleOf(p);
          const img = shipImageOf(p);
          const progress = progressOf(p);
          const days = daysRemainingOf(p);

          return (
            <button
              key={String(p.id ?? title)}
              onClick={() => onProjectClick(p)}
              className="group text-left bg-white rounded-xl border border-gray-200 hover:border-blue-600/50 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="relative w-full h-32 overflow-hidden bg-slate-100">
                <img
                  src={img}
                  alt={`Vessel ${title}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {title}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-800">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full">
                    <div
                      className="h-1.5 bg-blue-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Days Remaining</span>
                    <span className="font-medium text-gray-800">{days}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}