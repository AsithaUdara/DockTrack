// src/components/manager/reports/PhotoGalleryView.tsx
'use client';

import { useState } from 'react';
import { Photo } from '@/types/report.types';
import Image from 'next/image';

interface Props {
  photos: Photo[];
}

export default function PhotoGalleryView({ photos }: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(photos.map(p => p.workType))];
  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.workType === filter);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filteredPhotos.map((photo, index) => (
          <div
            key={index}
            onClick={() => setSelectedPhoto(photo)}
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:ring-4 hover:ring-blue-500 transition-all"
          >
            <Image
              src={photo.url}
              alt={photo.description}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="text-xs font-medium">{photo.workType}</p>
                <p className="text-xs opacity-90">{photo.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          photos={filteredPhotos}
          onClose={() => setSelectedPhoto(null)}
          onNext={() => {
            const currentIndex = filteredPhotos.indexOf(selectedPhoto);
            const nextIndex = (currentIndex + 1) % filteredPhotos.length;
            setSelectedPhoto(filteredPhotos[nextIndex]);
          }}
          onPrevious={() => {
            const currentIndex = filteredPhotos.indexOf(selectedPhoto);
            const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
            setSelectedPhoto(filteredPhotos[prevIndex]);
          }}
        />
      )}
    </div>
  );
}

// Lightbox Component
function PhotoLightbox({ 
  photo, 
  photos, 
  onClose, 
  onNext, 
  onPrevious 
}: { 
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const currentIndex = photos.indexOf(photo);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        ✕
      </button>

      {/* Navigation */}
      <button
        onClick={onPrevious}
        className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
      >
        ←
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
      >
        →
      </button>

      {/* Image Container */}
      <div className="max-w-5xl w-full max-h-[80vh] flex flex-col">
        <div className="relative flex-1 bg-gray-900 rounded-lg overflow-hidden">
          <Image
            src={photo.url}
            alt={photo.description}
            fill
            className="object-contain"
          />
        </div>

        {/* Photo Info */}
        <div className="bg-gray-800 rounded-b-lg p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{photo.workType}</h3>
              <p className="text-gray-300 text-sm mb-4">{photo.description}</p>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Date:</span>
                  <span className="ml-2">{photo.date}</span>
                </div>
                <div>
                  <span className="text-gray-400">Time:</span>
                  <span className="ml-2">{photo.timestamp}</span>
                </div>
                <div>
                  <span className="text-gray-400">Location:</span>
                  <span className="ml-2">{photo.location}</span>
                </div>
              </div>
            </div>

            <div className="ml-6 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                ⬇️ Download
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                📤 Share
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
            Photo {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}