
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield } from "lucide-react";
import { analyzeWebsite } from "@/lib/securityAnalyzer";
import { AnalysisResult } from "@/lib/types";

interface UrlAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  className?: string;
}

const UrlAnalyzer: React.FC<UrlAnalyzerProps> = ({ onAnalysisComplete, className }) => {
  const [url, setUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic URL validation
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    
    let formattedUrl = url;
    // Add https:// if not provided
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }
    
    try {
      // Check if URL is valid
      new URL(formattedUrl);
      
      setIsAnalyzing(true);
      try {
        const result = await analyzeWebsite(formattedUrl);
        onAnalysisComplete(result);
      } catch (err) {
        setError("Error analyzing website. Please try again.");
        console.error(err);
      } finally {
        setIsAnalyzing(false);
      }
    } catch (err) {
      setError("Please enter a valid URL");
    }
  };

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-security-purple animate-shield" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Website Security Analyzer</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Enter a website URL below to analyze its security and trustworthiness. 
          Our AI-powered tool will evaluate multiple security factors and provide a trust score.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter website URL (e.g., example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isAnalyzing}
            className="bg-security-purple hover:bg-security-lightPurple"
          >
            {isAnalyzing ? (
              <>
                <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> Analyze
              </>
            )}
          </Button>
        </div>
        {error && <p className="mt-2 text-security-red text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default UrlAnalyzer;
