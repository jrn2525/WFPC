export interface Dimensions {
  width: number;
  height: number;
}

export type Material = string;

export interface MaterialType {
  id: string;
  name: string;
  price: number;
}

export interface PrintOptions {
  rush: boolean;
  grommets: boolean;
  grommetQuantity: number;
  mounting: boolean;
}

export interface BlueprintOptions {
  enabled: boolean;
  pagesPerSet: number;
  numberOfSets: number;
  bindingsPerSet: number;
  pagePrice: number;
  bindingPrice: number;
}

export interface PriceBreakdown {
  subtotal: number;
  fees: number;
  total: number;
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}