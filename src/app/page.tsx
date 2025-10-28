// src/app/page.tsx
'use client';

import { useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="relative h-screen w-full flex items-center justify-center text-white text-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-linear-to-br from-blue-900 via-blue-800 to-gray-900"
          style={{
            backgroundImage: 'url(/dockyard-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            DIGITAL DAILY WORK REPORT
          </h1>
          <h2 className="text-3xl md:text-5xl font-light text-gray-200 mt-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            & Progress Documentation System
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
            Streamlining operations for Colombo Dockyard PLC with real-time insights and enhanced project visibility.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 px-10 py-4 bg-blue-700 text-white font-bold text-lg uppercase rounded-md hover:bg-blue-800 transition-transform transform hover:scale-105 shadow-lg"
          >
            Access Portal
          </button>
        </div>
      </main>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}