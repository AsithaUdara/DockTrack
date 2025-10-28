// data/mock-notifications.ts

export interface Notification {
  id: number;
  message: string;
  time: string; // Could be a Date object in a real app
  type: 'report' | 'alert' | 'update';
  unread: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: 1,
    message: 'New daily report submitted for Santos Express',
    time: '1 hour ago',
    type: 'report',
    unread: true,
  },
  
  {
    id: 3,
    message: 'Report approved for SS Maritime Express',
    time: '1 day ago',
    type: 'update',
    unread: true,
  },
  
  {
    id: 5,
    message: 'System maintenance scheduled for 10 PM tonight',
    time: '3 days ago',
    type: 'update',
    unread: false,
  },
];

// The badge count (3 in your image) should match the number of unread notifications
export const unreadCount = mockNotifications.filter(n => n.unread).length;