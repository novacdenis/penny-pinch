import React from "react";
import { cn } from "@/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("container mt-10", className)} {...props}>
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const SectionHeader = React.forwardRef<HTMLElement, SectionHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <header ref={ref} {...props}>
        {children}
      </header>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2 ref={ref} className={cn("text-lg font-semibold md:text-xl", className)} {...props}>
        {children}
      </h2>
    );
  }
);
SectionTitle.displayName = "SectionTitle";

export interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const SectionDescription = React.forwardRef<HTMLParagraphElement, SectionDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("mt-0.5 text-sm text-muted-foreground md:text-base", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
SectionDescription.displayName = "SectionDescription";

export interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionContent = React.forwardRef<HTMLDivElement, SectionContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mt-5", className)} {...props}>
        {children}
      </div>
    );
  }
);
SectionContent.displayName = "SectionContent";

export interface SectionFooterProps extends React.HTMLAttributes<HTMLElement> {}

const SectionFooter = React.forwardRef<HTMLElement, SectionFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn("mt-5", className)} {...props}>
        {children}
      </footer>
    );
  }
);
SectionFooter.displayName = "SectionFooter";

export { Section, SectionHeader, SectionTitle, SectionDescription, SectionContent, SectionFooter };
