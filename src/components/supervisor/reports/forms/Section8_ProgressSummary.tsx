// src/components/supervisor/reports/forms/Section8_ProgressSummary.tsx
import { useState } from 'react';
import { mockProgressSummary } from '@/data/mock-daily-activity';

export default function Section8_ProgressSummary() {
  const [summary, setSummary] = useState(mockProgressSummary.summary);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 8: Progress Summary</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter progress summary..."
          className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          rows={4}
        />
      </div>
    </div>
  );
}