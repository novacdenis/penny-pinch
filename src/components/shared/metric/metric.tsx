import React from "react";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils";
import { MetricChart, type Trend } from "./metric-chart";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  difference: number;
  description: string;
  trend: Trend[];
}

export const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ title, value, difference, description, trend, className, ...props }, ref) => {
    const direction = difference > 0 ? "up" : "down";
    const icons = { up: faArrowUp, down: faArrowDown } as const;

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl border border-primary/10 p-5 pb-12 shadow-sm",
          className
        )}
        {...props}
      >
        <h3 className={cn("font-medium text-primary", className)}>{title}</h3>
        <h4 className={cn("mt-2 text-2xl font-bold text-primary", className)}>
          <span>{value}</span>
          <p
            ref={ref}
            className={cn(
              "ml-2 inline-flex h-8 items-center rounded-full px-2.5",
              {
                "bg-green-600/20 text-green-600": direction === "up",
                "bg-orange-600/20 text-orange-600": direction === "down",
              },
              className
            )}
            style={{ gridArea: "trend", justifySelf: "start" }}
            {...props}
          >
            <FontAwesomeIcon icon={icons[direction]} className="h-4 w-4" />
            <span className="ml-1 text-base font-bold">{difference}%</span>
          </p>
        </h4>
        <p className={cn("mt-2 text-sm text-primary/70", className)}>{description}</p>
        <MetricChart data={trend} />
      </div>
    );
  }
);
Metric.displayName = "Metric";
