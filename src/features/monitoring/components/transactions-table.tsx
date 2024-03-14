"use client";

import type { Transaction } from "../types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { DataTable } from "@/components/ui/data-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    header: "Date",
    accessorFn: (row) => dayjs(row.timestamp).format("DD/MM/YYYY"),
  },
  { accessorKey: "title", header: "Title" },
  {
    header: "Category",
    accessorFn: (row) => row.category.slice(0, 1).toUpperCase() + row.category.slice(1),
  },
  { accessorKey: "amount", header: "Amount" },
];

export interface TransactionsTableProps {
  data: Transaction[];
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};
