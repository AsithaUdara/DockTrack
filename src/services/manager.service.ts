// src/services/manager.service.ts

import { 
  mockProjects, 
  mockDashboardStats, 
  mockRecentActivities 
} from '@/data/mock-projects';
import { Project, DashboardStats, RecentActivity } from '@/types/project.types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ManagerService {
  static async getDashboardStats(): Promise<DashboardStats> {
    await delay(500);
    return mockDashboardStats;
  }

  static async getActiveProjects(): Promise<Project[]> {
    await delay(700);
    return mockProjects.filter(p => p.status === 'active');
  }

  static async getAllProjects(): Promise<Project[]> {
    await delay(700);
    return mockProjects;
  }

  static async getProjectById(id: string): Promise<Project | null> {
    await delay(400);
    return mockProjects.find(p => p.id === id) || null;
  }

  static async getRecentActivities(): Promise<RecentActivity[]> {
    await delay(500);
    return mockRecentActivities;
  }

  static async searchProjects(query: string): Promise<Project[]> {
    await delay(600);
    const lowercaseQuery = query.toLowerCase();
    return mockProjects.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.vesselName.toLowerCase().includes(lowercaseQuery) ||
      p.clientName.toLowerCase().includes(lowercaseQuery)
    );
  }

  static async filterProjectsByStatus(status: string): Promise<Project[]> {
    await delay(500);
    if (status === 'all') return mockProjects;
    return mockProjects.filter(p => p.status === status);
  }
}