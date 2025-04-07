
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface PropertyTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PropertyTypeSelector = ({ value, onValueChange }: PropertyTypeSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs value={value} onValueChange={onValueChange}>
        <TabsList className="w-full sm:w-auto">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <TabsTrigger value="urbano">Urbano</TabsTrigger>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <TabsTrigger value="rural">Rural</TabsTrigger>
          </motion.div>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default PropertyTypeSelector;
