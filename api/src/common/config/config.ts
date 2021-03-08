import * as dotenv from 'dotenv';
import { ConfigType } from './config.interface';

dotenv.config();

const config: ConfigType = {
  PORT: process.env.PORT ? parseInt(process.env.PORT as string, 10) : 5000,
};

export default config;
