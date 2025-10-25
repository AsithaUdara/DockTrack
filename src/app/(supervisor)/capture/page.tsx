"use client";

import { useState } from 'react';
import { usePhotoCapture } from '@/hooks/usePhotoCapture';
import CameraCapture from '@/components/supervisor/capture/CameraCapture';
import PhotoPreview from '@/components/supervisor/capture/PhotoPreview';
import PhotoAnnotation from '@/components/supervisor/capture/PhotoAnnotation';
import PhotoGallery from '@/components/supervisor/capture/PhotoGallery';

// Define the steps in our capture process
type CaptureMode = 'CAPTURE' | 'PREVIEW' | 'ANNOTATE';

export default function CapturePage() {
  const [mode, setMode] = useState<CaptureMode>('CAPTURE');
  const {
    capturedPhotos,
    activePhoto,
    startCaptureProcess,
    updateActivePhotoDescription,
    savePhotoToBucket,
    discardActivePhoto,
    deletePhotoFromBucket,
    setActivePhoto,
  } = usePhotoCapture();

  // This function is called from the Camera component
  const handlePhotoCaptured = (workType: string, location: string, imageDataUrl: string) => {
    startCaptureProcess(workType, location, imageDataUrl);
    setMode('PREVIEW'); // Move to the preview step
  };
  
  // This function is called from the Preview or Annotation component
  const handleSave = (photoData: any) => {
    savePhotoToBucket(photoData);
    setMode('CAPTURE'); // Go back to capture mode
  };
  
  // This function clears the active photo and goes back to capture mode
  const handleRetake = () => {
    discardActivePhoto();
    setMode('CAPTURE');
  };

  // Render different components based on the current mode
  const renderCurrentStep = () => {
    switch (mode) {
      case 'CAPTURE':
        return <CameraCapture onCapture={handlePhotoCaptured} />;
      
      case 'PREVIEW':
        if (!activePhoto) return null;
        return (
          <PhotoPreview 
            photo={activePhoto}
            onDescriptionChange={updateActivePhotoDescription}
            onSave={handleSave}
            onRetake={handleRetake}
            onAnnotate={() => setMode('ANNOTATE')} // Switch to annotation mode
          />
        );
        
      case 'ANNOTATE':
        if (!activePhoto) return null;
        return (
            <PhotoAnnotation 
                photo={activePhoto}
                onDescriptionChange={updateActivePhotoDescription}
                onSave={handleSave}
                onCancel={() => setMode('PREVIEW')} // Go back to the preview step
            />
        );

      default:
        return <CameraCapture onCapture={handlePhotoCaptured} />;
    }
  };

  return (
    <div className="bg-gray-50 flex-1 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Capture Photos</h1>
      <p className="text-gray-500 mb-6">Document work as it happens. Photos are auto-tagged to your current project.</p>
      
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
        {renderCurrentStep()}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Collected Data</h2>
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <PhotoGallery photos={capturedPhotos} onDelete={deletePhotoFromBucket} />
        </div>
      </div>
    </div>
  );
}