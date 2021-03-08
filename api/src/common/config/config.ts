import * as dotenv from 'dotenv';
import { ConfigType } from './config.interface';

dotenv.config();

const config: ConfigType = {
  PORT: parseInt(process.env.PORT as string, 10),
};

export default config;
