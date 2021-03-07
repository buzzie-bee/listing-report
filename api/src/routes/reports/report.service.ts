import {
  AverageSellerPrice,
  Contact,
  ContactListingIdData,
  Distribution,
  DistributionData,
  Listing,
  ListingSellerData,
  ListingsMakeData,
  ListingsObject,
  PopularAveragePrice,
} from './report.interface';
import fs from 'fs';
import csvParse from 'csv-parse';

const processFile = async (fileName: string, cast = true) => {
  // Parses the listing csv and returns an array of Listing objects

  const records = [];

  const parser = fs.createReadStream(fileName).pipe(
    csvParse({
      columns: true,
      cast: (value) => {
        if (
          cast &&
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
    records.push(record);
  }
  return records;
};

export const getAverageSellerPrice = async (): Promise<AverageSellerPrice> => {
  // Gets the data from the listings, reduces it to get the count and pricing for each seller type
  // Then calculates the average.
  // Returns -1 in the fields if there were any errors

  const records: Listing[] = await processFile('./data/listings.csv');

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

export const getDistributionData = async (): Promise<DistributionData> => {
  // reduce the listings.csv data to find number of times each make appears and then
  // calculate distribution of each

  const records: Listing[] = await processFile('./data/listings.csv');

  const initData: ListingsMakeData = {
    total: 0,
    makeData: {},
    makes: [],
  };

  // Reduce makeData into total, count for each make, and array of makes for mapping
  const makeData = records.reduce((data, { make }: Listing) => {
    try {
      if (data.makeData[make]) {
        data.makeData[make]++;
      } else {
        data.makes.push(make);
        data.makeData[make] = 1;
      }
      data.total++;
      return data;
    } catch (err) {
      throw err;
    }
  }, initData);

  const distributionData: Distribution[] = makeData.makes.map((make) => {
    const percentage = (makeData.makeData[make] / makeData.total) * 100;
    const distribution = Math.floor(percentage);
    return {
      make,
      distribution,
    };
  });

  //Sort distribution data by distribution amount
  distributionData.sort(
    (a: Distribution, b: Distribution) => b.distribution - a.distribution
  );

  // If we have a total and we have distribution data return
  if (makeData.total > 0 && distributionData.length) {
    return {
      total: makeData.total,
      distributionData,
    };
  }

  // Otherwise return -1
  return {
    total: -1,
    distributionData: [],
  };
};

const convertListingsArrayToObject = (listings: Listing[]): ListingsObject => {
  const initData: ListingsObject = {};

  return listings.reduce((data, listing: Listing) => {
    data[listing.id.toString()] = listing;
    return data;
  }, initData);
};

export const getPopularAveragePrice = async (): Promise<PopularAveragePrice> => {
  try {
    const contacts: Contact[] = await processFile('./data/contacts.csv');
    const listingsArray: Listing[] = await processFile('./data/listings.csv');

    const listings: ListingsObject = convertListingsArrayToObject(
      listingsArray
    );

    const initContactData: ContactListingIdData = {
      total: 0,
      idCounts: {},
      ids: [],
    };

    const listingData: ContactListingIdData = contacts.reduce(
      (data, { listing_id }: Contact) => {
        const id: string = listing_id.toString();

        if (data.idCounts[id]) {
          data.idCounts[id]++;
        } else {
          data.ids.push(id);
          data.idCounts[id] = 1;
        }
        data.total++;
        return data;
      },
      initContactData
    );

    listingData.ids.sort(
      (a: string, b: string) =>
        listingData.idCounts[b] - listingData.idCounts[a]
    );

    const thirtyPercentPos = Math.floor(listingData.total * 0.3);

    const popularIds = listingData.ids.slice(0, thirtyPercentPos);

    const totalPopularPrice = popularIds.reduce((total, id: string) => {
      if (listings[id]) {
        total += listings[id].price;
      }

      return total;
    }, 0);

    const averagePrice = Math.round(totalPopularPrice / thirtyPercentPos);

    return { averagePrice };
  } catch (error) {
    return {
      averagePrice: -1,
    };
  }
};
