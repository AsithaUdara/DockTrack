// src/app/(manager)/layout.tsx
'use client';
import { useState } from 'react';
import Header from '@/components/shared/layout/Header';
import ManagerSidebar from '@/components/shared/layout/ManagerSidebar';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <ManagerSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area with left margin to account for sidebar on desktop */}
      <div className="md:ml-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}