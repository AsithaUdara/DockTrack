import React from 'react';

const Icon = ({ children, className = 'w-5 h-5' }: { children: React.ReactNode, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {children}
    </svg>
);

export const ClipboardList = (props: { className?: string }) => (
    <Icon className={props.className}>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M10 9h6" />
        <path d="M10 13h6" />
        <path d="M10 17h6" />
    </Icon>
);

export const Camera = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
    </Icon>
);

export const AlertTriangle = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
);

export const Send = (props: { className?: string }) => (
    <Icon className={props.className}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </Icon>
);

export const CheckCircle = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
);

export const UserCheck = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M17 11l4 4-4 4" />
    </Icon>
);

export const Users = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M9 21v-2a4 4 0 0 1 3-3.87" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </Icon>
);

export const Package = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M16.5 9.4l-9-5.19" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3 7 12 12 21 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
    </Icon>
);

export const Wrench = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Icon>
);

export const CloudUpload = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M12 16v-6" />
        <path d="m15 13-3-3-3 3" />
        <path d="M16 6a4 4 0 0 1 4 4 6 6 0 0 1-7 5.92V18a2 2 0 1 1-4 0v-2.08A6 6 0 0 1 2 10a4 4 0 0 1 8 0" />
    </Icon>
);
