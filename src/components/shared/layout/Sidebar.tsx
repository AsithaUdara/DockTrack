// src/components/shared/layout/Sidebar.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { href: '/manager/dashboard', label: 'Dashboard', icon: (
      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
      </svg>
  )},
  { href: '/manager/projects', label: 'Projects', icon: (
      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
  )},
  { href: '/manager/reports', label: 'Reports', icon: (
      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M9 12h6m-6 4h6M6 20h12a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0010.586 2H6a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
  )},
  { href: '/manager/resources', label: 'Resources', icon: (
      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 010 5.656l-1.414 1.414a4 4 0 01-5.656-5.656l1.414-1.414m7.072-2.828a4 4 0 010 5.656l-1.414 1.414"/>
      </svg>
  )},
];

function NavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactElement }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2.5 my-1 rounded-lg text-sm font-medium transition-colors
      ${isActive ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      {icon}{label}
    </Link>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    onClose();
    router.push('/');
  };

  return (
    <>
      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Slide-in drawer (mobile only) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-lg
                    transform transition-transform duration-300 md:hidden
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Image src="/cdl-logo.png" alt="Colombo Dockyard PLC" width={150} height={37} />
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-800 rounded-full text-white font-bold flex items-center justify-center">M</div>
            <div className="ml-3">
              <p className="font-semibold text-gray-800">Manager</p>
              <p className="text-sm text-gray-500">manager@cdl.lk</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          {navItems.map((item) => <NavLink key={item.href} {...item} />)}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
