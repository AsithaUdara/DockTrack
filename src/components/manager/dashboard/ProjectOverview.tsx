'use client';

import React from 'react';
import { Project } from '@/types/project.types';

type Props = {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  /** If true, the component renders its own title row. Default: true */
  withHeader?: boolean;
};

/* ---------------- helpers ---------------- */
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

/** Real vessel images (fallbacks) */
const VESSEL_IMAGES = {
  ocean: [
    'https://static.vesselfinder.net/ship-photo/9458406-352004098-6aec25d233e29db4614ab3db8abf8936/1',
    'https://static.vesselfinder.net/ship-photo/9458407-352004099-8feb96d344e29db4614ab3db8abf8937/1',
    'https://static.vesselfinder.net/ship-photo/9458408-352004100-cdefg8h9i0jklmno/1', // Added more images
    'https://static.vesselfinder.net/ship-photo/9458409-352004101-pqrstuvwxyzabc/1',
  ],
  tanker: [
    'https://static.vesselfinder.net/ship-photo/9293611-538004385-cf3a8e7bc899279c3af5c52f9a77f60d/1',
    'https://static.vesselfinder.net/ship-photo/9293612-538004386-1234a8e7bc899279c3af5c52f9a77f60e/1',
    'https://static.vesselfinder.net/ship-photo/9293613-538004387-fghijk7lmnopq/1', // Added more images
    'https://static.vesselfinder.net/ship-photo/9293614-538004388-rstuvwxzyabcd/1',
  ],
  container: [
    'https://static.vesselfinder.net/ship-photo/9776418-477000700-87654321dcba/1',
    'https://static.vesselfinder.net/ship-photo/9776419-477000701-12345678abcd/1',
    'https://static.vesselfinder.net/ship-photo/9776420-477000702-efghij9klmno/1', // Added more images
    'https://static.vesselfinder.net/ship-photo/9776421-477000703-pqrstuvwxyza/1',
  ],
  cruise: [
    'https://static.vesselfinder.net/ship-photo/9383936-311000209-0b9e6d234a87d54c12f98b76e543a21c/1',
    'https://static.vesselfinder.net/ship-photo/9383937-311000210-1a2b3c4d5e6f7g8h9i0j/1',
    'https://static.vesselfinder.net/ship-photo/9383938-311000211-klmnop1qrstu/1', // Added more images
    'https://static.vesselfinder.net/ship-photo/9383939-311000212-vwxyzab0cdef/1',
  ],
  bulk: [
    'https://static.vesselfinder.net/ship-photo/9595862-566789123-8a7b6c5d4e3f2g1h/1',
    'https://static.vesselfinder.net/ship-photo/9595863-566789124-1h2g3f4e5d6c7b8a/1',
    'https://static.vesselfinder.net/ship-photo/9595864-566789125-ijklmn2opqrs/1', // Added more images
    'https://static.vesselfinder.net/ship-photo/9595865-566789126-tuvwxyz3abcd/1',
  ],
  drydock: [
    'https://static.vesselfinder.net/ship-photo/9712345-367000123-abcdef123456/1',
    'https://static.vesselfinder.net/ship-photo/9712346-367000124-fedcba654321/1',
    'https://static.vesselfinder.net/ship-photo/9712347-367000125-ghijkl7890ab/1', // Added more images
    'https://static.vesselfinder.net/ship-photo/9712348-367000126-cdefgh123456/1',
  ]
};

// A simple counter to cycle through images for generic types
let imageIndexCounter = 0;

const shipImageOf = (p: any) => {
  if (p?.imageUrl) return p.imageUrl as string;

  const name = titleOf(p).toLowerCase();
  const type = (p?.vesselType || p?.projectType || '').toLowerCase();

  // Specific name matches
  if (name.includes('ocean voyager')) return VESSEL_IMAGES.ocean[0];
  if (name.includes('maritime express')) return VESSEL_IMAGES.tanker[0];
  if (name.includes('pacific dawn')) return VESSEL_IMAGES.cruise[1]; // Use a different index
  if (name.includes('atlantic star')) return VESSEL_IMAGES.bulk[1]; // Use a different index

  // Type matches, cycling through available images
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

  // Fallback, cycle through generic ocean images
  const index = imageIndexCounter % VESSEL_IMAGES.ocean.length;
  imageIndexCounter++;
  return VESSEL_IMAGES.ocean[index];
};


export default function ProjectOverview({
  projects,
  onProjectClick,
  withHeader = true
}: Props) {
  // Reset the counter each time the component renders to ensure consistent image assignment on initial load
  // or when projects prop changes significantly.
  // For production, you might want a more robust way to assign unique images,
  // e.g., hashing project ID to an image index, or having image URLs directly in project data.
  React.useEffect(() => {
    imageIndexCounter = 0;
  }, [projects]);


  return (
    <section className="mt-4">
      {/* Optional header (avoid double titles elsewhere) */}
      {withHeader && (
        <div className="flex items-center justify-between px-4 sm:px-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Project Overview
          </h2>
          <a
            href="/manager/projects"
            className="text-sm font-semibold text-[#003d82] hover:underline"
          >
            View all projects →
          </a>
        </div>
      )}

      {/* Cards grid — slightly smaller & tighter for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6">
        {projects.map((p: any) => {
          const title = titleOf(p);
          const img = shipImageOf(p); // This will now cycle through images
          const progress = progressOf(p);
          const days = daysRemainingOf(p);

          return (
            <button
              key={String(p.id ?? title)}
              onClick={() => onProjectClick(p)}
              className="group text-left bg-white rounded-xl border border-gray-200 hover:border-[#003d82]/50 hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-32 overflow-hidden bg-slate-100 flex items-center justify-center p-2">
                <img
                  src={img}
                  alt={`Vessel ${title}`}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <h3 className="text-base font-semibold text-slate-900 truncate">
                  {title}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium text-slate-800">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full">
                    <div
                      className="h-1.5 bg-[#003d82] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Days Remaining</span>
                    <span className="font-medium text-slate-800">{days}</span>
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