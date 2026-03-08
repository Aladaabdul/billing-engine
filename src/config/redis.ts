import { env } from "../config/env.js";


export const redisConnection = {
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
};