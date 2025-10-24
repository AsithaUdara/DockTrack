// src/types/user.types.ts
export type UserRole = 'Supervisor' | 'Manager' | 'Client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // Password should not be exposed on the frontend in a real app
}
