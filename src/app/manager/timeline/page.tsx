'use client';

import TimelineView from '@/components/shared/TimelineView';
import { mockTimelineTasks } from '@/data/mock-timeline-tasks';

export default function ManagerTimeline() {
  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting timeline...');
  };

  return <TimelineView tasks={mockTimelineTasks} onExport={handleExport} />;
}