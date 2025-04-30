// For raw data from Firebase
export interface FirebaseCustomer {
    id: string;
    name?: string;
    email?: string;
    mobile?: string;
    gender?: string;
    points?: number;
  }
  
  // For your application (all fields required)
  export interface AppCustomer {
    id: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    points: number;
  }
  export interface Bill {
    id: string;
    customerId: string;
    total: number;
    items: Array<{
      productId: string;
      quantity: number;
    }>;
    date?: string; // Optional field
  }