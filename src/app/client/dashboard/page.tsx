// src/app/client/dashboard/page.tsx
"use client";
import { useState } from "react";
import {
  mockClientProjects,
  mockRecentActivities,
  getActiveProjects,
  getPendingProjects,
} from "@/data/mock-client-data";
import ChatBot from "@/components/client/dashboard/ChatBot";
import Link from "next/link";
import Image from "next/image";

const ProgressCircle = ({ progress }: { progress: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#1e40af"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-800">{progress}%</span>
      </div>
    </div>
  );
};

export default function ClientDashboard() {
  const activeProjects = getActiveProjects();
  const pendingProjects = getPendingProjects();
  const primaryProject = activeProjects[0] || mockClientProjects[0];
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return (
          <svg
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "photo":
        return (
          <svg
            className="h-5 w-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "report":
        return (
          <svg
            className="h-5 w-5 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Hero Section - Our Capabilities */}
        <div className="bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6 sm:p-8 pb-4">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Colombo Dockyard PLC
              </h1>
              <p className="text-blue-100 text-lg">
                Leading Maritime Innovation Since 1974
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Delivering World-Class Ship Repair & Advanced Marine Engineering
                Solutions
              </p>
            </div>

            {/* Capabilities Showcase */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
                Our Advanced Project Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hybrid Vessel Projects */}
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                      alt="Hybrid Vessel Conversion - Electric Propulsion System"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-white">
                          ECO-TECH
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">
                        Hybrid Vessel Conversion
                      </h3>
                      <p className="text-gray-200 text-xs">
                        Retrofitting traditional vessels with hybrid propulsion
                        systems
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5">
                    <ul className="space-y-1.5 text-xs text-blue-100">
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-green-400 shrink-0"
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
                        <span>Electric & diesel propulsion integration</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-green-400 shrink-0"
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
                        <span>Battery management systems</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-green-400 shrink-0"
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
                        <span>40% fuel consumption reduction</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Smart Vessel Projects */}
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
                      alt="Smart Vessel Technology - AI Navigation Bridge"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-white">
                          AI-POWERED
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">
                        Smart Vessel Integration
                      </h3>
                      <p className="text-gray-200 text-xs">
                        Next-generation navigation and automation systems
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5">
                    <ul className="space-y-1.5 text-xs text-blue-100">
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-blue-400 shrink-0"
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
                        <span>IoT sensor networks & monitoring</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-blue-400 shrink-0"
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
                        <span>
                          AI-assisted navigation & collision avoidance
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-blue-400 shrink-0"
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
                        <span>Real-time performance analytics</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Green Technology Projects */}
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80"
                      alt="Green Maritime Technology - Environmental Solutions"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-yellow-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-white">
                          CERTIFIED
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">
                        Green Maritime Solutions
                      </h3>
                      <p className="text-gray-200 text-xs">
                        Environmental compliance and emission control systems
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5">
                    <ul className="space-y-1.5 text-xs text-blue-100">
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-yellow-400 shrink-0"
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
                        <span>Ballast water treatment systems</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-yellow-400 shrink-0"
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
                        <span>Exhaust gas cleaning (scrubbers)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-yellow-400 shrink-0"
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
                        <span>IMO 2025 compliance upgrades</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Project Widget */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Current Project Highlight
            </h2>
            <p className="text-sm text-gray-600">
              Your primary vessel under service
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Image */}
              <div className="lg:col-span-1">
                <div className="relative h-48 lg:h-full rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={primaryProject.imageUrl}
                    alt={primaryProject.vesselName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        primaryProject.status
                      )}`}
                    >
                      {primaryProject.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {primaryProject.vesselName}
                  </h3>
                  <p className="text-gray-600">{primaryProject.projectName}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Project ID: {primaryProject.projectId}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <ProgressCircle progress={primaryProject.progress} />
                    <div>
                      <p className="text-sm text-gray-500">Overall Progress</p>
                      <p className="text-lg font-semibold text-gray-900">
                        Phase: {primaryProject.phase}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {primaryProject.dockNo}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Expected Completion:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {primaryProject.expectedEndDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">
                        Days Remaining:
                      </span>
                      <span className="text-lg font-bold text-blue-800">
                        {primaryProject.remainingDays} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Link
                    href={`/client/projects/${primaryProject.id}`}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
              <p className="text-sm text-gray-600">
                Latest updates from your projects
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockRecentActivities.slice(0, 5).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span>{activity.vesselName}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/client/projects"
                  className="text-sm font-semibold text-blue-800 hover:text-blue-900"
                >
                  View all projects →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Quick Stats</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Total Projects
                    </p>
                    <p className="text-3xl font-bold text-blue-900 mt-1">
                      {mockClientProjects.length}
                    </p>
                  </div>
                  <svg
                    className="h-12 w-12 text-blue-600 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-800 font-medium">
                      Completed
                    </p>
                    <p className="text-3xl font-bold text-green-900 mt-1">
                      {
                        mockClientProjects.filter(
                          (p) => p.status === "Completed"
                        ).length
                      }
                    </p>
                  </div>
                  <svg
                    className="h-12 w-12 text-green-600 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-linear-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">
                      In Progress
                    </p>
                    <p className="text-3xl font-bold text-yellow-900 mt-1">
                      {activeProjects.length}
                    </p>
                  </div>
                  <svg
                    className="h-12 w-12 text-yellow-600 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-800 font-medium">
                      Pending
                    </p>
                    <p className="text-3xl font-bold text-purple-900 mt-1">
                      {pendingProjects.length}
                    </p>
                  </div>
                  <svg
                    className="h-12 w-12 text-purple-600 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <ChatBot
        isOpen={chatbotOpen}
        onToggle={() => setChatbotOpen(!chatbotOpen)}
      />
    </>
  );
}
