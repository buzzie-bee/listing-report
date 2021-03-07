import express, { Request, Response } from 'express';
import * as ReportService from './report.service';
import { AverageSellerPrice } from './report.interface';

export const reportRouter = express.Router();

// GET default route
reportRouter.get('/average', async (req: Request, res: Response) => {
  try {
    const averageSellerPrice: AverageSellerPrice = await ReportService.getAverageSellerPrice();

    res.status(200).send(averageSellerPrice);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
