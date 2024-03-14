"use client";

import type { Expense } from "../types";
import React from "react";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStack } from "@visx/shape";
import { Text } from "@visx/text";
import styles from "./expenses-chart.module.css";

const query = "(max-width: 768px)";

const numberFormatter = new Intl.NumberFormat("ro-MD", {
  notation: "compact",
});

const dateFormatter = new Intl.DateTimeFormat("ro-MD", {
  month: "narrow",
});

interface VisualizationProps {
  width: number;
  height: number;
  data: Expense[];
}

const Visualization: React.FC<VisualizationProps> = ({ width, height, data }) => {
  const [margin, setMargin] = React.useState({
    top: 15,
    right: 0,
    bottom: 25,
    left: 40,
  });

  const innerWidth = Math.max(width - margin.left - margin.right, 0);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

  const xScale = React.useMemo(() => {
    return scaleBand<number>({
      domain: data.map((d) => d.timestamp),
      padding: 0.2,
    });
  }, [data]);

  const yScale = React.useMemo(() => {
    return scaleLinear<number>({
      domain: [0, Math.max(...data.map((d) => d.total))],
      nice: true,
    });
  }, [data]);

  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  const colorScale = React.useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: ["household", "transport", "food", "utilities", "other"],
      range: ["#f56565", "#68d391", "#ecc94b", "#4299e1", "#9f7aea"],
    });
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const onResize = () => {
      setMargin((prev) => ({
        ...prev,
        left: media.matches ? 40 : 45,
      }));
    };

    media.addEventListener("change", onResize);
    onResize();

    return () => {
      media.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="gradient-household" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f56565" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#f56565" stopOpacity={0.8} />
        </linearGradient>
        <linearGradient id="gradient-transport" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#68d391" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#68d391" stopOpacity={0.8} />
        </linearGradient>
        <linearGradient id="gradient-food" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ecc94b" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#ecc94b" stopOpacity={0.8} />
        </linearGradient>
        <linearGradient id="gradient-utilities" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4299e1" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#4299e1" stopOpacity={0.8} />
        </linearGradient>
        <linearGradient id="gradient-other" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9f7aea" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#9f7aea" stopOpacity={0.8} />
        </linearGradient>
      </defs>
      <Group left={margin.left} top={margin.top}>
        <Group className="bars">
          <BarStack<Expense, string>
            data={data}
            keys={["household", "transport", "food", "utilities", "other"]}
            x={(d) => d.timestamp}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  return (
                    <React.Fragment key={`bar-stack-${barStack.index}-${bar.index}`}>
                      <rect
                        key={`bar-stack-${barStack.index}-${bar.index}`}
                        x={bar.x}
                        y={bar.y + 2}
                        height={Math.max(0, bar.height - 2)}
                        width={bar.width}
                        fill={`url(#gradient-${barStack.key})`}
                        rx={2}
                        ry={2}
                      />
                    </React.Fragment>
                  );
                })
              )
            }
          </BarStack>
        </Group>

        <Group className="axes">
          <AxisBottom
            scale={xScale}
            top={innerHeight}
            axisLineClassName={styles.axisLine}
            tickLineProps={{ className: styles.tickLine }}
            tickFormat={(value) => dateFormatter.format(value.valueOf())}
            tickComponent={({ formattedValue, ...rest }) => (
              <Text {...rest} className={styles.tickLabel}>
                {formattedValue}
              </Text>
            )}
          />
          <AxisLeft
            scale={yScale}
            axisLineClassName={styles.axisLine}
            tickLineProps={{ className: styles.tickLine }}
            tickFormat={(value) => numberFormatter.format(value.valueOf())}
            tickComponent={({ formattedValue, ...rest }) => (
              <Text {...rest} className={styles.tickLabel}>
                {formattedValue}
              </Text>
            )}
          />
        </Group>
      </Group>
    </svg>
  );
};

export interface ExpensesChartProps extends Omit<VisualizationProps, "width" | "height"> {}

export const ExpensesChart: React.FC<ExpensesChartProps> = (props) => {
  return (
    <ParentSize debounceTime={10}>
      {({ width, height }) => <Visualization width={width} height={height} {...props} />}
    </ParentSize>
  );
};
