import express, { Request, Response } from 'express';
import * as ReportService from './report.service';
import {
  AverageSellerPrice,
  DistributionData,
  PopularAveragePrice,
  MostContactedListingsByMonth,
} from './report.interface';

export const reportRouter = express.Router();

// GET data for seller average
reportRouter.get('/average', async (req: Request, res: Response) => {
  try {
    const averageSellerPrice: AverageSellerPrice = await ReportService.getAverageSellerPrice();

    res.status(200).send(averageSellerPrice);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET data for distributions
reportRouter.get('/distribution', async (req: Request, res: Response) => {
  try {
    const distributionData: DistributionData = await ReportService.getDistributionData();

    res.status(200).send(distributionData);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET average price of top 30%
reportRouter.get(
  '/averagePopularPrice',
  async (req: Request, res: Response) => {
    try {
      const averagePrice: PopularAveragePrice = await ReportService.getPopularAveragePrice();

      res.status(200).send(averagePrice);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

// GET top 5 listings by month
reportRouter.get(
  '/mostContactedListings',
  async (req: Request, res: Response) => {
    try {
      const mostContactedListings: MostContactedListingsByMonth = await ReportService.getMostContactsListings();

      res.status(200).send(mostContactedListings);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);
