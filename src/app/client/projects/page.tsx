// src/app/client/projects/page.tsx
"use client";
import { useState } from "react";
import { mockClientProjects } from "@/data/mock-client-data";
import { ProjectStatus } from "@/types/client.types";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">(
    "All"
  );
  const [sortBy, setSortBy] = useState<"date" | "vessel">("date");

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "On Hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProjects = mockClientProjects
    .filter((project) => {
      const matchesSearch =
        project.vesselName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "vessel") {
        return a.vesselName.localeCompare(b.vesselName);
      }
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-1">
          Manage and track all your vessel repair projects
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by vessel name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ProjectStatus | "All")
            }
            className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "vessel")}
            className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="vessel">Sort by Vessel Name</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredProjects.length}</span> of{" "}
          <span className="font-semibold">{mockClientProjects.length}</span>{" "}
          projects
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/client/projects/${project.id}`}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            {/* Project Image */}
            <div className="relative h-48 bg-gray-200">
              <Image
                src={project.imageUrl}
                alt={project.vesselName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-800 transition-colors">
                {project.vesselName}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {project.projectName}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Project ID:</span>
                  <span className="font-semibold text-gray-900">
                    {project.projectId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phase:</span>
                  <span className="font-semibold text-gray-900">
                    {project.phase}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-semibold text-gray-900">
                    {project.dockNo}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-xs font-bold text-blue-800">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-800 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              {project.status === "In Progress" && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Days remaining:</span>
                  <span className="font-bold text-blue-800">
                    {project.remainingDays} days
                  </span>
                </div>
              )}

              {project.status === "Completed" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-green-700 font-semibold">
                    ✓ Completed
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No projects found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
