import { Queue } from "bullmq";
import { redisConnection } from "./redis.js";



export const billingQueue = new Queue("billing", {
  connection: redisConnection,
});