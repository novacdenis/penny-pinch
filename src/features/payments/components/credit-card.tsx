import Image from "next/image";
import React from "react";
import { cn } from "@/utils";
import { BANKS, SYMBOLS } from "../constants";

const formatter = new Intl.NumberFormat("ro-MD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export interface CreditCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bank: "maib" | "vb";
  symbol: "mastercard" | "visa";
  number: string;
  expiration: string;
  balance: number;
  balance_diff: number;
}

const CreditCard = React.forwardRef<HTMLButtonElement, CreditCardProps>(
  ({ bank, symbol, number, expiration, balance, balance_diff, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex aspect-[8.56/5.398] w-full flex-col rounded-xl p-4",
        {
          "bg-green-800": bank === "maib",
          "bg-blue-800": bank === "vb",
        },
        className
      )}
      {...props}
    >
      <div className="flex w-full flex-1 items-center justify-between space-x-2">
        <Image
          src={BANKS[bank].url}
          alt="Maib"
          width={BANKS[bank].width}
          height={BANKS[bank].height}
        />
        <Image
          src={SYMBOLS[symbol].url}
          alt="Mastercard"
          width={SYMBOLS[symbol].width}
          height={SYMBOLS[symbol].height}
        />
      </div>

      <div className="flex w-full flex-1 items-center justify-between space-x-2">
        <p className="text-left font-medium text-primary">
          <span className="block text-sm font-medium text-primary/90">Number</span>
          <span>{number}</span>
        </p>
        <p className="text-right font-medium text-primary">
          <span className="block text-sm font-medium text-primary/90">Expiration</span>
          <span>{expiration}</span>
        </p>
      </div>

      <div className="flex w-full flex-1 items-center justify-between space-x-2">
        <p className="text-left font-medium text-primary">
          <span className="block text-sm font-medium text-primary/90">Balance</span>
          <span>{formatter.format(Number(balance))} L</span>

          {balance_diff !== 0 && (
            <span
              className={cn(
                "ml-2 rounded-full bg-primary px-2.5 py-1 text-sm font-semibold shadow-sm",
                {
                  "text-green-600": balance_diff < 0,
                  "text-red-600": balance_diff > 0,
                }
              )}
            >
              {balance_diff > 0 ? "+" : ""}
              {formatter.format(Number(balance_diff))} %
            </span>
          )}
        </p>
      </div>
    </button>
  )
);
CreditCard.displayName = "CreditCard";

export interface CreditCardPlaceholderProps extends React.HTMLAttributes<HTMLButtonElement> {}

const CreditCardPlaceholder = React.forwardRef<HTMLButtonElement, CreditCardPlaceholderProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("flex aspect-[8.56/5.398] w-full flex-col rounded-xl bg-card p-5", className)}
      {...props}
    />
  )
);
CreditCardPlaceholder.displayName = "CreditCardPlaceholder";

export { CreditCard, CreditCardPlaceholder };
