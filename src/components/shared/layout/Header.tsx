// src/components/shared/layout/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  link: string;
}

// Small placeholder popup components (declare outside to avoid recreating during render)
const ApprovalNotificationReject = () => (
  <div className="bg-white p-6 rounded shadow-lg w-96">
    <h3 className="text-lg font-bold text-gray-800">Approval - Reject</h3>
    <p className="text-sm text-gray-600 mt-2">Reject the selected notification/approval request.</p>
  </div>
);

const ApprovalNotificationSuccess = () => (
  <div className="bg-white p-6 rounded shadow-lg w-96">
    <h3 className="text-lg font-bold text-gray-800">Approval - Success</h3>
    <p className="text-sm text-gray-600 mt-2">The approval completed successfully.</p>
  </div>
);

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Modal & notification panel state/ref
  const [showAll, setShowAll] = useState(false);

  // Popup states for approval flows
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Sample notifications (can be replaced with real data)
  const notifications: Notification[] = [
    { id: 1, title: 'New report added', description: 'A new daily report was submitted by Team A', link: '/reports/1' },
    { id: 2, title: 'Pending photos', description: '3 new photos await approval', link: '/photos/pending' },
    { id: 3, title: 'System update', description: 'System maintenance scheduled at 02:00 AM', link: '/settings' },
    { id: 4, title: 'Crew change', description: 'Crew changes updated for Dock B3', link: '/projects' },
    { id: 5, title: 'Material request', description: 'Material request #123 needs review', link: '/materials/123' },
    { id: 6, title: 'Safety alert', description: 'Minor safety alert reported', link: '/safety' },
  ];

  const displayedNotifications = showAll ? notifications : notifications.slice(0, Math.min(5, notifications.length));

  const handleNotificationClick = (link: string) => {
    // Navigate to link in browser, guard for SSR environment
    if (typeof window !== 'undefined') {
      try {
        window.location.assign(link);
      } catch (e) {
        console.warn('Navigation failed', e);
      }
    }
  };

  // (Approval popup components are declared above to avoid recreate-on-render)

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-end h-16">

          {/* Hamburger menu */}
          <button
            onClick={onMenuClick}
            className="md:hidden text-gray-500 hover:text-gray-800"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-4" ref={notifRef}>
            
            {/* Notification Button */}
            <button
              onClick={() => setShowNotifications((p) => !p)}
              className="relative p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                3
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Dropdown panel */}
                  {showNotifications && (
                    <div
                      className="absolute right-4 top-16 w-72 bg-white border rounded-lg shadow-lg p-4 z-50
                       origin-top animate-[fadeIn_0.15s_ease-out]"
                    >
                      <ul className="space-y-2 text-sm list-disc pl-5">
                        <li className="text-gray-800">New report added</li>
                        <li className="text-gray-800">Pending approval: 3 new photos</li>
                        <li className="text-gray-800">System update scheduled</li>
                      </ul>
                      <div className="mt-3 text-right">
                        <button
                          onClick={() => { setShowAll(true); setShowNotifications(false); }}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  )}


          </div>
        </div>
      </div>

      {/* Centered Modal with Blurred Background */}
      {showAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300
              flex flex-col
              ${showAll ? 'w-3/4 max-h-[80vh]' : 'w-96 max-h-[60vh]'}`}
          >
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            </div>
            <div className="overflow-y-auto flex-1 px-4 py-2 space-y-1">
              {displayedNotifications.map((notif, index) => (
                <button
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.link)}
                  className="w-full text-left px-2 py-3 hover:bg-gray-50 flex items-start space-x-2 rounded-md"
                >
                  <div className="flex items-start space-x-2">
                    {/* Bullet for first 3 notifications */}
                    {index < 3 && <span className="mt-1 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />}
                    <div className="flex flex-col">
                      <p className={`text-gray-800 ${index < 3 ? 'font-bold' : 'font-normal'}`}>{notif.title}</p>
                      <p className={`text-sm text-gray-600 ${index < 3 ? 'font-semibold' : 'font-normal'}`}>{notif.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 p-3 flex-shrink-0 text-center bg-white">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 font-medium hover:underline"
              >
                {showAll ? 'Show Less' : `View More (${notifications.length - 5} more)`}
              </button>
            </div>
          </div>
        </div>
      )}

{showApprovalPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="relative">
      <ApprovalNotificationReject />
      <button
        onClick={() => setShowApprovalPopup(false)}
        className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}

{showSuccessPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="relative">
      <ApprovalNotificationSuccess />
      <button
        onClick={() => setShowSuccessPopup(false)}
        className="absolute top-2 right-2 text-white bg-green-600 px-3 py-1 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
    </header>
  );
}
