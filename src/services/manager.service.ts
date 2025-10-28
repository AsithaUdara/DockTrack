// src/services/manager.service.ts
// Service layer for Manager Dashboard data operations

import { 
  mockProjects, 
  mockDashboardStats, 
  mockRecentActivities 
} from '@/data/mock-projects';
import { Project, DashboardStats, RecentActivity } from '@/types/project.types';

export class ManagerService {
  // Simulate API delay
  private static delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get dashboard statistics
  static async getDashboardStats(): Promise<DashboardStats> {
    await this.delay();
    return mockDashboardStats;
  }

  // Get all projects
  static async getAllProjects(): Promise<Project[]> {
    await this.delay();
    return mockProjects;
  }

  // Get only active projects (for dashboard)
  static async getActiveProjects(): Promise<Project[]> {
    await this.delay();
    return mockProjects.filter(p => p.projectStatus === 'active');
  }

  // Get project by ID
  static async getProjectById(id: string): Promise<Project | null> {
    await this.delay();
    const project = mockProjects.find(p => p.id === id);
    return project || null;
  }

  // Get projects by status
  static async getProjectsByStatus(status: string): Promise<Project[]> {
    await this.delay();
    return mockProjects.filter(p => p.status === status);
  }

  // Get projects with pending reports
  static async getProjectsWithPendingReports(): Promise<Project[]> {
    await this.delay();
    return mockProjects.filter(p => p.pendingReports > 0);
  }

  // Get recent activities
  static async getRecentActivities(): Promise<RecentActivity[]> {
    await this.delay();
    return mockRecentActivities;
  }

  // Get critical alerts
  static async getCriticalAlerts(): Promise<RecentActivity[]> {
    await this.delay();
    return mockRecentActivities.filter(a => a.type === 'alert');
  }

  // Get projects by manager
  static async getProjectsByManager(managerName: string): Promise<Project[]> {
    await this.delay();
    return mockProjects.filter(p => p.manager === managerName);
  }

  // Get projects by priority
  static async getProjectsByPriority(priority: string): Promise<Project[]> {
    await this.delay();
    return mockProjects.filter(p => p.priority === priority);
  }

  // Update project status
  static async updateProjectStatus(
    projectId: string, 
    status: 'On Track' | 'At Risk' | 'Delayed'
  ): Promise<boolean> {
    await this.delay();
    const project = mockProjects.find(p => p.id === projectId);
    if (project) {
      project.status = status;
      return true;
    }
    return false;
  }

  // Update project progress
  static async updateProjectProgress(
    projectId: string, 
    progress: number
  ): Promise<boolean> {
    await this.delay();
    const project = mockProjects.find(p => p.id === projectId);
    if (project) {
      project.progress = Math.min(100, Math.max(0, progress));
      return true;
    }
    return false;
  }
}