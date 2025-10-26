"use client";

import { useState, useEffect } from 'react';
import { Type, Check, X } from 'lucide-react';

interface AnnotationTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export default function AnnotationTextModal({ isOpen, onClose, onSubmit }: AnnotationTextModalProps) {
  const [text, setText] = useState('Check this');

  useEffect(() => {
    if (isOpen) {
      setText('Check this');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    // --- THIS IS THE CORRECTED SECTION ---
    // We are adding `backdrop-blur-sm` and ensuring the background opacity is correct.
    // `bg-black/60` is Tailwind's syntax for black with 60% opacity.
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-center mb-4">
          <Type className="h-6 w-6 text-blue-700 mr-3" />
          <h2 className="text-lg font-bold text-gray-800">Enter Annotation Text</h2>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Enter the text you want to add to the photo.</p>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
          className="w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
        />

        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors flex items-center"
          >
            <Check className="mr-2 h-4 w-4" />
            OK
          </button>
        </div>
      </div>
    </div>
  );
}