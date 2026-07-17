import * as React from "react";
import { cn } from "@/utils/cn";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
}

export function SectionTitle({
  title,
  subtitle,
  alignment = "left",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        {
          "items-start text-left": alignment === "left",
          "items-center text-center": alignment === "center",
          "items-end text-right": alignment === "right",
        },
        className
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-foreground/70 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
