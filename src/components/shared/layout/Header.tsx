// src/components/shared/layout/Header.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ApprovalNotificationReject from '@/components/ApprovalNotificationReject';
import ApprovalNotificationSuccess from '@/components/ApprovalNotificationSuccess';

interface HeaderProps {
  onMenuClick: () => void;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  link: string;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const notifications: Notification[] = [
    { id: 1, title: 'New Report submitted', description: 'MV Sea Princess - Day 12', link: '/approval-notification-success' },
    { id: 2, title: 'Report saved to draft', description: 'MV Ocean Star - Day 5', link: '/reports' },
    { id: 3, title: 'System Update', description: 'System will be updated tonight', link: '/updates' },
    { id: 4, title: 'Report rejected', description: 'MV Sea Princess - Day 12', link: '/approval-notification-rejected' },
    { id: 5, title: 'Task Assigned', description: 'A new task has been assigned for Supervisor Udara', link: '/tasks' },
    { id: 6, title: 'System Alert', description: 'Material Shortage', link: '/messages' },
    { id: 7, title: 'Report Ready for Revision', description: 'MV Pacific Dawn - Day 18Monthly report is ready', link: '/reports' },
    { id: 8, title: 'Profile Updated', description: 'New password has been stored', link: '/settings' },
    { id: 9, title: 'System Alert', description: 'Unusual login detected', link: '/settings' },
    { id: 10, title: '3 New Photos', description: 'Hull Welding, Deck Painting, Engine Inspection', link: '/capture' },
  ];

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  const handleNotificationClick = (link: string) => {
    setIsOpen(false);
    setShowAll(false);
    if (link === '/approval-notification-rejected') {
    setShowApprovalPopup(true);
  } else if (link === '/approval-notification-success') {
    // Show success popup only for the first notification
    const isFirstNotification = notifications[0].link === link;
    if (isFirstNotification) {
      setShowSuccessPopup(true);
    } else {
      router.push(link);
    }
  } else {
    router.push(link);
  }

  };

  useEffect(() => {
  const handleClose = () => setShowSuccessPopup(false);
  document.body.addEventListener('close-success-popup', handleClose);
  return () => document.body.removeEventListener('close-success-popup', handleClose);
}, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowAll(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-end h-16">
          {/* Hamburger Menu */}
          <button
            onClick={onMenuClick}
            className="md:hidden text-gray-500 hover:text-gray-800"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-4 relative">
            {/* Notification Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">3</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Centered Modal with Blurred Background */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div
            ref={modalRef}
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
