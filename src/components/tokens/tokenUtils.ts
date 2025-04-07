
/**
 * Format a numeric value as currency in BRL
 */
export const formatCurrency = (num: number, isWholePrice: boolean): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: isWholePrice ? 0 : 2,
    maximumFractionDigits: isWholePrice ? 0 : 2,
  }).format(num);
};
