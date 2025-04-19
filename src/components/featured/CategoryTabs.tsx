
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Home, Building, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryTabsProps {
  activeTab: string;
  onValueChange: (value: string) => void;
}

const CategoryTabs = ({ activeTab, onValueChange }: CategoryTabsProps) => {
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    onValueChange(value);
    switch (value) {
      case "all":
        navigate("/tokens");
        break;
      case "residential":
        navigate("/tokens?type=residential");
        break;
      case "commercial":
        navigate("/tokens?type=commercial");
        break;
      case "performance":
        navigate("/tokens?type=performance");
        break;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full md:w-auto mt-4 md:mt-0">
      <TabsList className="grid w-full md:w-auto grid-cols-4">
        <TabsTrigger value="all" className="flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Todos</span>
        </TabsTrigger>
        <TabsTrigger value="residential" className="flex items-center">
          <Home className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Residencial</span>
        </TabsTrigger>
        <TabsTrigger value="commercial" className="flex items-center">
          <Building className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Comercial</span>
        </TabsTrigger>
        <TabsTrigger value="performance" className="flex items-center">
          <TrendingUp className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Rentabilidade</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
