'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/shared/layout/Header';
import Sidebar from '@/components/shared/layout/Sidebar';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide header and sidebar only on the manager timeline page
  const hideNav = pathname?.startsWith('/manager/timeline');

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNav && <Header onMenuClick={() => {}} />}
      <div className="flex">
        {!hideNav && <Sidebar isOpen={true} onClose={() => {}} />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}