"use client";

import React from "react";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AreaClosed } from "@visx/shape";

interface ChartProps {
  width: number;
  height: number;
}

const mockData = Array.from({ length: 10 }, (_, i) => ({
  timestamp: Date.now() + i * 1000 * 60 * 60 * 24,
  amount: Math.random() * 100,
})).sort((a, b) => a.timestamp - b.timestamp);

const Chart: React.FC<ChartProps> = ({ width, height }) => {
  const [margin] = React.useState({ top: 10, right: 0, bottom: 0, left: 0 });

  const innerWidth = Math.max(width - margin.left - margin.right, 0);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

  const xScale = React.useMemo(() => {
    const min = Math.min(...mockData.map((h) => h.timestamp));
    const max = Math.max(...mockData.map((h) => h.timestamp));

    return scaleTime<number>({
      domain: [min, max],
    });
  }, []);

  const yScale = React.useMemo(() => {
    const min = Math.min(...mockData.map((h) => h.amount));
    const max = Math.max(...mockData.map((h) => h.amount));

    return scaleLinear<number>({
      domain: [min, max],
    });
  }, []);

  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <LinearGradient
        id="area-background-gradient"
        from="#2563eb"
        to="#2563eb"
        fromOpacity={0.1}
        toOpacity={0.01}
      />
      <LinearGradient id="area-gradient" from="#2563eb" to="#2563eb" toOpacity={0.1} />
      <Group left={margin.left} top={margin.top}>
        <AreaClosed
          curve={curveMonotoneX}
          data={mockData}
          x={(d) => xScale(d.timestamp) ?? 0}
          y={(d) => yScale(d.amount) ?? 0}
          yScale={yScale}
          strokeWidth={2}
          stroke="url(#area-gradient)"
          fill="url(#area-background-gradient)"
        />
      </Group>
    </svg>
  );
};

const ExpenseChart: React.FC = () => {
  return <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>;
};

export default ExpenseChart;
