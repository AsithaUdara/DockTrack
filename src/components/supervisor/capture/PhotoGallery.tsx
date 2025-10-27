"use client";

import { useState } from "react";
import { CapturedPhoto } from "@/hooks/usePhotoCapture";
import { Camera, Trash2 } from "lucide-react";
import PhotoViewerModal from "./PhotoViewerModal";

interface PhotoGalleryProps {
  photos: CapturedPhoto[];
  onDelete: (photoId: string) => void;
}

export default function PhotoGallery({ photos, onDelete }: PhotoGalleryProps) {
  const [viewingPhoto, setViewingPhoto] = useState<CapturedPhoto | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">No photos captured yet for today's report.</p>
      </div>
    );
  }

  return (
    <>
      {viewingPhoto && (
        <PhotoViewerModal 
          photo={viewingPhoto} 
          onClose={() => setViewingPhoto(null)} 
        />
      )}

      <div>
        <h4 className="font-medium text-gray-700 mb-2">Photos Captured ({photos.length})</h4>
        <div className="space-y-2">
          {photos.map(photo => (
            // --- THIS IS THE CORRECTED SECTION ---
            // The parent element is now a `div` instead of a `button`.
            // Added `cursor-pointer` to show it's clickable.
            <div 
              key={photo.id} 
              onClick={() => setViewingPhoto(photo)}
              className="w-full flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 group hover:bg-blue-50 hover:border-blue-300 transition-colors text-left cursor-pointer"
              role="button" // Accessibility: indicates it's interactive
              tabIndex={0} // Accessibility: makes it focusable with the keyboard
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setViewingPhoto(photo)}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Camera className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate" title={photo.workType}>
                  {photo.workType}
                </p>
                <p className="text-xs text-gray-500 truncate" title={photo.location}>
                  {photo.location}
                </p>
              </div>
              {/* The delete button is now a valid child of the div */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // This is still important! It prevents the div's onClick from firing.
                  onDelete(photo.id);
                }}
                className="ml-4 p-1.5 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete photo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}