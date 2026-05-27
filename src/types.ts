export interface Property {
  id: string;
  name: string;
  location: string;
  description: string;
  tag: string;
  image: string;
  images: string[];
  totalArea: string;
  totalPlots: number;
  landType: string;
  zoning: string;
  status: string;
  priceRange: string;
  avgPlotArea: string;
  isCustomBuildAvailable?: boolean;
}

export interface Plot {
  id: string;
  dimensions: string;
  area: string;
  price: number;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  setbacks: string;
  maxFar: string;
  notes: string;
  width: number;
  height: number;
}
