# 🚢 DockTrack

**Digital Daily Work Report & Progress Documentation System**

A comprehensive web-based platform designed for Colombo Dockyard PLC to streamline operations, enhance project visibility, and manage daily work reports with real-time insights.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue. svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [Key Modules](#key-modules)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

DockTrack is a modern, full-stack application built to digitize and optimize the workflow of maritime dockyard operations. The system provides role-based access for Managers, Supervisors, and Clients, enabling seamless tracking of projects, reports, resources, and communications. 

### Key Objectives

- **Digitize Daily Reports**: Replace paper-based reporting with structured digital forms
- **Real-time Tracking**: Monitor project progress, resource allocation, and equipment usage
- **Enhanced Collaboration**: Facilitate communication between managers, supervisors, and clients
- **Data-Driven Decisions**:  Provide actionable insights through dashboards and analytics
- **Photo Documentation**: Capture before/after images for quality assurance

---

## ✨ Features

### 🔐 Authentication & Authorization
- Role-based access control (Manager, Supervisor, Client)
- Secure login system with modal-based authentication

### 📊 Manager Dashboard
- Overview of all active projects and statistics
- Project health monitoring
- Pending report approvals
- Alert notifications for delays and issues
- Team performance analytics

### 👷 Supervisor Module
- **Daily Task Report**: Comprehensive 6-section form covering:
  - Basic Information (Task, Location, Weather)
  - Resource Allocation (Man-hours, Personnel)
  - Materials Used (Steel, Paint, Welding Rods)
  - Equipment Used (Crane, Welding Machine, Grinder)
  - Photo Documentation (Before/After images)
  - Issue Reporting (Severity, Category, Description)
- Multi-step report creation wizard
- Real-time form validation
- Digital signature capture

### 👥 Client Portal
- Project overview and progress tracking
- Interactive chatbot for instant support
- Photo gallery (before/after comparisons)
- Contact form for inquiries
- Real-time project status updates

### 🤖 AI-Powered Chatbot
- Project status inquiries
- Completion date estimates
- Maintenance recommendations
- Contact information
- Service details

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.0](https://nextjs.org/) with App Router
- **UI Library**: [React 19.2](https://react.dev/)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Additional Libraries
- **PDF Generation**: jsPDF
- **Digital Signatures**: react-signature-canvas
- **Social Sharing**: react-share
- **Linting**: ESLint with Next.js config

### Development Tools
- PostCSS
- TypeScript configuration
- ESLint configuration

---

## 📁 Project Structure

```
DockTrack/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (supervisor)/             # Supervisor routes
│   │   │   ├── daily-task-report/    # Daily task reporting
│   │   │   └── reports/              # Report management
│   │   ├── manager/                  # Manager dashboard & reports
│   │   │   ├── dashboard/
│   │   │   └── reports/
│   │   ├── client/                   # Client portal
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   └── contact/
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React components
│   │   ├── auth/                     # Authentication components
│   │   ├── supervisor/               # Supervisor-specific components
│   │   │   └── daily-task-report/    # Modular report sections
│   │   ├── manager/                  # Manager dashboard components
│   │   ├── client/                   # Client portal components
│   │   │   └── dashboard/
│   │   │       └── ChatBot.tsx       # AI chatbot
│   │   └── shared/                   # Shared components
│   │       └── layout/               # Header, Sidebar
│   │
│   ├── services/                     # API service layer
│   │   └── manager. service.ts
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── project.types.ts
│   │
│   ├── data/                         # Mock/static data
│   │
│   └── hooks/                        # Custom React hooks
│
├── public/                           # Static assets
│   ├── cdl-logo.png
│   └── dockyard-bg.jpg
│
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config. ts                    # Next.js configuration
├── package.json                      # Dependencies
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AsithaUdara/DockTrack. git
   cd DockTrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 👤 User Roles

### 🔷 Manager
- View all projects and reports
- Approve/reject supervisor reports
- Monitor team performance
- Access analytics and insights
- Manage alerts and notifications

### 🔶 Supervisor
- Create and submit daily task reports
- Document work progress with photos
- Track resource allocation
- Report issues and delays
- Sign off on completed work

### 🔵 Client
- View assigned projects
- Track project progress
- Access photo documentation
- Use chatbot for inquiries
- Contact support team

---

## 🔑 Key Modules

### 1. Daily Task Report (Supervisor)

A comprehensive 6-section form covering: 

- **Section 1**: Basic Information (Task ID, Vessel, Location, Weather)
- **Section 2**: Resource Allocation (Man-hours, Trades)
- **Section 3**: Materials Used (Quantities and units)
- **Section 4**: Equipment Used (Hours and quantities)
- **Section 5**: Photo Documentation (Before/After)
- **Section 6**: Issue Reporting (Severity, Category, Description)

### 2. Manager Dashboard

Features include: 
- Active project overview
- Statistics (Total Projects, Completed, Active, Pending)
- Pending report approvals
- Alert system for delays and issues
- Recent activity timeline

### 3. Client Portal

Includes:
- Project tracking with progress bars
- Before/after photo galleries
- AI-powered chatbot assistance
- Contact form
- Real-time status updates

### 4. AI Chatbot

Capabilities:
- Project status queries
- Completion date estimates
- Payment information
- Maintenance recommendations
- Service inquiries
- Contact details

---

## 📸 Screenshots

_Add screenshots of your application here_

### Landing Page
![Landing Page](./screenshots/landing. png)

### Manager Dashboard
![Manager Dashboard](./screenshots/manager-dashboard.png)

### Daily Task Report
![Daily Task Report](./screenshots/daily-report.png)

### Client Portal
![Client Portal](./screenshots/client-portal.png)

---

## 🏗️ Architecture Highlights

### Component Modularity
- Each report section is a standalone component
- Promotes reusability and maintainability
- Easy to test individual sections

### Type Safety
- Full TypeScript implementation
- Strongly typed interfaces for all data structures
- Compile-time error detection

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Optimized for all screen sizes

### Performance
- Next.js 16 with App Router
- Server-side rendering
- Optimized image loading
- Code splitting

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint configuration
- Maintain consistent formatting
- Add comments for complex logic

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 📞 Contact

**Colombo Dockyard PLC**

- 📧 Email: info@colombodockyard.com
- 📱 Office: +94 11 2 521 011
- 🚨 Emergency: +94 77 123 4567
- 🌐 Website: [colombodockyard.com](https://colombodockyard.com)

**Project Maintainer**:  AsithaUdara

- GitHub: [@AsithaUdara](https://github.com/AsithaUdara)

---

## 🙏 Acknowledgments

- Built for Colombo Dockyard PLC
- Designed to streamline maritime dockyard operations
- Inspired by modern project management best practices

---

## 📚 Additional Documentation

- [Design Update Summary](./DESIGN_UPDATE_SUMMARY.md)
- [Daily Task Report Components](./src/components/supervisor/daily-task-report/README.md)

---

<div align="center">

**Made with ❤️ for Maritime Excellence**

⚓ Colombo Dockyard PLC © 2025

</div>
