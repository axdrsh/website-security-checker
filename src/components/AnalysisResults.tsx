
import React from "react";
import SecurityScore from "./SecurityScore";
import SecurityFactor from "./SecurityFactor";
import { AnalysisResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CardGradient } from "@/components/ui/card-gradient";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
  className?: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  result, 
  onReset,
  className 
}) => {
  return (
    <div className={className}>
      <Button 
        variant="ghost" 
        onClick={onReset} 
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Analyze Another Website
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <SecurityScore score={result.trustScore} />
        </div>
        <CardGradient className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Website Information</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">URL:</span> {result.url}</p>
            <p><span className="font-semibold">Title:</span> {result.title || "Unknown"}</p>
            <p><span className="font-semibold">Server:</span> {result.server || "Unknown"}</p>
            <p>
              <span className="font-semibold">Protocol:</span>{" "}
              {result.https ? (
                <span className="text-security-green">HTTPS (Secure)</span>
              ) : (
                <span className="text-security-red">HTTP (Insecure)</span>
              )}
            </p>
          </div>
        </CardGradient>
      </div>

      <CardGradient className="mb-8">
        <h2 className="text-xl font-bold mb-4">Security Analysis</h2>
        <div className="space-y-4">
          {result.factors.map((factor, index) => (
            <SecurityFactor
              key={index}
              title={factor.title}
              description={factor.description}
              status={factor.status}
              impact={factor.impact}
            />
          ))}
        </div>
      </CardGradient>

      <CardGradient>
        <h2 className="text-xl font-bold mb-4">Analysis Summary</h2>
        <p className="text-gray-600 mb-4">{result.summary}</p>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 mb-2">
            <strong>Note:</strong> This analysis provides a basic assessment based on available information. 
            For a comprehensive security audit, consider professional security services.
          </p>
          <p className="text-sm text-gray-500">
            Analysis performed: {new Date().toLocaleString()}
          </p>
        </div>
      </CardGradient>
    </div>
  );
};

export default AnalysisResults;
