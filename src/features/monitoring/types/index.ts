export interface Expense {
  timestamp: number;
  household: number;
  transport: number;
  food: number;
  utilities: number;
  other: number;
  total: number;
}

export type TransactionCategory = "household" | "transport" | "food" | "utilities" | "other";

export interface Transaction {
  id: string;
  title: string;
  category: TransactionCategory;
  amount: number;
  timestamp: number;
}
