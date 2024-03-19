"use client";

import type { ReportData } from "./base-chart";
import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { timeFormats } from "@/utils/time-config";
import { createClient } from "../../../../supabase/client";
import { Database } from "../../../../supabase/database.types";

export interface IUploadDataProps {
  data: ReportData;
}
export type ITransaction = Database["public"]["Tables"]["transactions"]["Insert"];

const supabase = createClient();
export default function UploadData({ data }: IUploadDataProps) {
  const [state, setState] = useState({});
  const isDataEmpty = data.length === 0;
  const upload = async () => {
    const preparedData = reportToTransactionData(data);

    await supabase.from("transactions").insert(preparedData);

    const { data: transactions } = await supabase.from("transactions").select();

    if (transactions) {
      setState(transactions);
    }
  };

  return (
    <>
      <Button disabled={isDataEmpty} onClick={upload}>
        Upload to db the report
      </Button>
      {JSON.stringify(state, null, 2)}
    </>
  );
}

const reportToTransactionData = (data: ReportData): ITransaction[] => {
  return data.map((d) => ({
    date: dayjs(d.date, timeFormats.dateMDY).toISOString(),
    sum: d.sum,
    sumInLei: d.sumInLei,
    transactionCurrency: d.transactionCurrency,
    description: d.description,
    transactionType: d.transactionType,
    // user_id: "test",
  }));
};
