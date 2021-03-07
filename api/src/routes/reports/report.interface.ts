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

export interface MostContactedListing {
  ranking: number;
  id: string;
  make: string;
  price: number;
  mileage: number;
  contacts: number;
}

export interface ContactListingMonthData {
  total: number;
  monthData: { [key: string]: { [key: string]: number } };
  months: string[];
}

export interface MostContactedListingsByMonth {
  data: { month: string; listings: MostContactedListing[] }[];
}
