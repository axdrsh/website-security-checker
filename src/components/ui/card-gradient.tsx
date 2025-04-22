
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardGradientProps {
  className?: string;
  children: React.ReactNode;
}

export function CardGradient({ className, children }: CardGradientProps) {
  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden p-6 md:p-8",
      "bg-gradient-to-br from-security-purple/10 via-security-lightPurple/5 to-security-blue/10",
      "border border-white/20 shadow-xl",
      className
    )}>
      {children}
    </div>
  );
}
