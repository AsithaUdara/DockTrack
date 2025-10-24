// src/services/reports.service.ts

import { mockDailyReports, mockReportDetails } from '@/data/mock-reports';
import { DailyReport, ReportDetail } from '@/types/report.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ReportsService {
  static async getDailyReports(projectId?: string): Promise<DailyReport[]> {
    await delay(600);
    if (projectId) {
      return mockDailyReports.filter(r => r.projectId === projectId);
    }
    return mockDailyReports;
  }

  static async getReportById(id: string): Promise<ReportDetail | null> {
    await delay(500);
    return mockReportDetails[id] || null;
  }

  static async getReportsByDateRange(startDate: string, endDate: string): Promise<DailyReport[]> {
    await delay(600);
    return mockDailyReports.filter(r => r.date >= startDate && r.date <= endDate);
  }

  static async getReportsByStatus(status: string): Promise<DailyReport[]> {
    await delay(500);
    if (status === 'all') return mockDailyReports;
    return mockDailyReports.filter(r => r.status === status);
  }

  static async searchReports(query: string): Promise<DailyReport[]> {
    await delay(600);
    const lowercaseQuery = query.toLowerCase();
    return mockDailyReports.filter(r => 
      r.reportId.toLowerCase().includes(lowercaseQuery) ||
      r.projectName.toLowerCase().includes(lowercaseQuery) ||
      r.supervisorName.toLowerCase().includes(lowercaseQuery)
    );
  }

  static async approveReport(id: string, comment: string): Promise<boolean> {
    await delay(800);
    console.log(`Report ${id} approved with comment: ${comment}`);
    return true;
  }

  static async rejectReport(id: string, reason: string): Promise<boolean> {
    await delay(800);
    console.log(`Report ${id} rejected with reason: ${reason}`);
    return true;
  }
}