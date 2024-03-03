import { Metric } from "@/components/shared/metric";

const data = [
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-5">
        <Metric
          title="Total spent"
          value="$1,000.00"
          difference={5}
          description="Compared to last month"
          trend={data.map((d) => ({
            timestamp: d.date,
            amount: Math.random() > 0.5 ? 1000 : 500,
          }))}
        />

        <Metric
          title="Household bills"
          value="$500.00"
          difference={3.31}
          description="Compared to last month"
          trend={data.map((d) => ({
            timestamp: d.date,
            amount: Math.random() > 0.5 ? 500 : 600,
          }))}
        />

        <Metric
          title="Total transactions"
          value="100"
          difference={5}
          description="Compared to last month"
          trend={data.map((d) => ({
            timestamp: d.date,
            amount: Math.random() > 0.5 ? 100 : 200,
          }))}
        />

        <Metric
          title="Avg. transaction amount"
          value="$10.00"
          difference={10}
          description="Compared to last month"
          trend={data.map((d) => ({
            timestamp: d.date,
            amount: Math.random() > 0.5 ? 10 : 20,
          }))}
        />
      </div>
    </>
  );
}
