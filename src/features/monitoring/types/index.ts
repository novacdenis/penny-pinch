export interface Expense {
  timestamp: number;
  household: number;
  transport: number;
  food: number;
  utilities: number;
  other: number;
  total: number;
}

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  timestamp: number;
}
