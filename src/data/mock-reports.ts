// src/data/mock-reports.ts
// Mock data for Manager Reports

import { Report } from '@/types/project.types';

export const mockReports: Report[] = [
  {
    id: 'rep-001',
    projectId: 'proj-001',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    reportType: 'Daily Progress Report',
    submittedBy: 'Supervisor Kamal Perera',
    submittedDate: '2025-10-24',
    status: 'Pending',
    priority: 'high',
    description: 'Hull welding completed. Electrical work in progress. Need approval for additional materials.'
  },
  {
    id: 'rep-002',
    projectId: 'proj-001',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    reportType: 'Safety Incident Report',
    submittedBy: 'Safety Officer Nimal Silva',
    submittedDate: '2025-10-23',
    status: 'Pending',
    priority: 'high',
    description: 'Minor injury reported. Worker slipped on wet deck. First aid administered. Investigating further.'
  },
  {
    id: 'rep-003',
    projectId: 'proj-001',
    projectName: 'MV Ocean Voyager - Repair & Maintenance',
    reportType: 'Material Request',
    submittedBy: 'Supervisor Kamal Perera',
    submittedDate: '2025-10-22',
    status: 'Pending',
    priority: 'medium',
    description: 'Additional steel plates required for hull repair. Estimated 500kg needed.'
  },
  {
    id: 'rep-004',
    projectId: 'proj-002',
    projectName: 'SS Maritime Express - Hull Inspection',
    reportType: 'Inspection Report',
    submittedBy: 'Inspector Rajesh Kumar',
    submittedDate: '2025-10-24',
    status: 'Pending',
    priority: 'high',
    description: 'Hull inspection reveals corrosion in sections 3 and 4. Recommend immediate attention.'
  },
  {
    id: 'rep-005',
    projectId: 'proj-003',
    projectName: 'Container Ship Alpha - Engine Overhaul',
    reportType: 'Weekly Progress Report',
    submittedBy: 'Supervisor Anil Fernando',
    submittedDate: '2025-10-23',
    status: 'Pending',
    priority: 'medium',
    description: 'Engine disassembly completed. Parts cleaning in progress. On schedule for reassembly next week.'
  },
  {
    id: 'rep-006',
    projectId: 'proj-003',
    projectName: 'Container Ship Alpha - Engine Overhaul',
    reportType: 'Quality Control Report',
    submittedBy: 'QC Officer Priya Mendis',
    submittedDate: '2025-10-22',
    status: 'Pending',
    priority: 'high',
    description: 'Quality inspection of engine components completed. 2 parts need replacement.'
  },
  {
    id: 'rep-007',
    projectId: 'proj-005',
    projectName: 'Cargo Vessel Beta - Structural Repairs',
    reportType: 'Delay Notification',
    submittedBy: 'Supervisor Chaminda Dias',
    submittedDate: '2025-10-24',
    status: 'Pending',
    priority: 'high',
    description: 'Project delayed by 3 days due to bad weather conditions. Requesting deadline extension.'
  },
  {
    id: 'rep-008',
    projectId: 'proj-005',
    projectName: 'Cargo Vessel Beta - Structural Repairs',
    reportType: 'Daily Progress Report',
    submittedBy: 'Supervisor Chaminda Dias',
    submittedDate: '2025-10-23',
    status: 'Pending',
    priority: 'medium',
    description: 'Structural welding 60% complete. Painting to begin after welding inspection.'
  },
  {
    id: 'rep-009',
    projectId: 'proj-005',
    projectName: 'Cargo Vessel Beta - Structural Repairs',
    reportType: 'Resource Request',
    submittedBy: 'Supervisor Chaminda Dias',
    submittedDate: '2025-10-22',
    status: 'Pending',
    priority: 'medium',
    description: 'Need 5 additional welders for 3 days to meet revised deadline.'
  },
  {
    id: 'rep-010',
    projectId: 'proj-005',
    projectName: 'Cargo Vessel Beta - Structural Repairs',
    reportType: 'Safety Inspection',
    submittedBy: 'Safety Officer Lakshman Perera',
    submittedDate: '2025-10-21',
    status: 'Pending',
    priority: 'high',
    description: 'Safety equipment check completed. All scaffolding secure. Recommend daily inspections.'
  },
  {
    id: 'rep-011',
    projectId: 'proj-005',
    projectName: 'Cargo Vessel Beta - Structural Repairs',
    reportType: 'Material Delivery Confirmation',
    submittedBy: 'Logistics Officer Sunil Jayasinghe',
    submittedDate: '2025-10-20',
    status: 'Pending',
    priority: 'low',
    description: 'Steel plates and welding materials delivered. Stored in warehouse B.'
  },
  {
    id: 'rep-012',
    projectId: 'proj-006',
    projectName: 'MV Atlantic Star - Propeller Replacement',
    reportType: 'Progress Update',
    submittedBy: 'Supervisor Asanka Silva',
    submittedDate: '2025-10-24',
    status: 'Pending',
    priority: 'medium',
    description: 'Old propeller removed successfully. New propeller installation scheduled for tomorrow.'
  },
  {
    id: 'rep-013',
    projectId: 'proj-007',
    projectName: 'Tanker Ship Gamma - Tank Cleaning',
    reportType: 'Environmental Report',
    submittedBy: 'Environmental Officer Dilini Fernando',
    submittedDate: '2025-10-23',
    status: 'Pending',
    priority: 'high',
    description: 'Tank cleaning waste disposal completed as per environmental regulations. Certificates attached.'
  },
  {
    id: 'rep-014',
    projectId: 'proj-007',
    projectName: 'Tanker Ship Gamma - Tank Cleaning',
    reportType: 'Daily Progress Report',
    submittedBy: 'Supervisor Nuwan Bandara',
    submittedDate: '2025-10-22',
    status: 'Pending',
    priority: 'medium',
    description: 'Tanks 1-3 cleaning completed. Tank 4 cleaning in progress. Inspection scheduled for tomorrow.'
  },
  {
    id: 'rep-015',
    projectId: 'proj-008',
    projectName: 'MV Indian Ocean - Electrical System Upgrade',
    reportType: 'Risk Assessment',
    submittedBy: 'Electrical Engineer Rohan Wijewardena',
    submittedDate: '2025-10-24',
    status: 'Pending',
    priority: 'high',
    description: 'Identified potential electrical hazards in old wiring. Recommend immediate replacement before proceeding.'
  },
  {
    id: 'rep-016',
    projectId: 'proj-008',
    projectName: 'MV Indian Ocean - Electrical System Upgrade',
    reportType: 'Material Request',
    submittedBy: 'Electrical Engineer Rohan Wijewardena',
    submittedDate: '2025-10-23',
    status: 'Pending',
    priority: 'high',
    description: 'Need additional marine-grade cables and circuit breakers. Specifications attached.'
  },
  {
    id: 'rep-017',
    projectId: 'proj-008',
    projectName: 'MV Indian Ocean - Electrical System Upgrade',
    reportType: 'Weekly Update',
    submittedBy: 'Supervisor Lakshmi Perera',
    submittedDate: '2025-10-22',
    status: 'Pending',
    priority: 'medium',
    description: 'Main electrical panel upgrade 40% complete. Testing equipment installed and operational.'
  },
  {
    id: 'rep-018',
    projectId: 'proj-008',
    projectName: 'MV Indian Ocean - Electrical System Upgrade',
    reportType: 'Safety Checklist',
    submittedBy: 'Safety Officer Samantha De Silva',
    submittedDate: '2025-10-21',
    status: 'Pending',
    priority: 'high',
    description: 'All electrical work safety protocols reviewed. Team briefed on emergency procedures.'
  },
  {
    id: 'rep-019',
    projectId: 'proj-012',
    projectName: 'Bulk Carrier Epsilon - Cargo Hold Repair',
    reportType: 'Structural Assessment',
    submittedBy: 'Structural Engineer Mahesh Rodrigo',
    submittedDate: '2025-10-24',
    status: 'Pending',
    priority: 'high',
    description: 'Cargo hold 2 shows significant structural damage. Recommend reinforcement before loading.'
  },
  {
    id: 'rep-020',
    projectId: 'proj-012',
    projectName: 'Bulk Carrier Epsilon - Cargo Hold Repair',
    reportType: 'Daily Progress Report',
    submittedBy: 'Supervisor Anil Rodrigo',
    submittedDate: '2025-10-23',
    status: 'Pending',
    priority: 'medium',
    description: 'Cargo hold 1 repairs completed. Moving to hold 2. Welding crew working in two shifts.'
  },
  {
    id: 'rep-021',
    projectId: 'proj-012',
    projectName: 'Bulk Carrier Epsilon - Cargo Hold Repair',
    reportType: 'Quality Inspection',
    submittedBy: 'QC Inspector Tharaka Perera',
    submittedDate: '2025-10-22',
    status: 'Pending',
    priority: 'high',
    description: 'Quality inspection of completed welds in hold 1. Minor defects found and corrected.'
  },
  {
    id: 'rep-022',
    projectId: 'proj-004',
    projectName: 'MV Pacific Dawn - Annual Survey',
    reportType: 'Completion Report',
    submittedBy: 'Survey Officer Michael De Silva',
    submittedDate: '2025-10-20',
    status: 'Approved',
    priority: 'low',
    description: 'Annual survey completed successfully. All systems meet regulatory standards. Certificate issued.'
  }
];