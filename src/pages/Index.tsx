
import React, { useState } from "react";
import UrlAnalyzer from "@/components/UrlAnalyzer";
import AnalysisResults from "@/components/AnalysisResults";
import Header from "@/components/Header";
import { CardGradient } from "@/components/ui/card-gradient";
import { AnalysisResult } from "@/lib/types";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
        {!analysisResult ? (
          <CardGradient className="mt-8">
            <UrlAnalyzer 
              onAnalysisComplete={handleAnalysisComplete} 
            />
          </CardGradient>
        ) : (
          <AnalysisResults 
            result={analysisResult} 
            onReset={handleReset} 
            className="mt-8"
          />
        )}
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Website Security Analyzer © {new Date().getFullYear()}</p>
        </footer>
      </div>
      </div>
    </div>
  );
};

export default Index;
