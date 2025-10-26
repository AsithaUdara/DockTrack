"use client";

import { useState, useEffect } from 'react';

export interface CapturedPhoto {
  id: string;
  url: string;
  annotatedUrl?: string;
  workType: string;
  location: string;
  description: string;
  timestamp: Date;
  project: string;
  gps: string;
  supervisor: string;
}

const MOCK_METADATA = {
    project: 'MV Sea Princess',
    gps: '6.9271° N, 79.8612° E',
    supervisor: 'Supervisor Sam'
};

const LOCAL_STORAGE_KEY = 'capturedPhotos';

export const usePhotoCapture = () => {
  // --- MODIFIED STATE INITIALIZATION ---
  // The state now loads its initial value from local storage.
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>(() => {
    // We need to check if `window` exists for Next.js server-side rendering
    if (typeof window === 'undefined') {
        return [];
    }
    try {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!item) return [];
      
      const parsedPhotos = JSON.parse(item);
      // IMPORTANT: Convert timestamp strings back to Date objects
      return parsedPhotos.map((photo: any) => ({
        ...photo,
        timestamp: new Date(photo.timestamp),
      }));
    } catch (error) {
      console.error("Error reading from local storage", error);
      return [];
    }
  });

  // --- NEW EFFECT HOOK ---
  // This effect runs whenever `capturedPhotos` changes, saving it to local storage.
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(capturedPhotos));
    } catch (error) {
      console.error("Error writing to local storage", error);
    }
  }, [capturedPhotos]);

  const [activePhoto, setActivePhoto] = useState<CapturedPhoto | null>(null);

  const startCaptureProcess = (workType: string, location: string, imageDataUrl: string) => {
    const newPhoto: CapturedPhoto = {
      id: `photo_${Date.now()}`,
      url: imageDataUrl,
      workType,
      location,
      description: '',
      timestamp: new Date(),
      ...MOCK_METADATA,
    };
    setActivePhoto(newPhoto);
  };
  
  const savePhotoToBucket = (photoData: CapturedPhoto) => {
    const finalPhoto = {
        ...photoData,
        annotatedUrl: photoData.annotatedUrl || photoData.url
    };
    setCapturedPhotos(prevPhotos => [...prevPhotos, finalPhoto]);
    setActivePhoto(null);
  };

  const updateActivePhotoDescription = (description: string) => {
    if (activePhoto) {
        setActivePhoto({ ...activePhoto, description });
    }
  };

  const discardActivePhoto = () => {
    setActivePhoto(null);
  };

  const deletePhotoFromBucket = (photoId: string) => {
    setCapturedPhotos(photos => photos.filter(p => p.id !== photoId));
  }

  return { 
    capturedPhotos, 
    activePhoto, 
    startCaptureProcess,
    updateActivePhotoDescription,
    savePhotoToBucket,
    discardActivePhoto,
    deletePhotoFromBucket,
    setActivePhoto
  };
};