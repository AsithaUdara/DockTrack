export interface TradeResource {
    hours: number | '';
    count: number | '';
}

export interface MaterialResource {
    quantity: number | '';
    unit: string;
}

export interface EquipmentResource {
    hours: number | '';
    quantity: number | '';
}

export type ReportData = {
    taskId: string;
    task: string;
    assignedBy: string;
    date: string;
    vessel: string;
    dockLocation: string;
    taskStatus: string;
    weatherCondition: string;
    issueSeverity: 'none' | 'minor' | 'critical';
    issueCategory: string;
    issueDescription: string;
    photoBeforeCount: number;
    photoAfterCount: number;
    estimatedHours: number | '';
    personnelCount: number | '';
    trades: {
        welders: TradeResource;
        fitters: TradeResource;
        painters: TradeResource;
        riggers: TradeResource;
    };
    materials: {
        steel: MaterialResource;
        paint: MaterialResource;
        welding: MaterialResource;
        bolts: MaterialResource;
    };
    equipment: {
        crane: EquipmentResource;
        welder: EquipmentResource;
        grinder: EquipmentResource;
        scaffold: EquipmentResource;
    };
};

export const initialReportData: ReportData = {
    taskId: '',
    task: '',
    assignedBy: '',
    date: '',
    vessel: '',
    dockLocation: '',
    taskStatus: '',
    weatherCondition: '',
    issueSeverity: 'none',
    issueCategory: 'N/A',
    issueDescription: '',
    photoBeforeCount: 0,
    photoAfterCount: 0,
    estimatedHours: '',
    personnelCount: '',
    trades: {
        welders: { hours: '', count: '' },
        fitters: { hours: '', count: '' },
        painters: { hours: '', count: '' },
        riggers: { hours: '', count: '' },
    },
    materials: {
        steel: { quantity: '', unit: 'tons' },
        paint: { quantity: '', unit: 'liters' },
        welding: { quantity: '', unit: 'rods' },
        bolts: { quantity: '', unit: 'pcs' },
    },
    equipment: {
        crane: { hours: '', quantity: '' },
        welder: { hours: '', quantity: '' },
        grinder: { hours: '', quantity: '' },
        scaffold: { hours: '', quantity: '' },
    },
};
