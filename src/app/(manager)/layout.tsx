// src/app/(manager)/layout.tsx
'use client';
import { useState } from 'react';
import Header from '@/components/shared/layout/Header';
import Sidebar from '@/components/shared/layout/Sidebar';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* The Sidebar component is responsible for its own visibility and the overlay */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        {/* The Header gets the function to open the sidebar on mobile */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
