
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

interface RuralFiltersProps {
  form: UseFormReturn<FilterValues>;
}

const RuralFilters = ({ form }: RuralFiltersProps) => {
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
                <Input placeholder="Estado, Região" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tamanho (hectares)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="small">Até 100</SelectItem>
                  <SelectItem value="medium">100-500</SelectItem>
                  <SelectItem value="large">500-1000</SelectItem>
                  <SelectItem value="xlarge">Acima de 1000</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productivityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Produção</FormLabel>
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
                  <SelectItem value="cattle">Pecuária</SelectItem>
                  <SelectItem value="crops">Agricultura</SelectItem>
                  <SelectItem value="mixed">Misto</SelectItem>
                  <SelectItem value="forestry">Florestal</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default RuralFilters;
