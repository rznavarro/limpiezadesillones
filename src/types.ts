export type CategoryId = 'sillones' | 'colchones' | 'sillas' | 'hogar';

export type VehicleTypeId = 'city' | 'station' | 'tres_corridas';

export interface PricingItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // In CLP (net)
  unitLabel?: string; // e.g. "por unidad", "por m²"
  isSqMeters?: boolean;
  minSqMeters?: number;
  badge?: string; // e.g. "Mejor precio"
  description?: string;
  image?: string;
}

export interface AutoPricingItem {
  id: string;
  name: string;
  prices: {
    city: number;
    station: number;
    tres_corridas: number;
  };
  badge?: string; // e.g. "Más solicitado", "Mejor precio"
  description?: string;
  note?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
  isSqMeters?: boolean;
  vehicleTypeLabel?: string;
}
