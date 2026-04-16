export interface Car {
  id: string;
  name: string;
  tagline: string;
  type: 'sedan' | 'suv' | 'sports' | 'electric';
  priceInr: number;
  range: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  features: string[];
  image: string;
  safetyRating: number;
  isFlagship?: boolean;
}

export const cars: Car[] = [
  {
    id: 'velox-gt',
    name: 'Velox GT',
    tagline: 'Pure Electric Performance',
    type: 'sports',
    priceInr: 18500000,
    range: '520 km',
    power: '750 BHP',
    acceleration: '2.8s',
    topSpeed: '320 km/h',
    features: ['Dual Motor AWD', 'Autopilot Pro', 'Panoramic Roof', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=500&fit=crop',
    safetyRating: 5,
    isFlagship: true
  },
  {
    id: 'terra-x',
    name: 'Terra X',
    tagline: 'Adventure Awaits',
    type: 'suv',
    priceInr: 15200000,
    range: '480 km',
    power: '520 BHP',
    acceleration: '4.2s',
    topSpeed: '250 km/h',
    features: ['All-Terrain Drive', '7 Seater', 'Towing Package', 'Off-Road Mode'],
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop',
    safetyRating: 5
  },
  {
    id: 'aurora-s',
    name: 'Aurora S',
    tagline: 'Elegance Redefined',
    type: 'sedan',
    priceInr: 9800000,
    range: '600 km',
    power: '400 BHP',
    acceleration: '3.8s',
    topSpeed: '280 km/h',
    features: ['Executive Lounge', 'Ambient Lighting', 'Massage Seats', 'Privacy Glass'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop',
    safetyRating: 5
  },
  {
    id: 'ion-pro',
    name: 'Ion Pro',
    tagline: 'The Future Commute',
    type: 'electric',
    priceInr: 7200000,
    range: '450 km',
    power: '350 BHP',
    acceleration: '5.1s',
    topSpeed: '220 km/h',
    features: ['Compact Design', 'Fast Charging', 'City Mode', 'Smart Connect'],
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=500&fit=crop',
    safetyRating: 4
  },
  {
    id: 'terra-max',
    name: 'Terra Max',
    tagline: 'Family, Redefined',
    type: 'suv',
    priceInr: 18500000,
    range: '550 km',
    power: '600 BHP',
    acceleration: '4.5s',
    topSpeed: '260 km/h',
    features: ['8 Seater', 'Entertainment System', 'Climate Control', '360 Camera'],
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
    safetyRating: 5
  },
  {
    id: 'spark-ev',
    name: 'Spark EV',
    tagline: 'Affordable Innovation',
    type: 'electric',
    priceInr: 5500000,
    range: '350 km',
    power: '200 BHP',
    acceleration: '6.5s',
    topSpeed: '180 km/h',
    features: ['Budget-Friendly', 'Low Maintenance', 'City Optimized', 'Easy Charging'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop',
    safetyRating: 4
  }
];

export const formatPrice = (price: number, currency: 'INR' | 'USD' = 'INR'): string => {
  if (currency === 'USD') {
    return `$${(price / 83).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  }
  return `₹${(price / 100000).toFixed(2)} Lakhs`;
};
