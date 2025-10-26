// src/components/supervisor/reports/forms/Section6_QualityControl.tsx
import { useState } from 'react';

export default function Section6_QualityControl() {
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 6: Quality Control</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Quality Control Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter quality control observations..."
          className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          rows={4}
        />
      </div>
    </div>
  );
}