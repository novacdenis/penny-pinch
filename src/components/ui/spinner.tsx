import * as React from "react";
import { cn } from "@/utils";

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  variant?: "queued" | "running";
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ variant = "running", className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 16 16"
        fill="none"
        className={cn("h-6 w-6 animate-spin", className)}
        {...props}
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {variant === "running" && (
          <path
            d="M15 8a7.002 7.002 0 00-7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner };
