export interface AverageSellerPrice {
  dealer: number;
  private: number;
  other: number;
}

export interface DistributionData {
  [key: string]: number;
}

export interface AveragePopularPrice {
  averagePrice: number;
}

export interface Listing {
  id: number;
  make: string;
  price: number;
  mileage: number;
  sellerType: 'dealer' | 'private' | 'other';
}

export interface MostContactedListings {
  [key: number]: Listing;
}
