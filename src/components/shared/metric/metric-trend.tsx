"use client";

import React from "react";
import { curveMonotoneX } from "@visx/curve";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleTime } from "@visx/scale";
import { AreaClosed } from "@visx/shape";

export interface Trend {
  timestamp: number;
  amount: number;
}

export interface VisualizationProps {
  width: number;
  data: Trend[];
}

const Visualization: React.FC<VisualizationProps> = ({ width, data }) => {
  const [height, setHeight] = React.useState(0);
  const [margin, setMargin] = React.useState({
    top: 5,
    right: -2,
    bottom: -2,
    left: -2,
  });

  const innerWidth = Math.max(width - margin.left - margin.right, 0);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

  const xScale = React.useMemo(() => {
    const min = Math.min(...data.map((h) => h.timestamp));
    const max = Math.max(...data.map((h) => h.timestamp));

    return scaleTime<number>({
      domain: [min, max],
    });
  }, [data]);

  const yScale = React.useMemo(() => {
    const min = Math.min(...data.map((h) => h.amount));
    const max = Math.max(...data.map((h) => h.amount));

    return scaleTime<number>({
      domain: [min, max],
    });
  }, [data]);

  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onResize = () => {
      setHeight(media.matches ? 30 : 50);
      setMargin({
        top: media.matches ? 5 : 10,
        right: -2,
        bottom: -2,
        left: -2,
      });
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
        <linearGradient id="area-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="line-gradient" x1="0" x2="0" y1="0" y2="1">
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
          stroke="url(#line-gradient)"
          fill="url(#area-gradient)"
        />
      </Group>
    </svg>
  );
};

export interface MetricTrendProps extends Omit<VisualizationProps, "width" | "height"> {}

export const MetricTrend: React.FC<MetricTrendProps> = ({ ...props }) => {
  return (
    <ParentSize
      debounceTime={10}
      className="trend pointer-events-none absolute bottom-0 left-0 flex items-end overflow-hidden rounded-[inherit]"
    >
      {({ width }) => <Visualization width={width} {...props} />}
    </ParentSize>
  );
};
