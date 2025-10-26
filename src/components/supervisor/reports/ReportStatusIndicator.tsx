// src/components/supervisor/reports/ReportStatusIndicator.tsx
import { useEffect, useState } from 'react';

interface ReportStatusIndicatorProps {
  status: 'processing' | 'success' | 'error';
  message: string;
}

export default function ReportStatusIndicator({ status, message }: ReportStatusIndicatorProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 0));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {status === 'processing' && (
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      )}
      {status === 'success' && (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <h3 className="text-xl font-semibold text-gray-800">{message}</h3>
      {status === 'processing' && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}