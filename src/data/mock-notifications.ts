interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Report Submitted',
    message: 'A new daily progress report has been submitted for Project A',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    title: 'Timeline Updated',
    message: 'Project B timeline has been updated with new milestones',
    timestamp: '4 hours ago',
    read: false,
  },
  {
    id: '3',
    title: 'Issue Reported',
    message: 'New issue reported in Project C requiring immediate attention',
    timestamp: '1 day ago',
    read: true,
  },
];

export const unreadCount = mockNotifications.filter(n => !n.read).length;