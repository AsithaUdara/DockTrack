'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for the daily work report
const mockTableData = [
  { 
    date: '2025-10-24', 
    vessel: 'MV Ocean Carrier', 
    dockLocation: 'Dock A1', 
    day: '6th Day',
    weather: 'Sunny',
    workCompleted: 'Welded joints in ballast tank section A, Applied primer coat to hull',
    taskTags: ['Welders', 'Painting'],
    workArea: 'Hull Section A',
    manHours: { welders: 24, painting: 16, fitting: 8, cables: 4 },
    totalManHours: 52,
    issue: { severity: 'No Issue', category: '', description: '', resolutionTime: 0, hasPhotos: false }
  },
  { 
    date: '2025-10-24', 
    vessel: 'MV Lanka Express', 
    dockLocation: 'Dock B3', 
    day: '3rd Day',
    weather: 'Cloudy',
    workCompleted: 'Installed electrical cables, Fitted navigation equipment',
    taskTags: ['Cables', 'Fitting'],
    workArea: 'Bridge Section',
    manHours: { welders: 0, painting: 0, fitting: 20, cables: 32 },
    totalManHours: 52,
    issue: { severity: 'Minor', category: 'Electrical', description: 'Minor wiring issue in navigation panel', resolutionTime: 2, hasPhotos: true }
  },
  { 
    date: '2025-10-24', 
    vessel: 'MV Pearl Trader', 
    dockLocation: 'Dock C2', 
    day: '8th Day',
    weather: 'Rainy',
    workCompleted: 'Completed hull painting, Installed safety equipment',
    taskTags: ['Painting', 'Fitting'],
    workArea: 'Hull Complete',
    manHours: { welders: 12, painting: 28, fitting: 16, cables: 8 },
    totalManHours: 64,
    issue: { severity: 'No Issue', category: '', description: '', resolutionTime: 0, hasPhotos: false }
  },
  { 
    date: '2025-10-24', 
    vessel: 'MV Colombo Star', 
    dockLocation: 'Dock A4', 
    day: '2nd Day',
    weather: 'Sunny',
    workCompleted: 'Started welding operations, Prepared work area',
    taskTags: ['Welders'],
    workArea: 'Engine Room',
    manHours: { welders: 32, painting: 0, fitting: 8, cables: 0 },
    totalManHours: 40,
    issue: { severity: 'Critical', category: 'Safety', description: 'Safety equipment malfunction detected', resolutionTime: 4, hasPhotos: true }
  },
];

export default function DailyReportPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Calculate summary data
  const totalVessels = mockTableData.length;
  const totalManHours = mockTableData.reduce((sum, row) => sum + row.totalManHours, 0);
  const activeIssues = mockTableData.filter((row) => row.issue.severity !== 'No Issue').length;
  const totalWorkAreas = new Set(mockTableData.map(row => row.workArea)).size;

  // Chart data - Man-hours by trade
  const barData = {
    labels: ['Welders', 'Painting', 'Fitting', 'Cables'],
    datasets: [
      {
        label: 'Man-Hours',
        data: [
          mockTableData.reduce((sum, row) => sum + row.manHours.welders, 0),
          mockTableData.reduce((sum, row) => sum + row.manHours.painting, 0),
          mockTableData.reduce((sum, row) => sum + row.manHours.fitting, 0),
          mockTableData.reduce((sum, row) => sum + row.manHours.cables, 0),
        ],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(96, 165, 250, 0.8)',
          'rgba(147, 197, 253, 0.8)',
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(96, 165, 250, 1)',
          'rgba(147, 197, 253, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data - Task categories distribution
  const pieData = {
    labels: ['Welders', 'Painting', 'Fitting', 'Cables'],
    datasets: [
      {
        data: [
          mockTableData.reduce((sum, row) => sum + row.manHours.welders, 0),
          mockTableData.reduce((sum, row) => sum + row.manHours.painting, 0),
          mockTableData.reduce((sum, row) => sum + row.manHours.fitting, 0),
          mockTableData.reduce((sum, row) => sum + row.manHours.cables, 0),
        ],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(96, 165, 250, 0.8)',
          'rgba(147, 197, 253, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // PDF Export Function
  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    setIsExporting(true);

    try {
      // Use html-to-image instead of html2canvas to avoid CSS parsing issues
      const dataUrl = await htmlToImage.toPng(reportRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        filter: () => {
          // Ensure all content is included
          return true;
        },
      });

      // Create an image element to get dimensions
      const img = new window.Image();
      img.src = dataUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create PDF
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
        orientation: 'portrait',
      });

      // A4 dimensions in mm
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const pdfWidth = pageWidth - margin * 2;

      // Calculate image height to maintain aspect ratio
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Always use multi-page handling for better content preservation
        let remainingHeight = imgHeight;
        const pageHeightPx = (imgWidth * (pageHeight - margin * 2)) / pdfWidth;
        let position = 0;
      let pageCount = 0;

      while (remainingHeight > 0 && pageCount < 10) { // Limit to 10 pages to prevent infinite loops
          const canvasPage = document.createElement('canvas');
          canvasPage.width = imgWidth;
          canvasPage.height = Math.min(pageHeightPx, remainingHeight);

          const ctx = canvasPage.getContext('2d');
          if (!ctx) break;

          // Draw the slice from the image
          ctx.drawImage(
            img,
            0,
            position,
            imgWidth,
            canvasPage.height,
            0,
            0,
            imgWidth,
            canvasPage.height
          );

          const pageData = canvasPage.toDataURL('image/png');
          const pageImgHeightMm = (canvasPage.height * pdfWidth) / imgWidth;

          pdf.addImage(pageData, 'PNG', margin, margin, pdfWidth, pageImgHeightMm);

          remainingHeight -= canvasPage.height;
          position += canvasPage.height;
        pageCount++;

          if (remainingHeight > 0) {
            pdf.addPage();
        }
      }

      // Generate filename with date
      const fileName = `Port_Authority_Daily_Report_${selectedDate}.pdf`;
      pdf.save(fileName);

      alert(`PDF exported successfully! ✅ (${pageCount} pages)`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-6">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Custom Report Generator</h1>
        <p className="text-gray-600 mt-1">Generate and export customized daily reports</p>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Panel - Filters */}
  <div className="w-1/3 pr-4 flex-shrink-0 flex flex-col h-full">
  <div className="bg-white shadow-2xl rounded-xl p-8 my-4 border border-gray-100 h-full overflow-y-auto flex flex-col justify-start">
          <h2 className="text-xl font-bold text-black mb-6">
            Report Filters
          </h2>

          <div className="space-y-4">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>

            {/* Department Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                <option>All Departments</option>
                <option>Cargo Operations</option>
                <option>Vessel Management</option>
                <option>Dock Services</option>
              </select>
            </div>

            {/* Report Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                <option>Daily Summary</option>
                <option>Detailed Report</option>
                <option>Operations Only</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="pt-4">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export to PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Report Preview */}
      <div className="w-2/3 pl-2 overflow-y-auto flex justify-center items-start">
        <div
          ref={reportRef}
          className="w-[210mm] bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-xl p-8 my-4 border border-gray-100"
          id="report-preview"
          style={{ pageBreakInside: 'auto' }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 pb-6 border-b-2 border-gradient-to-r from-blue-200 to-purple-200">
            <Image
              src="/logo.png"
              alt="Port Authority Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-black">
                Port Authority Daily Report
              </h1>
              <p className="text-gray-600 mt-1">
                Date: {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Active Vessels</div>
              <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mt-2">{totalVessels}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">Total Man-Hours</div>
              <div className="text-3xl font-bold bg-gradient-to-br from-green-600 to-green-800 bg-clip-text text-transparent mt-2">{totalManHours}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Work Areas</div>
              <div className="text-3xl font-bold bg-gradient-to-br from-orange-600 to-orange-800 bg-clip-text text-transparent mt-2">{totalWorkAreas}</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xs font-semibold text-red-600 uppercase tracking-wide">Active Issues</div>
              <div className="text-3xl font-bold bg-gradient-to-br from-red-600 to-red-800 bg-clip-text text-transparent mt-2">{activeIssues}</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                Man-Hours by Trade
              </h3>
              <div className="h-48">
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                Task Categories Distribution
              </h3>
              <div className="h-48">
                <Pie data={pieData} options={{ ...chartOptions, plugins: { legend: { display: true, position: 'bottom' } } }} />
              </div>
            </div>
          </div>

          {/* Daily Work Report Table */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Daily Work Report
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
              <table className="w-full border-collapse bg-white/80 backdrop-blur-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100 to-purple-100 border-b-2 border-blue-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-800">Vessel</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-800">Dock</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-800">Day</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-800">Weather</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-800">Work Area</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-800">Man-Hours</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-800">Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTableData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 px-4 text-gray-900 font-medium">{row.vessel}</td>
                      <td className="py-3 px-4 text-gray-600">{row.dockLocation}</td>
                      <td className="py-3 px-4 text-gray-600">{row.day}</td>
                      <td className="py-3 px-4 text-gray-600">{row.weather}</td>
                      <td className="py-3 px-4 text-gray-600">{row.workArea}</td>
                      <td className="py-3 px-4 text-gray-900 font-medium">{row.totalManHours}</td>
                      <td className="py-3 px-4">
                        {row.issue.severity !== 'No Issue' ? (
                          <div className="text-sm">
                            <div className={`font-semibold px-2 py-1 rounded-md inline-block ${
                              row.issue.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                              row.issue.severity === 'Minor' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600'
                            }`}>
                              {row.issue.severity}
                            </div>
                            <div className="text-gray-500 mt-1">{row.issue.category}</div>
                          </div>
                        ) : (
                          <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-md inline-block">✓ No Issues</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Work Details Section */}
          <div className="mt-6" style={{ pageBreakInside: 'auto', display: 'block', visibility: 'visible' }}>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Work Details & Issues
            </h3>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-4 shadow-sm">
              <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
                <span className="text-lg">📋</span>
                Detailed work information for each vessel
              </p>
            </div>
            <div className="space-y-3" style={{ display: 'block', visibility: 'visible' }}>
              {mockTableData.map((row, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {row.vessel} - {row.workArea}
                      </h4>
                      <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                        <strong className="text-gray-900">Work:</strong> {row.workCompleted}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {row.taskTags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs px-2.5 py-1 rounded-lg font-medium shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-700 bg-gray-50 px-2 py-1.5 rounded-lg">
                        <strong className="text-gray-900">Man-Hours:</strong> W:{row.manHours.welders} P:{row.manHours.painting} F:{row.manHours.fitting} C:{row.manHours.cables}
                      </div>
                    </div>
                    <div>
                      {row.issue.severity !== 'No Issue' ? (
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-3 shadow-sm">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`px-2.5 py-1 text-xs rounded-lg font-bold shadow-sm ${
                              row.issue.severity === 'Critical' ? 'bg-red-200 text-red-900' : 
                              'bg-yellow-200 text-yellow-900'
                            }`}>
                              {row.issue.severity}
                            </span>
                            <span className="text-xs text-gray-700 font-medium">{row.issue.category}</span>
                          </div>
                          <p className="text-xs text-gray-800 mb-1.5 leading-relaxed">{row.issue.description}</p>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="font-medium">Est. Resolution:</span> {row.issue.resolutionTime}h {row.issue.hasPhotos && '📷'}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 shadow-sm">
                          <span className="text-xs text-green-800 font-bold flex items-center gap-1">
                            <span className="text-base">✓</span> No Issues Reported
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200 flex justify-between items-center text-sm text-gray-600">
            <div>Generated by Port Authority CIT System</div>
            <div className="flex items-center gap-2">
              <span>Authorized Signature:</span>
              <div className="border-b border-gray-400 w-40"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}