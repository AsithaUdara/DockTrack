"use client";

import { useRef, useEffect, useState } from 'react';
// 1. Removed `Circle` from the import
import { ArrowUpRight, Type, Save, X } from 'lucide-react'; 
import { CapturedPhoto } from '@/hooks/usePhotoCapture';
import PhotoMetadata from './PhotoMetadata';
import AnnotationTextModal from './AnnotationTextModal';

// 2. Removed 'circle' from the Tool type
type Tool = 'arrow' | 'text';

interface PhotoAnnotationProps {
  photo: CapturedPhoto;
  onSave: (photoData: CapturedPhoto) => void;
  onCancel: () => void;
  onDescriptionChange: (description: string) => void;
}

export default function PhotoAnnotation({ photo, onSave, onCancel, onDescriptionChange }: PhotoAnnotationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [textCoords, setTextCoords] = useState({ x: 0, y: 0 });
  const [arrowStartPoint, setArrowStartPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = photo.url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [photo.url]);

  const drawArrow = (context: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
      const headlen = Math.max(15, context.canvas.width / 50);
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      context.moveTo(toX, toY);
      context.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !activeTool) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.strokeStyle = '#ef4444';
    ctx.fillStyle = '#ef4444';
    ctx.lineWidth = Math.max(5, canvas.width / 150);
    ctx.font = `bold ${Math.max(24, canvas.width / 30)}px Arial`;

    switch (activeTool) {
      case 'arrow':
        if (!arrowStartPoint) {
          setArrowStartPoint({ x, y });
          ctx.beginPath();
          ctx.arc(x, y, ctx.lineWidth, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.beginPath();
          drawArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, x, y);
          ctx.stroke();
          setArrowStartPoint(null);
          setActiveTool(null);
        }
        break;

      // 3. The 'circle' case has been removed from the switch statement

      case 'text':
        setTextCoords({ x, y });
        setIsTextModalOpen(true);
        break;
    }
  };
  
  const handleTextSubmit = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ef4444';
    ctx.font = `bold ${Math.max(24, canvas.width / 30)}px Arial`;
    ctx.fillText(text, textCoords.x, textCoords.y);
    
    setIsTextModalOpen(false);
    setActiveTool(null);
  };

  const handleToolSelect = (tool: Tool) => {
    setActiveTool(tool);
    setArrowStartPoint(null); 
  }

  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const annotatedImageDataUrl = canvas.toDataURL('image/jpeg');
    const finalPhotoData = { ...photo, annotatedUrl: annotatedImageDataUrl };
    onSave(finalPhotoData);
  };

  const ToolButton = ({ tool, icon: Icon, label }: { tool: Tool; icon: React.ElementType; label: string; }) => (
    <button
      onClick={() => handleToolSelect(tool)}
      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-md border transition-colors ${activeTool === tool ? 'bg-blue-100 border-blue-600 text-blue-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <>
      <AnnotationTextModal 
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        onSubmit={handleTextSubmit}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start animate-fade-in">
          <div>
              <div className="bg-black aspect-video rounded-lg overflow-hidden border">
                  <canvas 
                    ref={canvasRef} 
                    className={`w-full h-full ${activeTool ? 'cursor-crosshair' : 'cursor-default'}`} 
                    onClick={handleCanvasClick} 
                  />
              </div>
              {activeTool === 'arrow' && (
                <p className="text-center text-sm text-blue-700 mt-2 animate-pulse">
                    {arrowStartPoint ? 'Click on the image to set the arrow\'s END point.' : 'Click on the image to set the arrow\'s START point.'}
                </p>
              )}
              <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annotation Tools</label>
                  <div className="flex justify-center gap-3">
                      <ToolButton tool="arrow" icon={ArrowUpRight} label="Arrow" />
                      {/* 4. The ToolButton for the Circle has been removed */}
                      <ToolButton tool="text" icon={Type} label="Text" />
                  </div>
              </div>
          </div>

        <div className="space-y-4">
            <PhotoMetadata photo={photo} onDescriptionChange={onDescriptionChange} />
            <div className="flex space-x-3">
              <button onClick={handleSaveClick} className="flex-1 flex items-center justify-center px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
                  <Save className="mr-2 h-5 w-5" />
                  Save Annotated Photo
              </button>
              <button onClick={onCancel} className="flex-1 flex items-center justify-center px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <X className="mr-2 h-5 w-5" />
                  Cancel
              </button>
            </div>
        </div>
      </div>
    </>
  );
}