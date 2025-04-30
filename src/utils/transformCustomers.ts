import { FirebaseCustomer, AppCustomer } from '@/types';

export function transformCustomer(customer: FirebaseCustomer): AppCustomer {
  return {
    id: customer.id,
    name: customer.name || 'Unknown',
    email: customer.email || 'No email',
    mobile: customer.mobile || 'Not provided',
    gender: customer.gender || 'Not specified',
    points: customer.points || 0
  };
}