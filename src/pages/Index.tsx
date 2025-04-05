
import FeaturedTokens from "@/components/FeaturedTokens";
import MarketOverview from "@/components/MarketOverview";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MarketOverview />
      <FeaturedTokens />
    </div>
  );
};

export default Index;
