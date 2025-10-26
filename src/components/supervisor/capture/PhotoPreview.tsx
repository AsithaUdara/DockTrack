"use client";

import Image from 'next/image';
import { Save, RefreshCw, Edit } from 'lucide-react';
import { CapturedPhoto } from '@/hooks/usePhotoCapture';

interface PhotoPreviewProps {
  photo: CapturedPhoto;
  onDescriptionChange: (description: string) => void;
  onSave: (photoData: CapturedPhoto) => void;
  onRetake: () => void;
  onAnnotate: () => void; // New prop to switch to annotation mode
}

export default function PhotoPreview({ photo, onDescriptionChange, onSave, onRetake, onAnnotate }: PhotoPreviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start animate-fade-in">
       <div className="bg-gray-100 aspect-video rounded-lg relative border">
         <Image src={photo.url} alt="Captured work" fill className="rounded-lg object-cover" />
       </div>
       <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              rows={4} 
              value={photo.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md" 
              placeholder="Add notes, e.g., 'Section A3-12 welding complete...'"
            />
          </div>
          
          <div className="flex space-x-3">
            <button onClick={() => onSave(photo)} className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                <Save className="mr-2 h-4 w-4" />
                Save As-Is
            </button>
            <button onClick={onRetake} className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake
            </button>
          </div>
          <button 
                onClick={onAnnotate} 
                className="w-full flex items-center justify-center px-5 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
                <Edit className="mr-2 h-5 w-5" />
                Edit & Annotate
            </button>
       </div>
    </div>
  );
}