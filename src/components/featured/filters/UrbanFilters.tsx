
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface FilterValues {
  location?: string;
  propertyType?: string;
  minYield?: number;
  size?: string;
  productivityType?: string;
}

interface UrbanFiltersProps {
  form: UseFormReturn<FilterValues>;
}

const UrbanFilters = ({ form }: UrbanFiltersProps) => {
  return (
    <Form {...form}>
      <form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localização</FormLabel>
              <FormControl>
                <Input placeholder="Cidade, Estado" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Imóvel</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Apartamento">Apartamento</SelectItem>
                  <SelectItem value="Casa">Casa</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Flat">Flat</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minYield"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rendimento Mínimo (%)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 6" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default UrbanFilters;
