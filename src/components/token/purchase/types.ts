
import { Token } from "@/lib/models";

export type PurchaseStep = "input" | "summary" | "password";

export interface StepProps {
  token: Token;
  onPrevious: () => void;
  onNext: () => void;
  amount: number;
  onAmountChange: (amount: number) => void;
  isProcessing?: boolean;
  minimumFractions: number;
  minimumInvestment: number;
  maxFractions: number;  // Added this line to resolve the TypeScript error
  walletPassword?: string;
  onWalletPasswordChange?: (password: string) => void;
  onConfirmPurchase?: () => void;
}

