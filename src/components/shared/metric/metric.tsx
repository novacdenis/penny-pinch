import React from "react";
import { cn } from "@/utils";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 rounded-2xl border border-primary/10 p-4 shadow-sm md:gap-y-2 md:p-5",
        "has-[.trend]:pb-7 md:has-[.trend]:pb-12",
        className
      )}
      style={{
        gridTemplateAreas: `"title title" "value delta" "description description"`,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
          focusable="false"
          className={cn("size-3.5 md:size-4", {
            "rotate-180": delta === "down",
          })}
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          />
        </svg>
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
