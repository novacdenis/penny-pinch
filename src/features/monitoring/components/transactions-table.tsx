"use client";

import type { Transaction } from "../types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

export const columns: ColumnDef<Transaction>[] = [
  { accessorKey: "timestamp", header: "Date" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "amount", header: "Amount" },
];

export interface TransactionsTableProps {
  data: Transaction[];
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};
