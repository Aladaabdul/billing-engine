import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { closeBillingPeriodInvoices } from "../services/closeBillingPeriod.js";



export const billingWorker = new Worker(
  "billing",
  async (job) => {
    console.log(`Starting job: ${job.name} (${job.id})`);

    switch (job.name) {
      case "closeBillingPeriodInvoices":
        await closeBillingPeriodInvoices();
        break;

      default:
        console.warn(`Unknown job: ${job.name}`);
    }

    console.log(`Finished job: ${job.name} (${job.id})`);
  },
  {
    connection: redisConnection,
  }
);

console.log("Billing worker started and waiting for jobs...");