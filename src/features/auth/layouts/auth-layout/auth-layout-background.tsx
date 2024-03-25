"use client";

import React from "react";
import { curveMonotoneX } from "@visx/curve";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AreaClosed } from "@visx/shape";
import { motion, useWillChange } from "framer-motion";

const data = [
  { timestamp: 1609459200000, amount: 16.471406461787012 },
  { timestamp: 1612137600000, amount: 295.03720684845143 },
  { timestamp: 1614556800000, amount: 331.85485046955125 },
  { timestamp: 1617235200000, amount: 345.067534670094 },
  { timestamp: 1619827200000, amount: 593.9962723501397 },
  { timestamp: 1622505600000, amount: 677.6659759310838 },
  { timestamp: 1625097600000, amount: 774.7386400192947 },
  { timestamp: 1627776000000, amount: 717.9373065207553 },
  { timestamp: 1630454400000, amount: 809.0529146407689 },
  { timestamp: 1633046400000, amount: 942.1059407783321 },
  { timestamp: 1635724800000, amount: 1154.5236106705133 },
  { timestamp: 1638316800000, amount: 1209.020864557717 },
];

const xScale = scaleTime<number>({
  domain: [Math.min(...data.map((h) => h.timestamp)), Math.max(...data.map((h) => h.timestamp))],
});

const yScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map((h) => h.amount))],
});

interface ChartProps {
  width: number;
}

const Chart: React.FC<ChartProps> = ({ width }) => {
  const willChange = useWillChange();

  const [height, setHeight] = React.useState(0);
  const [margin] = React.useState({
    top: 0,
    right: -2,
    bottom: -2,
    left: -2,
  });

  const innerWidth = Math.max(width - margin.left - margin.right, 0);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  React.useEffect(() => {
    setHeight(window.innerHeight * 0.5);
  }, []);

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ willChange }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, bounce: 0.25, mass: 0.5, damping: 10 }}
    >
      <defs>
        <linearGradient id="layout-chart-area-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="layout-chart-line-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity={1} />
          <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Group left={margin.left} top={margin.top}>
        <AreaClosed
          curve={curveMonotoneX}
          data={data}
          x={(d) => xScale(d.timestamp)}
          y={(d) => yScale(d.amount)}
          yScale={yScale}
          strokeWidth={2}
          stroke="url(#layout-chart-line-gradient)"
          fill="url(#layout-chart-area-gradient)"
        />
      </Group>
    </motion.svg>
  );
};

export const AuthLayoutBackground: React.FC = () => {
  const willChange = useWillChange();

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="bg-grid pointer-events-none fixed inset-0"
        style={{ willChange }}
        initial={{ opacity: 0.1, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, bounce: 0 }}
      />
      <ParentSize
        debounceTime={10}
        className="pointer-events-none fixed inset-0 z-10 flex items-end overflow-hidden rounded-[inherit]"
      >
        {({ width }) => <Chart width={width} />}
      </ParentSize>
    </>
  );
};
