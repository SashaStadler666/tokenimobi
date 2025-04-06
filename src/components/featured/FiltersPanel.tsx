
import { useState } from "react";
import { useForm } from "react-hook-form";
import UrbanFilters from "./filters/UrbanFilters";
import RuralFilters from "./filters/RuralFilters";

interface FilterValues {
  location?: string;
  propertyType?: string;
  minYield?: number;
  size?: string;
  productivityType?: string;
}

interface FiltersPanelProps {
  showFilters: boolean;
  propertyTypeTab: string;
}

const FiltersPanel = ({ showFilters, propertyTypeTab }: FiltersPanelProps) => {
  const urbanForm = useForm<FilterValues>({
    defaultValues: {
      location: "",
      propertyType: "",
      minYield: undefined,
    }
  });

  const ruralForm = useForm<FilterValues>({
    defaultValues: {
      location: "",
      size: "",
      productivityType: "",
    }
  });

  if (!showFilters) return null;

  return (
    <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-muted">
      {propertyTypeTab === "urbano" ? (
        <UrbanFilters form={urbanForm} />
      ) : (
        <RuralFilters form={ruralForm} />
      )}
    </div>
  );
};

export default FiltersPanel;
