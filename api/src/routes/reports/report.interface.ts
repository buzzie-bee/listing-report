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

export interface Distribution {
  make: string;
  distribution: number;
}

export interface ListingsMakeData {
  total: number;
  makeData: {
    [key: string]: number;
  };
  makes: string[];
}

export interface DistributionData {
  total: number;
  distributionData: Distribution[];
}

export interface PopularAveragePrice {
  averagePrice: number;
}

export interface Listing {
  id: number;
  make: string;
  price: number;
  mileage: number;
  seller_type: 'dealer' | 'private' | 'other';
}

export interface Contact {
  listing_id: number;
  contact_date: number;
}

export interface ContactListingIdData {
  total: number;
  idCounts: {
    [key: string]: number;
  };
  ids: string[];
}

export interface ListingsObject {
  [key: string]: Listing;
}

export interface MostContactedListings {
  [key: string]: Listing;
}
