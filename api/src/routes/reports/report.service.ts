import { AverageSellerPrice } from './report.interface';

export const getAverageSellerPrice = async (): Promise<AverageSellerPrice> => {
  return {
    dealer: -1,
    private: -1,
    other: -1,
  };
};
