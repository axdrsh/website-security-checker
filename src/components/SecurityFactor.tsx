
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";

export type SecurityStatus = "good" | "warning" | "bad" | "info";

interface SecurityFactorProps {
  title: string;
  description: string;
  status: SecurityStatus;
  impact: number; // 1-10 scale of how much this impacts the overall score
  className?: string;
}

const SecurityFactor: React.FC<SecurityFactorProps> = ({
  title,
  description,
  status,
  impact,
  className,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "good":
        return <CheckCircle2 className="h-5 w-5 text-security-green" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-security-yellow" />;
      case "bad":
        return <XCircle className="h-5 w-5 text-security-red" />;
      case "info":
        return <Info className="h-5 w-5 text-security-blue" />;
      default:
        return <Info className="h-5 w-5 text-security-blue" />;
    }
  };

  const getImpactText = () => {
    if (impact >= 8) return "Critical";
    if (impact >= 6) return "High";
    if (impact >= 4) return "Medium";
    return "Low";
  };

  const getImpactColor = () => {
    if (impact >= 8) return "bg-security-red text-white";
    if (impact >= 6) return "bg-security-yellow text-black";
    if (impact >= 4) return "bg-security-lightBlue text-white";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-md border border-gray-200",
        className
      )}
    >
      <div className="mt-1">{getStatusIcon()}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-lg">{title}</h4>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              getImpactColor()
            )}
          >
            {getImpactText()} Impact
          </span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default SecurityFactor;
