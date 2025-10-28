// src/components/shared/layout/ManagerSidebar.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

/* ---------------- Sidebar link ---------------- */
function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
        ${active ? 'bg-[#003d82] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

interface ManagerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
}

export default function ManagerSidebar({ 
  isOpen, 
  onClose,
  userName = 'Manager John Silva',
  userEmail = 'manager@cdl.lk'
}: ManagerSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const initials =
    (userName || '')
      .split(' ')
      .filter(Boolean)
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MJ';

  const handleLogout = () => {
    onClose();
    router.push('/');
  };

  // Determine active nav item based on current pathname
  const isActive = (path: string) => {
    if (path === '/manager-dashboard') {
      return pathname === '/manager-dashboard';
    }
    if (path === '/manager/reports') {
      return pathname.includes('/reports');
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className={`flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 md:translate-x-0 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      {/* Logo Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Image
            src="/cdl-logo.png"
            alt="Colombo Dockyard PLC"
            width={180}
            height={50}
            className="object-contain"
          />
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 md:hidden flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* User */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#003d82] text-white flex items-center justify-center font-semibold text-lg">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900 truncate">{userName}</p>
            <p className="text-sm text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavItem
          href="/manager-dashboard"
          label="Dashboard"
          active={isActive('/manager-dashboard')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        />
        <NavItem
          href="/manager/projects"
          label="Projects"
          active={isActive('/manager/projects')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
        />
        <NavItem
          href="/manager/reports"
          label="Reports"
          active={isActive('/manager/reports')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <NavItem
          href="/manager/resources"
          label="Resources"
          active={isActive('/manager/resources')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
