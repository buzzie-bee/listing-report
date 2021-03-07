import express, { Request, Response } from 'express';
import * as ReportService from './report.service';
import { AverageSellerPrice, DistributionData } from './report.interface';

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

// GET data for seller average
reportRouter.get('/distribution', async (req: Request, res: Response) => {
  try {
    const distributionData: DistributionData = await ReportService.getDistributionData();

    res.status(200).send(distributionData);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
