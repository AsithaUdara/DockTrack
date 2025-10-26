// src/services/reports.service.ts
// Service layer for Reports management

import { mockReports } from '@/data/mock-reports';
import { Report } from '@/types/project.types';

export class ReportsService {
  // Simulate API delay
  private static delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all reports
  static async getAllReports(): Promise<Report[]> {
    await this.delay();
    return mockReports;
  }

  // Get report by ID
  static async getReportById(id: string): Promise<Report | null> {
    await this.delay();
    const report = mockReports.find(r => r.id === id);
    return report || null;
  }

  // Get reports by project ID
  static async getReportsByProjectId(projectId: string): Promise<Report[]> {
    await this.delay();
    return mockReports.filter(r => r.projectId === projectId);
  }

  // Get reports by status
  static async getReportsByStatus(status: string): Promise<Report[]> {
    await this.delay();
    return mockReports.filter(r => r.status === status);
  }

  // Get pending reports
  static async getPendingReports(): Promise<Report[]> {
    await this.delay();
    return mockReports.filter(r => r.status === 'Pending');
  }

  // Get reports by priority
  static async getReportsByPriority(priority: string): Promise<Report[]> {
    await this.delay();
    return mockReports.filter(r => r.priority === priority);
  }

  // Approve report
  static async approveReport(reportId: string): Promise<boolean> {
    await this.delay();
    const report = mockReports.find(r => r.id === reportId);
    if (report) {
      report.status = 'Approved';
      return true;
    }
    return false;
  }

  // Reject report
  static async rejectReport(reportId: string): Promise<boolean> {
    await this.delay();
    const report = mockReports.find(r => r.id === reportId);
    if (report) {
      report.status = 'Rejected';
      return true;
    }
    return false;
  }

  // Get report statistics
  static async getReportStats(): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  }> {
    await this.delay();
    return {
      total: mockReports.length,
      pending: mockReports.filter(r => r.status === 'Pending').length,
      approved: mockReports.filter(r => r.status === 'Approved').length,
      rejected: mockReports.filter(r => r.status === 'Rejected').length,
    };
  }
}