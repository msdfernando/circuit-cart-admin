// For data coming from Firebase
export interface FirebaseCustomer {
    id: string;
    name?: string;
    email?: string;
    mobile?: string;
    gender?: string;
    points?: number;
  }
  
  // For your application usage
  export interface AppCustomer {
    id: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    points: number;
  }