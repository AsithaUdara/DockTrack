"use client";

import { CapturedPhoto } from "@/hooks/usePhotoCapture";
import { Tag, Calendar, MapPin, User, Rss } from "lucide-react"; // I noticed I was missing some icons in the previous dark theme, adding them here for consistency.

interface PhotoMetadataProps {
  photo: CapturedPhoto;
  onDescriptionChange: (description: string) => void;
}

export default function PhotoMetadata({ photo, onDescriptionChange }: PhotoMetadataProps) {
  return (
    <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-500 border border-gray-200 h-full">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Photo Details</h3>
      <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-start">
              <Tag className="w-3.5 h-3.5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
              <p><strong className="font-semibold text-gray-800">Work Type:</strong> {photo.workType}</p>
          </div>
          <div className="flex items-start">
              <Calendar className="w-3.5 h-3.5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
              {/* --- THIS IS THE CORRECTED LINE --- */}
              <p><strong className="font-semibold text-gray-800">Timestamp:</strong> {photo.timestamp.toLocaleString()}</p>
          </div>
          <div className="flex items-start">
              <MapPin className="w-3.5 h-3.5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
              <p><strong className="font-semibold text-gray-800">Location:</strong> {photo.location}</p>
          </div>
          <div className="flex items-start">
              <Rss className="w-3.5 h-3.5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
              <p><strong className="font-semibold text-gray-800">GPS:</strong> {photo.gps}</p>
          </div>
          <div className="flex items-start">
              <User className="w-3.5 h-3.5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
              <p><strong className="font-semibold text-gray-800">Supervisor:</strong> {photo.supervisor}</p>
          </div>
      </div>
      <div className="mt-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={photo.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Add notes..."
          className="w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}