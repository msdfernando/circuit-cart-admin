// src/utils/transformCustomers.ts
import { FirebaseCustomer, AppCustomer } from '@/types';

export function transformCustomer(c: FirebaseCustomer): AppCustomer {
  return {
    id: c.id,
    name: c.name || 'Unknown',
    email: c.email || 'No email',
    mobile: c.mobile || 'Not provided',
    gender: c.gender || 'Not specified',
    points: c.points || 0
  };
}