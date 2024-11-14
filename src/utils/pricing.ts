import type { Dimensions, PrintOptions } from '../types';

const GROMMET_PRICE = 1.00;
const MOUNTING_PRICE_PER_SQFT = 3.00;

export function calculatePrice(
  dimensions: Dimensions,
  materialPrice: number,
  options: PrintOptions
): number {
  const area = (dimensions.width * dimensions.height) / 144; // Convert to square feet
  const basePrice = area * materialPrice;
  const grommetsPrice = options.grommets ? options.grommetQuantity * GROMMET_PRICE : 0;
  const mountingPrice = options.mounting ? area * MOUNTING_PRICE_PER_SQFT : 0;
  
  let total = basePrice;
  
  if (options.rush) {
    total *= 1.25; // Add 25% for rush order
  }
  
  return total + grommetsPrice + mountingPrice;
}