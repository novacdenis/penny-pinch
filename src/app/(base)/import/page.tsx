"use client";
import { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import BaseChart, {
  ReportData,
  ReportEntityType,
  TransactionPerTime,
} from "@/app/(base)/import/base-chart";
import UploadData from "@/app/(base)/import/upload-data";
import {
  Metric,
  MetricDelta,
  MetricDescription,
  MetricTitle,
  MetricTrend,
  MetricValue,
  Trend,
} from "@/components/shared/metric";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImportPage() {
  return (
    <section className="container">
      <Card>
        <CardHeader>
          <CardTitle>Import report</CardTitle>
          <CardDescription>
            <span>Import your monthly report from VB (HTML format only)</span>
            <span className="block text-xs text-orange-300 opacity-40">
              later MAIB will be available
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportImport />
        </CardContent>
      </Card>
    </section>
  );
}

export type FileOrNull = File | null;
const ReportImport = () => {
  const acceptedFileTypes = ".html";
  const [file, setFile] = useState<FileOrNull>(null);
  const [parsedData, setParsedData] = useState<ReportData>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const processReport = async () => {
    if (!file) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("media", file);

      const res = await fetch("/api/upload/report", {
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: ReportData | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        throw new Error("Server error, or no data found.");
      }

      setParsedData(data);
    } catch (error) {
      console.error(error);
      console.log("Sorry! something went wrong.");
    }
  };

  return (
    <>
      <section>
        <Label htmlFor="report">Upload report</Label>
        <Input id="report" type="file" accept={acceptedFileTypes} onChange={handleFileChange} />
        <Button onClick={processReport}>Process</Button>
        <UploadData data={parsedData} />
      </section>
      <section className="container grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric>
          <MetricTitle>Household bills</MetricTitle>
          <MetricValue>$500.00</MetricValue>
          <MetricDelta delta="up">3.31%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend data={parsedData.slice(0, 10).map(mapReportEntityTypeToTrend)} />
        </Metric>
        <Metric>
          <MetricTitle>Household bills</MetricTitle>
          <MetricValue>$500.00</MetricValue>
          <MetricDelta delta="up">3.31%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend data={parsedData.slice(10, 30).map(mapReportEntityTypeToTrend)} />
        </Metric>
        <Metric>
          <MetricTitle>Household bills</MetricTitle>
          <MetricValue>$500.00</MetricValue>
          <MetricDelta delta="up">3.31%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={formatNumberOfTransactions(parsedData).map(mapTransactionPerTimeToTrend)}
          />
        </Metric>
      </section>
      <section className="mt-10">
        {parsedData.length > 0 && <BaseChart data={formatNumberOfTransactions(parsedData)} />}
      </section>
      <div className="mb-96"></div>
      {JSON.stringify(parsedData, null, 2)}
    </>
  );
};

const mapReportEntityTypeToTrend = (el: ReportEntityType): Trend => ({
  timestamp: new Date(el.date).getTime(),
  amount: Number(el.sum),
});

const mapTransactionPerTimeToTrend = ({
  timestamp,
  nrOfTransactions,
}: TransactionPerTime): Trend => ({
  timestamp,
  amount: nrOfTransactions,
});
const toTimestamp = (date: string) => dayjs(date, "DD-MM-YYYY").valueOf();

const formatNumberOfTransactions = (data: ReportData): TransactionPerTime[] => {
  return data.reduce((acc: [] | TransactionPerTime[], value): TransactionPerTime[] => {
    if (acc.find((el) => el?.timestamp === toTimestamp(value.date))) return acc;

    const numberOfRepetition = data.filter((el) => el.date === value.date);

    return [
      ...acc,
      { timestamp: toTimestamp(value.date), nrOfTransactions: numberOfRepetition.length },
    ];
  }, []);
};
