import {
  AverageSellerPrice,
  Listing,
  ListingSellerData,
} from './report.interface';
import fs from 'fs';
import csvParse from 'csv-parse';

const processListingFile = async (fileName: string) => {
  // Parses the listing csv and returns an array of Listing objects

  const records: Listing[] = [];

  const parser = fs.createReadStream(fileName).pipe(
    csvParse({
      columns: true,
      cast: (value) => {
        if (
          value &&
          typeof value === 'string' &&
          !Number.isNaN(Number(value))
        ) {
          return parseInt(value);
        } else {
          return value;
        }
      },
    })
  );

  for await (const record of parser) {
    // Casting for now. Need to implement validation
    records.push(record as Listing);
  }
  return records;
};

const calculateAverageSellerPrice = async (): Promise<AverageSellerPrice> => {
  // Gets the data from the listings, reduces it to get the count and pricing for each seller type
  // Then calculates the average.
  // Returns -1 in the fields if there were any errors

  const records: Listing[] = await processListingFile('./data/listings.csv');

  const sellerInitData: ListingSellerData = {
    errors: 0,
    dealers: 0,
    dealerTotalPrice: 0,
    privates: 0,
    privateTotalPrice: 0,
    others: 0,
    otherTotalPrice: 0,
  };

  const sellerData = records.reduce((data, { price, seller_type }: Listing) => {
    try {
      switch (seller_type) {
        case 'dealer':
          data.dealers++;
          data.dealerTotalPrice += price;
          return data;

        case 'private':
          data.privates++;
          data.privateTotalPrice += price;
        case 'other':
          data.others++;
          data.otherTotalPrice += price;
          return data;
        default:
          data.errors++;
          return data;
      }
    } catch (error) {
      throw error;
    }
  }, sellerInitData);

  if (sellerData.errors === 0) {
    const {
      dealers,
      dealerTotalPrice,
      privates,
      privateTotalPrice,
      others,
      otherTotalPrice,
    } = sellerData;

    const averagePricing: AverageSellerPrice = {
      dealer: Math.floor(dealerTotalPrice / dealers),
      private: Math.floor(privateTotalPrice / privates),
      other: Math.floor(otherTotalPrice / others),
    };

    return averagePricing;
  }

  return {
    dealer: -1,
    private: -1,
    other: -1,
  };
};

export const getAverageSellerPrice = async (): Promise<AverageSellerPrice> => {
  return calculateAverageSellerPrice();
};
