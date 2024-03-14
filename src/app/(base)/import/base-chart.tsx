import React, { useEffect, useMemo } from "react";
import { GradientTealBlue } from "@visx/gradient";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";

const verticalMargin = 120;
export interface ReportEntityType {
  date: string;
  sum: number;
  sumInLei: number;
  transactionCurrency: string;
  description: string;
  transactionType: string;
}

export type ReportData = ReportEntityType[];
export type TransactionPerTime = { timestamp: number; nrOfTransactions: number };
export type TransactionsPerTime = TransactionPerTime[];

// accessors
const getDate = (d: TransactionPerTime) => d.timestamp;
const getAmount = (d: TransactionPerTime) => d.nrOfTransactions;

export type BarsProps = {
  width?: number;
  height?: number;
  events?: boolean;
  data: TransactionPerTime[];
};

export default function BaseChart({ width = 300, height = 300, events = false, data }: BarsProps) {
  console.log(data, "deb");
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, xMax],
        round: true,
        domain: data.map(getDate),
        padding: 0.4,
      }),
    [data, xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getAmount))],
      }),
    [data, yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d, i) => {
          const letter = getDate(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getAmount(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}-i`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
