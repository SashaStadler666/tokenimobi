
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PropertyTypeSelector = ({ value, onValueChange }: PropertyTypeSelectorProps) => {
  return (
    <Tabs defaultValue={value} className="mb-10" onValueChange={onValueChange}>
      <div className="flex justify-between items-center mb-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="urbano">Urbano</TabsTrigger>
          <TabsTrigger value="rural">Rural</TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
};

export default PropertyTypeSelector;
