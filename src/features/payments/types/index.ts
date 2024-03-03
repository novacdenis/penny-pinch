export interface PaymentMethod {
  id: string;
  bank: "vb" | "maib";
  symbol: "mastercard" | "visa";
  number: string;
  expiration: string;
  balance: number;
  balance_diff: number;
}
