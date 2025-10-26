// src/app/(supervisor)/reports/status/page.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';

import ReportStatusIndicator from '@/components/supervisor/reports/ReportStatusIndicator';
import ReportSharingOptions from '@/components/supervisor/reports/ReportSharingOptions';

type ReportStatus = 'processing' | 'success' | 'error';

export default function ReportStatusPage() {
  const [status, setStatus] = useState<ReportStatus>('processing');
  const [reportId] = useState('report-123');
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Simple approach: Use jsPDF's built-in HTML rendering
      const pdf = new jsPDF('p', 'mm', 'a4');
      const element = reportRef.current;
      
      // Get the content as text and add it to PDF
      const content = element.innerText;
      const lines = pdf.splitTextToSize(content, 180);
      
      let y = 20;
      const lineHeight = 7;
      const pageHeight = 280;
      
      pdf.setFontSize(12);
      
      lines.forEach((line: string) => {
        if (y > pageHeight) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, 15, y);
        y += lineHeight;
      });
      
      pdf.save(`report-${reportId}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF. Please try printing instead.');
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return 'Report Submitted Successfully!';
      case 'error':
        return 'Failed to process report';
      default:
        return 'Processing Report...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div 
          ref={reportRef}
          data-report-content
          className="bg-white rounded-lg shadow-md p-6 print:p-4 print:shadow-none"
        >
          <ReportStatusIndicator 
            status={status} 
            message={getStatusMessage()} 
          />
          
          {status === 'success' && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Report ID: {reportId}
              </h2>
              <p className="text-gray-600">
                Your daily report has been processed and is now available.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 print:flex-col">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors print:bg-black"
                >
                  Print Report
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors print:hidden"
                >
                  Export to PDF
                </button>
              </div>
              
              <ReportSharingOptions
                reportId={reportId}
                reportTitle="Daily Report - MV Sea Princess"
                shareUrl={`https://yourapp.com/reports/${reportId}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}