// src/app/client/projects/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { getClientProject, getProjectTimeline } from "@/data/mock-client-data";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = getClientProject(projectId);
  const timeline = getProjectTimeline(projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Project Not Found
          </h2>
          <Link
            href="/client/projects"
            className="text-blue-800 hover:underline mt-2 inline-block"
          >
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Projects
      </Link>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-blue-800 to-blue-900 text-white p-6">
          <h1 className="text-3xl font-bold">{project.vesselName}</h1>
          <p className="text-blue-100 mt-2">{project.projectName}</p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Project ID: {project.projectId}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {project.dockNo}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Progress</p>
              <p className="text-2xl font-bold text-blue-800">
                {project.progress}%
              </p>
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
              <p className="text-2xl font-bold text-green-800">
                {project.remainingDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      {timeline && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Project Timeline
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Milestones
              </h3>
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
                      <p className="font-semibold text-gray-900">
                        {milestone.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {milestone.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {milestone.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Daily Reports
              </h3>
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
                      <span className="text-lg font-bold text-blue-800">
                        {report.overallProgress}%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 text-xs">Man Hours</p>
                        <p className="font-semibold text-gray-900">
                          {report.manHours}h
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 text-xs">Photos</p>
                        <p className="font-semibold text-gray-900">
                          {report.photoCount}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600 text-xs">Tasks</p>
                        <p className="font-semibold text-gray-900">
                          {report.workCompleted.length}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
