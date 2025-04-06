
import CategoryTabs from "./CategoryTabs";

interface FeaturedHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FeaturedHeader = ({ activeTab, setActiveTab }: FeaturedHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-2">Propriedades em Destaque</h2>
        <p className="text-muted-foreground">Invista em imóveis urbanos e rurais com alto potencial de valorização e renda</p>
      </div>
      <CategoryTabs activeTab={activeTab} onValueChange={setActiveTab} />
    </div>
  );
};

export default FeaturedHeader;
