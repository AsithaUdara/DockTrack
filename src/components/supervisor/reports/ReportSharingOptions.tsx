// src/components/supervisor/reports/ReportSharingOptions.tsx
'use client';
import { EmailShareButton, TwitterShareButton, FacebookShareButton } from 'react-share';
import { EmailIcon, TwitterIcon, FacebookIcon } from 'react-share';

interface ReportSharingOptionsProps {
  reportId: string; // e.g., from submission
  reportTitle: string;
  shareUrl: string; // e.g., `https://yourapp.com/reports/${reportId}`
}

export default function ReportSharingOptions({ reportId, reportTitle, shareUrl }: ReportSharingOptionsProps) {
  return (
    <div className="flex space-x-4 print:hidden">
      <EmailShareButton url={shareUrl} subject={`Daily Report: ${reportTitle}`} body="Check out this report:">
        <EmailIcon size={32} round />
      </EmailShareButton>
      <TwitterShareButton url={shareUrl} title={`Daily Report: ${reportTitle}`}>
        <TwitterIcon size={32} round />
        </TwitterShareButton>
      <FacebookShareButton url={shareUrl} title={`Daily Report: ${reportTitle}`}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
}