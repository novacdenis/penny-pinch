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

      <section className="container mt-5">
        <header>
          <h2 className="font-semibold md:text-lg">Transactions</h2>
          <p className="text-sm text-muted-foreground">
            Here you can see all your transactions. You can filter them by date, category, and more.
          </p>
        </header>
      </section>
    </>
  );
}
