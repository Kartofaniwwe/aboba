export interface Vehicle {
  id: string;
  name: string;
  description?: string;
  status: 'available' | 'rented';
  image?: string;
}

export interface Transaction {
  id: string;
  vehicleId: string;
  amount: number;
  date: Date;
  hours: number;
  pricePerHour: number;
  comment?: string;
}

export interface Statistics {
  income: number;
  expenses: number;
  profit: number;
  totalHours: number;
  totalTransactions: number;
}