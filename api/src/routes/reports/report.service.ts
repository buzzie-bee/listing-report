// .service contains all the data fetching
import fs from 'fs';
import csvParse from 'csv-parse';

import {
  AverageSellerPrice,
  Contact,
  ContactListingIdData,
  ContactListingMonthData,
  Distribution,
  DistributionData,
  Listing,
  ListingSellerData,
  ListingsMakeData,
  ListingsObject,
  MostContactedListing,
  MostContactedListingsByMonth,
  PopularAveragePrice,
} from './report.interface';

const processFile = async (fileName: string, cast = true) => {
  // Parses the listing csv and returns an array of Listing objects
  // Casts number strings into Numbers

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

  // Reduce by seller_type
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

    // Calculate avg pricing for each seller - TODO add div by 0 check
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
  // Takes in the listing array provided by csv-parse and converts it to an object
  // Do this to save having to index through the array to find a match each time
  const initData: ListingsObject = {};

  return listings.reduce((data, listing: Listing) => {
    data[listing.id.toString()] = listing;
    return data;
  }, initData);
};

export const getPopularAveragePrice = async (): Promise<PopularAveragePrice> => {
  // Find the top 30% contacted listings and calculate avg price
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

    const contactData: ContactListingIdData = contacts.reduce(
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

    contactData.ids.sort(
      (a: string, b: string) =>
        contactData.idCounts[b] - contactData.idCounts[a]
    );

    const listingCount = contactData.ids.length;
    const thirtyPercentPos = Math.floor(listingCount * 0.3);

    const popularIds = contactData.ids.slice(0, thirtyPercentPos);

    const totalPopularPrice = popularIds.reduce((total, id: string) => {
      if (listings[id]) {
        total += listings[id].price;
      }

      return total;
    }, 0);

    // Using Math.round instead of Math.floor as if the avg is 99.99 you want it to say 100
    const averagePrice = Math.round(totalPopularPrice / thirtyPercentPos);

    return { averagePrice };
  } catch (error) {
    return {
      averagePrice: -1,
    };
  }
};

const formatDate = (timestamp: number): string => {
  // Takes in a unix timestamp and converts it into a date string (eg. 2020-03) for use as key
  if (isNaN(timestamp)) {
    throw 'timestamp is not a number';
  }
  if (!(new Date(timestamp).getTime() > 0)) {
    throw 'Could not parse timestamp';
  }

  const date = new Date(timestamp);
  const dateString = date.toISOString().substr(0, 7);

  return dateString;
};

export const getMostContactsListings = async (): Promise<MostContactedListingsByMonth> => {
  // Split the contact ids into months, sort by contacts per id, grab data from listings, and return

  try {
    const contacts: Contact[] = await processFile('./data/contacts.csv');

    const listingsArray: Listing[] = await processFile('./data/listings.csv');
    const listings: ListingsObject = convertListingsArrayToObject(
      listingsArray
    );

    const initContactMonthData: ContactListingMonthData = {
      total: 0,
      monthData: {},
      months: [],
    };

    const contactMonthData: ContactListingMonthData = contacts.reduce(
      (data, { listing_id, contact_date }: Contact) => {
        const id: string = listing_id.toString();
        const month = formatDate(contact_date);

        if (data.monthData[month]) {
          if (data.monthData[month][id]) {
            data.monthData[month][id]++;
          } else {
            data.monthData[month][id] = 1;
          }
        } else {
          data.months.push(month);
          data.monthData[month] = { [id]: 1 };
        }

        data.total++;
        return data;
      },
      initContactMonthData
    );

    if (contactMonthData.total === 0) {
      throw 'No month data';
    }

    const monthData = contactMonthData.months.map((month) => {
      const allContacts = Object.entries(contactMonthData.monthData[month]).map(
        (data) => data
      );
      allContacts.sort(
        (a: [string, number], b: [string, number]) => b[1] - a[1]
      );

      const topFiveListings = allContacts.slice(0, 5);

      const monthListings: MostContactedListing[] = topFiveListings.map(
        ([id, count]: [string, number], idx: number) => {
          return {
            ranking: idx + 1,
            id: id,
            make: listings[id].make,
            price: listings[id].price,
            mileage: listings[id].mileage,
            contacts: count,
          };
        }
      );

      return { month, listings: monthListings };
    });

    return {
      data: monthData,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
    };
  }
};
