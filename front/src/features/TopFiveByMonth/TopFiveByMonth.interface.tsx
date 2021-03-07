export interface MostContactedListing {
  ranking: number;
  id: string;
  make: string;
  price: number;
  mileage: number;
  contacts: number;
}

export interface MostContactListingsMonth {
  month: string;
  listings: MostContactedListing[];
}

export interface MostContactedListingsByMonth {
  data: MostContactListingsMonth[];
}
