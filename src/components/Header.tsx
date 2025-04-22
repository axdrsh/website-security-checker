import React from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200", className)}>
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-security-purple" />
        <span className="font-bold text-xl">TrustOracle</span>
      </div>
      {/* Removed unnecessary navigation links */}
    </header>
  );
};

export default Header;
