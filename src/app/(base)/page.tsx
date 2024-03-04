import type { TransactionType } from "@/features/transactions";
import {
  Metric,
  MetricDelta,
  MetricDescription,
  MetricTitle,
  MetricTrend,
  MetricValue,
} from "@/components/shared/metric";

const _data = [
  {
    date: new Date("2021-01-01").getTime(),
    value: 500,
  },
  {
    date: new Date("2021-02-01").getTime(),
    value: 600,
  },
  {
    date: new Date("2021-03-01").getTime(),
    value: 600,
  },
  {
    date: new Date("2021-04-01").getTime(),
    value: 600,
  },
  {
    date: new Date("2021-05-01").getTime(),
    value: 700,
  },
  {
    date: new Date("2021-06-01").getTime(),
    value: 700,
  },
  {
    date: new Date("2021-07-01").getTime(),
    value: 600,
  },
  {
    date: new Date("2021-08-01").getTime(),
    value: 1000,
  },
  {
    date: new Date("2021-09-01").getTime(),
    value: 700,
  },
  {
    date: new Date("2021-10-01").getTime(),
    value: 600,
  },
  {
    date: new Date("2021-11-01").getTime(),
    value: 500,
  },
  {
    date: new Date("2021-12-01").getTime(),
    value: 500,
  },
];

const _transactions: TransactionType[] = [
  {
    id: 1,
    title: "Lunch",
    amount: 100,
    category: "groceries",
    timestamp: new Date("2021-01-01").toISOString(),
  },
  {
    id: 2,
    title: "Electricity bill",
    amount: 200,
    category: "bills-and-utilities",
    timestamp: new Date("2021-01-02").toISOString(),
  },
  {
    id: 3,
    amount: 300,
    title: "Taxi",
    category: "transportation",
    timestamp: new Date("2021-01-03").toISOString(),
  },
  {
    id: 4,
    title: "Shoes",
    amount: 400,
    category: "shopping",
    timestamp: new Date("2021-01-04").toISOString(),
  },
  {
    id: 5,
    amount: 500,
    title: "Netflix",
    category: "entertainment",
    timestamp: new Date("2021-01-05").toISOString(),
  },
  {
    id: 6,
    amount: 600,
    title: "Gym",
    category: "health-and-fitness",
    timestamp: new Date("2021-01-06").toISOString(),
  },
  {
    id: 7,
    amount: 700,
    title: "Flight",
    category: "travel",
    timestamp: new Date("2021-01-07").toISOString(),
  },
  {
    id: 8,
    amount: 800,
    title: "Books",
    category: "education",
    timestamp: new Date("2021-01-08").toISOString(),
  },
];

export default function DashboardPage() {
  return (
    <>
      <section className="container grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric>
          <MetricTitle>Total spent</MetricTitle>
          <MetricValue>$1,000.00</MetricValue>
          <MetricDelta delta="up">5%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.date, amount: Math.random() * 1000 }))}
          />
        </Metric>

        <Metric>
          <MetricTitle>Household bills</MetricTitle>
          <MetricValue>$500.00</MetricValue>
          <MetricDelta delta="up">3.31%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.date, amount: Math.random() * 1000 }))}
          />
        </Metric>

        <Metric>
          <MetricTitle>Total transactions</MetricTitle>
          <MetricValue>100</MetricValue>
          <MetricDelta delta="down">5%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.date, amount: Math.random() * 1000 }))}
          />
        </Metric>

        <Metric>
          <MetricTitle>Avg. transaction amount</MetricTitle>
          <MetricValue>$10.00</MetricValue>
          <MetricDelta delta="up">10%</MetricDelta>
          <MetricDescription>Compared to last month</MetricDescription>
          <MetricTrend
            data={_data.map((d) => ({ timestamp: d.date, amount: Math.random() * 1000 }))}
          />
        </Metric>
      </section>

      <section className="container mt-10">
        <header>
          <h2 className="font-semibold md:text-lg">Transactions</h2>
          <p className="text-sm text-muted-foreground">
            Here you can see all your transactions. You can filter them by date, category, and more.
          </p>
        </header>
        <div className="mt-5 flex flex-col space-y-5">
          <ul>
            <li className="flex items-center">
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-600/20 text-green-600"></button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
