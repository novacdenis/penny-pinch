import React from "react";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid items-center gap-2 rounded-2xl border border-primary/10 p-5 pb-12 shadow-sm",
      className
    )}
    style={{
      gridTemplateAreas: `"title title" "value trend" "description description"`,
      gridTemplateColumns: "auto 1fr",
    }}
    {...props}
  />
));
Metric.displayName = "Metric";

export interface MetricTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const MetricTitle = React.forwardRef<HTMLHeadingElement, MetricTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-medium text-primary", className)}
      style={{ gridArea: "title" }}
      {...props}
    />
  )
);
MetricTitle.displayName = "MetricTitle";

export interface MetricValueProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const MetricValue = React.forwardRef<HTMLHeadingElement, MetricValueProps>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn("text-2xl font-bold text-primary", className)}
      style={{ gridArea: "value" }}
      {...props}
    />
  )
);
MetricValue.displayName = "MetricValue";

export interface MetricTrendProps extends React.HTMLAttributes<HTMLParagraphElement> {
  trend: "up" | "down";
}

const MetricTrend = React.forwardRef<HTMLParagraphElement, MetricTrendProps>(
  ({ trend, className, children, ...props }, ref) => {
    const icons = {
      up: faArrowUp,
      down: faArrowDown,
    } as const;

    return (
      <p
        ref={ref}
        className={cn(
          "inline-flex h-8 items-center rounded-full px-2.5",
          {
            "bg-green-600/20 text-green-600": trend === "up",
            "bg-orange-600/20 text-orange-600": trend === "down",
          },
          className
        )}
        style={{ gridArea: "trend", justifySelf: "start" }}
        {...props}
      >
        <FontAwesomeIcon icon={icons[trend]} className="h-4 w-4" />
        <span className="ml-1 text-base font-bold">{children}</span>
      </p>
    );
  }
);
MetricTrend.displayName = "MetricTrend";

export interface MetricDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const MetricDescription = React.forwardRef<HTMLParagraphElement, MetricDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-primary/70", className)}
      style={{ gridArea: "description" }}
      {...props}
    />
  )
);
MetricDescription.displayName = "MetricDescription";

export { Metric, MetricTitle, MetricValue, MetricTrend, MetricDescription };
