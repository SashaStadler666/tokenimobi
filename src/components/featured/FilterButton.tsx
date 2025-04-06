
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FilterButtonProps {
  showFilters: boolean;
  onClick: () => void;
}

const FilterButton = ({ showFilters, onClick }: FilterButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Filter className="h-4 w-4" />
      Filtros
    </Button>
  );
};

export default FilterButton;
