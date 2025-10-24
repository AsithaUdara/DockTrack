// src/data/mock-users.ts
import { User } from '@/types/user.types';

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Supervisor Sam',
    email: 'supervisor@cdl.lk',
    role: 'Supervisor',
    password: 'password123',
  },
  {
    id: 'user-002',
    name: 'Manager Mary',
    email: 'manager@cdl.lk',
    role: 'Manager',
    password: 'password123',
  },
  {
    id: 'user-003',
    name: 'Client Chris',
    email: 'client@vesselcorp.com',
    role: 'Client',
    password: 'password123',
  },
];
