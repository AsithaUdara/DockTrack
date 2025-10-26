"use client";

import Image from 'next/image';
import { X, Tag, Calendar, MapPin, Rss, User, FileText } from 'lucide-react';
import { CapturedPhoto } from '@/hooks/usePhotoCapture';

interface PhotoViewerModalProps {
  photo: CapturedPhoto;
  onClose: () => void;
}

export default function PhotoViewerModal({ photo, onClose }: PhotoViewerModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Display */}
        <div className="w-full md:w-2/3 bg-gray-100 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
          <Image 
            src={photo.annotatedUrl || photo.url} 
            alt={`Annotation for ${photo.workType}`}
            width={1200}
            height={900}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-1/3 p-6 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">Photo Details</h2>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start"><Tag className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" /><p><strong className="font-semibold text-gray-800">Work Type:</strong> {photo.workType}</p></div>
            <div className="flex items-start"><Calendar className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" /><p><strong className="font-semibold text-gray-800">Timestamp:</strong> {photo.timestamp.toLocaleString()}</p></div>
            <div className="flex items-start"><MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" /><p><strong className="font-semibold text-gray-800">Location:</strong> {photo.location}</p></div>
            <div className="flex items-start"><Rss className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" /><p><strong className="font-semibold text-gray-800">GPS:</strong> {photo.gps}</p></div>
            <div className="flex items-start"><User className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" /><p><strong className="font-semibold text-gray-800">Supervisor:</strong> {photo.supervisor}</p></div>
            <div className="flex items-start"><FileText className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" /><p><strong className="font-semibold text-gray-800">Description:</strong> {photo.description || <span className="italic text-gray-400">No description provided.</span>}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}