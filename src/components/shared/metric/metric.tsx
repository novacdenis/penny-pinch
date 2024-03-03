import React from "react";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative grid items-center gap-x-2 gap-y-1 rounded-2xl border border-primary/10 p-4 shadow-sm md:gap-y-2 md:p-5",
        "has-[.trend]:pb-7 md:has-[.trend]:pb-12",
        className
      )}
      style={{
        gridTemplateAreas: `"title title" "value delta" "description description"`,
        gridTemplateColumns: "auto 1fr",
      }}
      {...props}
    />
  );
});
Metric.displayName = "Metric";

export interface MetricTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const MetricTitle = React.forwardRef<HTMLHeadingElement, MetricTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-sm font-medium text-primary/90 md:text-base", className)}
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
      className={cn("text-xl font-bold text-primary md:text-2xl", className)}
      style={{ gridArea: "value" }}
      {...props}
    />
  )
);
MetricValue.displayName = "MetricValue";

export interface MetricDeltaProps extends React.HTMLAttributes<HTMLParagraphElement> {
  delta: "up" | "down";
}

const MetricDelta = React.forwardRef<HTMLParagraphElement, MetricDeltaProps>(
  ({ delta, className, children, ...props }, ref) => {
    const icons = { up: faArrowUp, down: faArrowDown } as const;

    return (
      <p
        ref={ref}
        className={cn(
          "inline-flex h-6 items-center rounded-full px-1.5 md:h-8 md:px-2.5",
          {
            "bg-green-600/20 text-green-600": delta === "up",
            "bg-orange-600/20 text-orange-600": delta === "down",
          },
          className
        )}
        style={{ gridArea: "delta", justifySelf: "start" }}
        {...props}
      >
        <FontAwesomeIcon icon={icons[delta]} className="size-3.5 md:size-4" />
        <span className="ml-1 text-sm font-semibold md:text-base">{children}</span>
      </p>
    );
  }
);
MetricDelta.displayName = "MetricDelta";

export interface MetricDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const MetricDescription = React.forwardRef<HTMLParagraphElement, MetricDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xs text-primary/70 md:text-sm", className)}
      style={{ gridArea: "description" }}
      {...props}
    />
  )
);
MetricDescription.displayName = "MetricDescription";

export { Metric, MetricTitle, MetricValue, MetricDelta, MetricDescription };
