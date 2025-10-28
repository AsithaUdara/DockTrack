"use client";

import { useState, useRef, useEffect } from 'react';
import { Camera, VideoOff } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (workType: string, location: string, imageDataUrl: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [workType, setWorkType] = useState('Hull Welding');
  const [location, setLocation] = useState('Drydock 2 - Port Side');
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Effect to start the camera stream when the component mounts
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        // Request access to the user's camera
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Prefer the rear camera on mobile
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera. Please check permissions and refresh the page.");
      }
    };

    startCamera();

    // Cleanup function to stop the stream when the component unmounts
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleCaptureClick = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Set canvas dimensions to match the video
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw the current video frame onto the canvas
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, width, height);

    // Get the image data from the canvas as a JPEG
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    
    // Pass all data up to the parent
    onCapture(workType, location, imageDataUrl);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="bg-black aspect-video rounded-lg flex items-center justify-center text-white relative overflow-hidden">
        {/* The live video feed will be displayed here */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        {/* Hidden canvas used for capturing the frame */}
        <canvas ref={canvasRef} className="hidden" />

        {error && (
            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center p-4">
                <VideoOff className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-400">{error}</p>
            </div>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Work Type</label>
          <select 
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option>Hull Welding</option>
            <option>Deck Painting</option>
            <option>Engine Inspection</option>
            <option>Structural Repair</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option>Drydock 2 - Port Side</option>
            <option>Bow Section</option>
            <option>Stern Section</option>
          </select>
        </div>
        <button
          onClick={handleCaptureClick}
          disabled={!!error} // Disable button if there's a camera error
          className="w-full flex items-center justify-center px-5 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Camera className="mr-2 h-5 w-5" />
          Capture
        </button>
      </div>
    </div>
  );
}