// src/app/(supervisor)/capture/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { mockDailyBucket } from '@/types/daily-bucket.types';

export default function CapturePage() {
  const [isPreview, setIsPreview] = useState(false);

  const handleCapture = () => setIsPreview(true);
  const handleRetake = () => setIsPreview(false);
  const handleSave = () => {
    alert('Photo saved to daily bucket! (Prototype)');
    setIsPreview(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Capture Photos</h1>
      <p className="text-gray-600 mb-6">Document work as it happens. Photos are auto-tagged to your current project.</p>
      
      {!isPreview ? (
        // Capture View
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-black aspect-video rounded-lg flex items-center justify-center text-white">
            <p>Live Camera View</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Type</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Hull Welding</option>
                <option>Deck Painting</option>
                <option>Engine Inspection</option>
                <option>Structural Repair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Drydock 2 - Port Side</option>
                <option>Bow Section</option>
                <option>Stern Section</option>
              </select>
            </div>
            <button
              onClick={handleCapture}
              className="w-full flex items-center justify-center px-5 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900"
            >
              Capture
            </button>
          </div>
        </div>
      ) : (
        // Preview View
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
           <div className="bg-gray-100 aspect-video rounded-lg relative">
             <Image src="/dockyard-bg.jpg" alt="Captured work" fill className="rounded-lg object-cover" />
           </div>
           <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea rows={4} className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Add notes, e.g., 'Section A3-12 welding complete...'"></textarea>
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-500">
                <p><strong>Metadata (Auto-captured):</strong></p>
                <p><strong>Project:</strong> MV Sea Princess</p>
                <p><strong>Location:</strong> Drydock 2 - Port Side</p>
                <p><strong>GPS:</strong> 6.9271° N, 79.8612° E</p>
              </div>
              <div className="flex space-x-3">
                <button onClick={handleSave} className="flex-1 text-center px-5 py-2.5 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900">Save Photo</button>
                <button onClick={handleRetake} className="flex-1 text-center px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50">Retake</button>
              </div>
           </div>
        </div>
      )}

      {/* Daily Bucket Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Collected Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Photos Captured ({mockDailyBucket.photos.length})</h4>
            <div className="space-y-2">
              {mockDailyBucket.photos.map(photo => (
                <div key={photo.id} className="flex items-center p-2 bg-gray-50 rounded-md">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{photo.workType}</p>
                    <p className="text-xs text-gray-500">{photo.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Issues Logged ({mockDailyBucket.issues.length})</h4>
            <div className="space-y-2">
              {mockDailyBucket.issues.map(issue => (
                <div key={issue.id} className="flex items-center p-2 bg-red-50 rounded-md">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{issue.issueType}</p>
                    <p className="text-xs text-gray-500">{issue.severity} Priority</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> All data collected today will be automatically included in your final report.
          </p>
        </div>
      </div>
    </div>
  );
}
