import { billingQueue } from "../config/queue.js";




export const scheduleBillingJobs = async () => {
  await billingQueue.add(
    "closeBillingPeriodInvoices",
    {},
    {
      jobId: "close-billing-period",
      repeat: {
        pattern: "0 * * * *",
      },
    }
  );
};