
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PropertyTypeSelector = ({ value, onValueChange }: PropertyTypeSelectorProps) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <Tabs value={value} onValueChange={onValueChange}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="urbano">Urbano</TabsTrigger>
            <TabsTrigger value="rural">Rural</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyTypeSelector;
