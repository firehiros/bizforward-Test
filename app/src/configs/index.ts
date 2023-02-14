import { config } from 'dotenv';

config();
export const PORT = process.env.PORT;
export const GMT_TIMEZONE = 'Asia/Tokyo';

export const DATABASE_CONFIG = {
  type: process.env.DATABASE_TYPE || 'mysql',
  host: process.env.DATABASE_HOST || '',
  port: process.env.DATABASE_PORT || 3306,
  database: process.env.DATABASE_NAME || '',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
};

export const ALLOW_HOST = process.env.ALLOW_HOST || [];
