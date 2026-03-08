import dotenv from 'dotenv';

dotenv.config();



export const env = {
  port: process.env.PORT || 8000,
  database_url: process.env.DATABASE_URL,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  SQS_QUEUE_URL: process.env.SQS_QUEUE_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
};