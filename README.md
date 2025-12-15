# 🚢 DockTrack

**Digital Daily Work Report & Progress Documentation System**

A comprehensive web-based platform designed for Colombo Dockyard PLC to streamline operations, enhance project visibility, and manage daily work reports with real-time insights.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
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
- **Data-Driven Decisions**: Provide actionable insights through dashboards and analytics
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
