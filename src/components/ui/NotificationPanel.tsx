// components/ui/NotificationPanel.tsx
import React from 'react';
import { Notification } from '@/data/mock-notifications'; // Adjust path as needed

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications }) => {
  const getIconAndColor = (type: Notification['type']) => {
    switch (type) {
      case 'report':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          bgColor: 'bg-blue-50',
        };
      case 'alert':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          bgColor: 'bg-red-50',
        };
      case 'update':
      default:
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0012 8V4m0 0L8 8m4-4L8 8m-6 8.5h.582M20 12l-2.482 1.489m0 0L15.518 12.001M17.518 12.001h-3.036m0 0L12 14.518m3.518-2.517v3.036m0 0L15.518 12.001" />
            </svg>
          ),
          bgColor: 'bg-green-50',
        };
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-80 md:w-96 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50">
      <div className="p-4 text-lg font-semibold text-gray-800 border-b">Notifications</div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((n) => {
            const { icon, bgColor } = getIconAndColor(n.type);
            return (
              <a
                key={n.id}
                href="#"
                className={`flex items-start p-4 hover:bg-gray-50 transition-colors ${n.unread ? 'bg-blue-50/50' : ''}`}
              >
                <div className={`p-2 rounded-full ${bgColor} mr-3 mt-1`}>
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm ${n.unread ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              </a>
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-500">No new notifications.</div>
        )}
      </div>
      <div className="p-2">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;