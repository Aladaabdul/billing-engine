import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 8000,
  database_url: process.env.DATABASE_URL
};