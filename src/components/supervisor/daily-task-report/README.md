# Daily Task Report Components

This directory contains all components for the Daily Task Report page.

## File Structure

```
daily-task-report/
├── types.ts                          # TypeScript types and interfaces
├── customStyles.ts                   # Custom CSS styles for number inputs
├── Icons.tsx                         # SVG icon components
├── index.ts                          # Export barrel file
├── Section1BasicInformation.tsx      # Task & Location Details
├── Section2ResourceAllocation.tsx    # Resource Allocation & Man-Hours
├── Section3MaterialsUsed.tsx         # Materials Used tracking
├── Section4EquipmentUsed.tsx         # Equipment Used tracking
├── Section5PhotoDocumentation.tsx    # Photo upload section
└── Section6IssueReporting.tsx        # Issue Reporting section
```

## Components

### Section 1: Basic Information
- **Fields**: Task ID, Task, Assigned By, Date, Vessel, Dock Location, Task Status, Weather Condition
- **Props**: `report`, `handleChange`

### Section 2: Resource Allocation
- **Fields**: Total Estimated Man-Hours, Total Personnel Assigned, Trade rows (Welders, Fitters, Painters, Riggers)
- **Props**: `report`, `handleChange`

### Section 3: Materials Used
- **Fields**: Material rows with quantity and unit (Steel, Paint, Welding Rods, Bolts & Fasteners)
- **Props**: `report`, `handleChange`

### Section 4: Equipment Used
- **Fields**: Equipment rows with hours and quantity (Crane, Welding Machine, Grinder, Scaffolding)
- **Props**: `report`, `handleChange`

### Section 5: Photo Documentation
- **Fields**: Before/After photo upload
- **Props**: `report`, `handleFileSelect`

### Section 6: Issue Reporting
- **Fields**: Issue Severity (radio), Issue Category (dropdown), Issue Description (textarea)
- **Props**: `report`, `handleChange`

## Types

### ReportData
Main data structure containing all form fields.

### TradeResource
```typescript
{ hours: number | ''; count: number | ''; }
```

### MaterialResource
```typescript
{ quantity: number | ''; unit: string; }
```

### EquipmentResource
```typescript
{ hours: number | ''; quantity: number | ''; }
```

## Usage

```tsx
import {
  Section1BasicInformation,
  Section2ResourceAllocation,
  // ... other sections
} from '@/components/supervisor/daily-task-report';

// Or import everything
import * from '@/components/supervisor/daily-task-report';
```

## Benefits of Component Structure

1. **Maintainability**: Each section is self-contained and easy to modify
2. **Reusability**: Components can be reused in other pages if needed
3. **Testability**: Individual components can be unit tested
4. **Readability**: Main page is now ~233 lines (down from 878 lines)
5. **Backend Integration**: Easier to connect individual sections to API endpoints
6. **Team Collaboration**: Multiple developers can work on different sections simultaneously
