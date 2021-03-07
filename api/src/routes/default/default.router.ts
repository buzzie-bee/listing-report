import express, { Request, Response } from 'express';
import * as DefaultService from './default.service';
import { DefaultMessage } from './default.interface';

export const defaultRouter = express.Router();

// GET default route
defaultRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { message }: DefaultMessage = await DefaultService.findOne();

    res.status(200).send(message);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
