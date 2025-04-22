
import React from "react";
import { AlertTriangle, Info, Link, Server, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface TipsSectionProps {
  className?: string;
}

const TipsSection: React.FC<TipsSectionProps> = ({ className }) => {
  const tips = [
    {
      icon: <Shield className="h-5 w-5 text-security-purple" />,
      title: "Look for HTTPS",
      description: "Always check that websites use HTTPS, especially for sensitive information or transactions."
    },
    {
      icon: <Link className="h-5 w-5 text-security-blue" />,
      title: "Verify Links",
      description: "Hover over links before clicking to verify they lead to legitimate destinations."
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-security-yellow" />,
      title: "Be Cautious with Data",
      description: "Avoid sharing sensitive information on websites you don't fully trust."
    },
    {
      icon: <Server className="h-5 w-5 text-security-lightPurple" />,
      title: "Check Website Age",
      description: "Newly created domains can sometimes be created for phishing or scam purposes."
    },
    {
      icon: <Info className="h-5 w-5 text-security-lightBlue" />,
      title: "Read Privacy Policies",
      description: "Understanding how a site uses your data is important for assessing trustworthiness."
    }
  ];

  return (
    <div className={cn("", className)}>
      <h2 className="text-xl font-bold mb-4">Security Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="mt-1">{tip.icon}</div>
            <div>
              <h4 className="font-medium">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsSection;
