import React from "react";
import { faker } from "@faker-js/faker";
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
import { ExpensesChart, TransactionsTable } from "@/features/monitoring";

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

export default function DashboardPage() {
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
          <ExpensesChart
            data={_data
              .map((d) => ({
                timestamp: d.timestamp,
                categories: {
                  household: faker.number.int({ min: 200, max: 1000 }),
                  transport: faker.number.int({ min: 200, max: 1000 }),
                  food: faker.number.int({ min: 200, max: 1000 }),
                  utilities: faker.number.int({ min: 200, max: 1000 }),
                  other: faker.number.int({ min: 200, max: 1000 }),
                },
              }))
              .map((d) => ({
                timestamp: d.timestamp,
                total: Object.values(d.categories).reduce((acc, curr) => acc + curr, 0),
                ...d.categories,
              }))}
          />
        </div>
      </section>

      <section className="container mt-10">
        <header className="flex h-12 items-center justify-between">
          <h2 className="flex-1 font-medium md:text-lg">Transactions</h2>
        </header>
        <div className="mt-5">
          <TransactionsTable
            data={_data.map((d) => ({
              id: faker.string.uuid(),
              timestamp: d.timestamp,
              title: faker.lorem.words(3),
              category: faker.helpers.arrayElement([
                "household",
                "transport",
                "food",
                "utilities",
                "other",
              ]),
              amount: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
            }))}
          />
        </div>
      </section>
    </>
  );
}
