import React from "react";
import dayjs from "dayjs";
import { getDashboardData } from "@/app/(protected)/dashboard/action";
import {
  Metric,
  MetricDelta,
  MetricDescription,
  MetricTitle,
  MetricTrend,
  MetricValue,
} from "@/components/shared/metric";
import { Section } from "@/components/ui/section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpensesChart, Transaction, TransactionsTable } from "@/features/monitoring";
import { Tables } from "../../../../supabase/database.types";

const _data = [
  { timestamp: new Date("2021-01-01").getTime() },
  { timestamp: new Date("2021-02-01").getTime() },
  { timestamp: new Date("2021-03-01").getTime() },
  { timestamp: new Date("2021-04-01").getTime() },
  { timestamp: new Date("2021-05-01").getTime() },
  { timestamp: new Date("2021-06-01").getTime() },
  { timestamp: new Date("2021-07-01").getTime() },
  { timestamp: new Date("2021-08-01").getTime() },
  { timestamp: new Date("2021-09-01").getTime() },
  { timestamp: new Date("2021-10-01").getTime() },
  { timestamp: new Date("2021-11-01").getTime() },
  { timestamp: new Date("2021-12-01").getTime() },
];

type TransactionsTable = Tables<"transactions">;
type CategoriesTable = Tables<"categories">;
type TransactionsWithCategories = TransactionsTable & {
  categories: Pick<CategoriesTable, "name"> | null;
};

function transformToTableData(data: TransactionsWithCategories[]): Transaction[] {
  return data.map(({ id, description, categories, sumInLei, date }) => ({
    id: id.toString(),
    timestamp: dayjs(date).valueOf(),
    title: description ? description : "-",
    category: categories?.name || "-",
    amount: sumInLei,
  }));
}

/*name if : "Beauty"|
"Bills & Fees"|
"Car"|
"Education"|
"Entertainment"|
"Family & Personal"|
"Food & Drink"|
"Gifts"|
"Groceries"|
"Healthcare"|
"Home"|
"Shopping"|
"Sport & Hobby"|
"Transport"|
"Travel"|
"Work"*/
function transformToExpensesChartData(
  data: TransactionsWithCategories[]
): { timestamp: number; [key: string]: number }[] {
  const expenses: { timestamp: number; [key: string]: number }[] = [];
  data.forEach(({ date, categories }) => {
    let household = 0;
    let transport = 0;
    let food = 0;
    let utilities = 0;
    let other = 0;
    let total = 0;
    data.forEach((d) => {
      if (date !== d.date) return;
      const sumInLei = Math.abs(d.sumInLei);

      switch (categories?.name) {
        case "Bills & Fees":
          household += sumInLei;
          break;
        case "Car":
          transport += sumInLei;
          break;
        case "Groceries":
          food += sumInLei;
          break;
        case "Home":
          utilities += sumInLei;
          break;
        default:
          other += sumInLei;
          break;
      }
      console.log(categories?.name, "categories", categories?.name === "Groceries", { food });

      total += sumInLei;
    });
    expenses.push({
      timestamp: new Date(date).valueOf(),
      household,
      transport,
      food,
      utilities,
      other,
      total,
    });
  });
  console.log(
    expenses.find((t) => t.food > 0),
    "expenses"
  );
  return expenses;
}
export default async function DashboardPage() {
  const data = await getDashboardData();
  const tableData = transformToTableData(data);
  const expensesChartData = transformToExpensesChartData(data);
  return (
    <>
      <Section className="container mt-0 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric>
          <MetricTitle>Total spent</MetricTitle>
          <MetricValue>$1,000.00</MetricValue>
          <MetricDelta delta="up">5%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.timestamp, amount: Math.random() * 1000 }))}
          />
        </Metric>

        <Metric>
          <MetricTitle>Household bills</MetricTitle>
          <MetricValue>$500.00</MetricValue>
          <MetricDelta delta="up">3.31%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.timestamp, amount: Math.random() * 1000 }))}
          />
        </Metric>

        <Metric>
          <MetricTitle>Total transactions</MetricTitle>
          <MetricValue>100</MetricValue>
          <MetricDelta delta="down">5%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.timestamp, amount: Math.random() * 1000 }))}
          />
        </Metric>

        <Metric>
          <MetricTitle>Avg. transaction amount</MetricTitle>
          <MetricValue>$10.00</MetricValue>
          <MetricDelta delta="up">10%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.timestamp, amount: Math.random() * 1000 }))}
          />
        </Metric>
      </Section>

      <section className="container mt-10">
        <header className="flex h-12 items-center justify-between">
          <h2 className="flex-1 font-medium md:text-lg">Expenses</h2>
          <Tabs defaultValue="1y">
            <TabsList className="h-8">
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="6m">6M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>
        <div className="mt-5 h-96">
          <ExpensesChart data={expensesChartData} />
        </div>
      </section>

      <section className="container mt-10">
        <header className="flex h-12 items-center justify-between">
          <h2 className="flex-1 font-medium md:text-lg">Transactions</h2>
        </header>
        <div className="mt-5">
          <TransactionsTable data={tableData} />
        </div>
      </section>
    </>
  );
}
