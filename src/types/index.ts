export interface Customer {
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