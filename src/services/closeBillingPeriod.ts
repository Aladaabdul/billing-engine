import { prisma } from "../config/prisma.js";



export const closeBillingPeriodInvoices = async () => {

  const now = new Date();

  const result = await prisma.invoice.updateMany({
    where: {
      status: "OPEN",
      billingPeriodEnd: {
        lte: now,
      },
    },
    data: {
      status: "PENDING",
    },
  });

  console.log(`${result.count} invoices moved to PENDING`);
};