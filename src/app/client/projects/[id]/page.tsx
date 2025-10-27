"use client";
import { useParams } from "next/navigation";
import { getClientProject, getProjectTimeline } from "@/data/mock-client-data";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import type { DailyReportSummary } from "@/types/client.types";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = getClientProject(projectId);
  const timeline = getProjectTimeline(projectId);
  const [selectedReport, setSelectedReport] = useState<DailyReportSummary | null>(null);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
          <Link href="/client/projects" className="text-blue-800 hover:underline mt-2 inline-block">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/client/projects"
        className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
      >
        <svg
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-blue-800 to-blue-900 text-white p-6">
          <h1 className="text-3xl font-bold">{project.vesselName}</h1>
          <p className="text-blue-100 mt-2">{project.projectName}</p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">Project ID: {project.projectId}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{project.dockNo}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Progress</p>
              <p className="text-2xl font-bold text-blue-800">{project.progress}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className="font-semibold text-gray-900">{project.status}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Phase</p>
              <p className="font-semibold text-gray-900">{project.phase}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Days Remaining</p>
              <p className="text-2xl font-bold text-green-800">{project.remainingDays}</p>
            </div>
          </div>
        </div>
      </div>

      {timeline && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Milestones</h3>
              <div className="space-y-3">
                {timeline.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {milestone.completed ? (
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{milestone.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Reports</h3>
              <div className="space-y-4">
                {timeline.reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-5 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Day {report.dayOfProject} Report
                        </h4>
                        <p className="text-sm text-gray-600">{report.date}</p>
                      </div>
                      <span className="text-lg font-bold text-blue-800">{report.overallProgress}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 text-xs">Man Hours</p>
                        <p className="font-semibold text-gray-900">{report.manHours}h</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 text-xs">Photos</p>
                        <p className="font-semibold text-gray-900">{report.photoCount}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 text-xs">Tasks</p>
                        <p className="font-semibold text-gray-900">{report.workCompleted.length}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors font-medium text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Day {selectedReport.dayOfProject} - Daily Report
                </h2>
                <p className="text-gray-600 mt-1">{selectedReport.date}</p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Progress Overview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">Overall Progress</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{selectedReport.overallProgress}%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">Man Hours</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">{selectedReport.manHours}h</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">Photos Taken</p>
                  <p className="text-3xl font-bold text-purple-900 mt-1">{selectedReport.photoCount}</p>
                </div>
              </div>

              {/* Before & After Comparison */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">📸 Before & After Comparison</h3>
                <div className="space-y-6">
                  {/* Day 16 - Hull Painting & Deck Surface */}
                  {selectedReport.dayOfProject === 16 && (
                    <>
                      {/* Hull Painting Work */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">
                            Hull Painting
                          </span>
                          Anti-fouling paint application completed
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Before Painting</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src="https://images.unsplash.com/photo-1649710146680-516091f9eb09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U2hpcCUyMGh1bGwlMjBmcmVzaGx5JTIwcGFpbnRlZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Ship hull paint brushes and area before painting"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                BEFORE
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">After Painting</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-green-500">
                              <Image
                                src="https://images.unsplash.com/photo-1604930270269-67876a4cbe4a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcCUyMGh1bGwlMjBmcmVzaGx5JTIwcGFpbnRlZHxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Ship hull freshly painted"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AFTER
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Deck Surface Work */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-2">
                            Deck Surface
                          </span>
                          Deck cleaning and coating preparation
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Before Cleaning</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src="https://images.unsplash.com/photo-1652538182371-5ee50bf0e9a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcCUyMHBhaW50aW5nfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600"
                                alt="Boat deck being cleaned before preparation"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                BEFORE
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">After Cleaning</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-green-500">
                              <Image
                                src="https://images.unsplash.com/photo-1586847145307-1ee202251ea2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcCUyMGRlY2t8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Clean and prepared boat deck surface"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AFTER
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Day 15 - Hull Cleaning & Welding */}
                  {selectedReport.dayOfProject === 15 && (
                    <>
                      {/* Hull Cleaning */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">
                            Hull Cleaning
                          </span>
                          Complete hull cleaning and surface preparation
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Before Cleaning</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src="https://images.unsplash.com/photo-1708023987502-476c3db22373?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpcCUyMGh1bGwlMjBjbGVhbmluZ3xlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Dirty ship hull needing cleaning"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                BEFORE
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">After Cleaning</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-green-500">
                              <Image
                                src="https://images.unsplash.com/photo-1663674672961-bb3fcdbccd60?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNoaXAlMjBodWxsJTIwY2xlYW5pbmd8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Clean ship hull surface ready for work"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AFTER
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Welding Work */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs mr-2">
                            Welding
                          </span>
                          Port side welding work completed
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Before Welding</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src="https://images.unsplash.com/photo-1701952711272-ec97bb9cf95d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcCUyMHdlbGRpbmd8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Ship hull area needing welding repairs"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                BEFORE
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">After Welding</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-green-500">
                              <Image
                                src="https://images.unsplash.com/photo-1753526372227-98810761b11a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcCUyMHdlbGRpbmd8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Completed welding work with fresh welds"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AFTER
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Day 14 - Hull Plate Replacement & Electrical Wiring & Deck Surface Prep */}
                  {selectedReport.dayOfProject === 14 && (
                    <>
                      {/* Hull Plate Replacement */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs mr-2">
                            Plate Replacement
                          </span>
                          Hull plate replacement - Section A4
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Damaged Section</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src="https://images.unsplash.com/photo-1725624515903-c195ef74d749?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGFtYWdlZCUyMHNoaXAlMjBodWxsJTIwcGxhdGV8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Damaged ship hull plate needing replacement"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                BEFORE
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">New Plate Installed</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-green-500">
                              <Image
                                src="https://images.unsplash.com/photo-1609385509820-54f4a8cdc65e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE5ldyUyMHN0ZWVsJTIwcGxhdGUlMjBzaGlwJTIwaHVsbCUyMHBsYXRlfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600"
                                alt="New steel plate welded and installed"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AFTER
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Electrical Wiring */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-2">
                            Electrical
                          </span>
                          Electrical wiring inspection and upgrades
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Old Wiring</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src="https://images.unsplash.com/photo-1729074604033-c3bb8388b7e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNoaXAlMjBFbGVjdHJpY2FsJTIwd2lyaW5nfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600"
                                alt="Ship electrical panel before upgrades"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                BEFORE
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Updated System</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-green-500">
                              <Image
                                src="https://images.unsplash.com/photo-1741762700232-2b7a6aac4557?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNoaXAlMjBFbGVjdHJpY2FsJTIwd2lyaW5nfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600"
                                alt="Modern ship electrical system installed"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AFTER
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Deck Surface Preparation */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">
                            Surface Prep
                          </span>
                          Deck surface preparation for coating
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Unprepared Surface</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src="https://images.unsplash.com/photo-1675671509844-6a5b8eea1a01?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNoaXAlMjBEZWNrJTIwc3VyZmFjZSUyMHByZXBhcmF0aW9uJTIwZm9yJTIwY29hdGluZ3xlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Boat deck before surface preparation"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                BEFORE
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Prepared Surface</p>
                            <div className="relative h-56 rounded-lg overflow-hidden border-2 border-green-500">
                              <Image
                                src="https://images.unsplash.com/photo-1703174360085-cd1627be78f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNoaXAlMjBEZWNrJTIwc3VyZmFjZSUyMHByZXBhcmF0aW9uJTIwZm9yJTIwY29hdGluZ3xlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=600"
                                alt="Boat deck surface prepared and ready"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AFTER
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Work Completed */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">✅ Work Completed</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedReport.workCompleted.map((work, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{work}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Materials Used */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔧 Materials Used</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedReport.materialsUsed.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded border border-gray-200"
                      >
                        <span className="font-medium text-gray-900">{material.name}</span>
                        <span className="text-sm text-gray-600">
                          {material.quantity} {material.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tomorrow's Plan */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">📋 Tomorrow&apos;s Plan</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedReport.tomorrowPlan.map((plan, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2 mt-0.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span className="text-gray-700">{plan}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Supervisor Info */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Supervised by:</span> {selectedReport.supervisorName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


