export interface AverageSellerPrice {
  dealer: number;
  private: number;
  other: number;
}

export interface ListingSellerData {
  errors: number;
  dealers: number;
  dealerTotalPrice: number;
  privates: number;
  privateTotalPrice: number;
  others: number;
  otherTotalPrice: number;
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
  seller_type: 'dealer' | 'private' | 'other';
}

export interface MostContactedListings {
  [key: number]: Listing;
}
