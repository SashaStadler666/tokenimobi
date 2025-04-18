
import { cn } from "@/lib/utils";

type NetworkStatus = "mainnet" | "testnet" | "wrong" | "disconnected";

interface NetworkIndicatorProps {
  status: NetworkStatus;
  className?: string;
}

const NetworkIndicator = ({ status, className }: NetworkIndicatorProps) => {
  const getStatusStyles = (status: NetworkStatus) => {
    switch (status) {
      case "mainnet":
        return "bg-emerald-500 text-white";
      case "testnet":
        return "bg-amber-500 text-white";
      case "wrong":
        return "bg-red-500 text-white";
      case "disconnected":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-5 right-5 px-4 py-2 rounded-full font-medium shadow-lg z-50",
        getStatusStyles(status),
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default NetworkIndicator;
