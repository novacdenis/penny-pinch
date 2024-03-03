"use server";

import type { PaymentMethod } from "../types";

export async function getPaymentMethods() {
  const data: PaymentMethod[] = [
    {
      id: "1",
      bank: "vb",
      symbol: "visa",
      number: "1234 5678 9012 3456",
      expiration: "12/23",
      balance: 1000,
      balance_diff: -3,
    },
    {
      id: "2",
      bank: "maib",
      symbol: "mastercard",
      number: "1234 5678 9012 3456",
      expiration: "12/23",
      balance: 1000,
      balance_diff: 5,
    },
  ];

  return data;
}
