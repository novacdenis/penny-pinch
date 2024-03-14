export type ExpenseCategory = "household" | "transport" | "food" | "utilities" | "other";

export interface Expense {
  timestamp: number;
  household: number;
  transport: number;
  food: number;
  utilities: number;
  other: number;
  total: number;
}
