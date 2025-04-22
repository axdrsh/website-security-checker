
import { SecurityStatus } from "@/components/SecurityFactor";

export interface SecurityFactor {
  title: string;
  description: string;
  status: SecurityStatus;
  impact: number; // 1-10 scale
}

export interface AnalysisResult {
  url: string;
  title: string | null;
  https: boolean;
  server: string | null;
  trustScore: number;
  factors: SecurityFactor[];
  summary: string;
}
