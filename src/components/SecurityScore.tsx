
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Shield, ShieldCheck, AlertTriangle, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityScoreProps {
  score: number;
  className?: string;
  showAnimation?: boolean;
}

const SecurityScore: React.FC<SecurityScoreProps> = ({ score, className, showAnimation = true }) => {
  const getColor = () => {
    if (score >= 80) return "text-security-green";
    if (score >= 60) return "text-security-lightBlue";
    if (score >= 40) return "text-security-yellow";
    return "text-security-red";
  };

  const getScoreIcon = () => {
    const iconClass = showAnimation ? "animate-shield" : "";
    
    if (score >= 80) return <ShieldCheck className={`h-10 w-10 text-security-green ${iconClass}`} />;
    if (score >= 60) return <Shield className={`h-10 w-10 text-security-lightBlue ${iconClass}`} />;
    if (score >= 40) return <AlertTriangle className={`h-10 w-10 text-security-yellow ${iconClass}`} />;
    return <ShieldX className={`h-10 w-10 text-security-red ${iconClass}`} />;
  };

  const getProgressColor = () => {
    if (score >= 80) return "bg-security-green";
    if (score >= 60) return "bg-security-lightBlue";
    if (score >= 40) return "bg-security-yellow";
    return "bg-security-red";
  };

  return (
    <div className={cn("flex flex-col items-center p-6 rounded-lg shadow-lg bg-white", className)}>
      <div className="flex items-center gap-4 mb-2">
        {getScoreIcon()}
        <h3 className="text-2xl font-bold">Trust Score</h3>
      </div>
      <div className="text-5xl font-bold mb-4 flex items-center">
        <span className={getColor()}>{score}%</span>
      </div>
      <Progress value={score} className="h-3 w-full" indicatorClassName={getProgressColor()} />
      <div className="mt-4 text-sm text-gray-600">
        {score >= 80 && "This website appears highly trustworthy"}
        {score >= 60 && score < 80 && "This website appears reasonably trustworthy"}
        {score >= 40 && score < 60 && "This website has some trust concerns"}
        {score < 40 && "This website has significant trust issues"}
      </div>
    </div>
  );
};

export default SecurityScore;
