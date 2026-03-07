import { prisma } from "../config/prisma.js";




export const processBillingEvent = async (eventId: string) => {

  const event = await prisma.billingEvent.findUnique({
    where: { id: eventId }
  });

  if (!event) return;

  const start = new Date(event.createdAt);

  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + 1);

  await prisma.$transaction(async (tx) => {

    const invoice = await tx.invoice.upsert({
      where: {
        customerId_billingPeriodStart_billingPeriodEnd: {
          customerId: event.customerId,
          billingPeriodStart: start,
          billingPeriodEnd: end
        }
      },
      update: {},
      create: {
        customerId: event.customerId,
        billingPeriodStart: start,
        billingPeriodEnd: end,
        totalAmount: 0,
        status: "OPEN"
      }
    });

    const updated = await tx.billingEvent.updateMany({
      where: {
        id: event.id,
        invoiceId: null
      },
      data: {
        invoiceId: invoice.id
      }
    });

    if (updated.count === 0) return;

    await tx.invoiceItem.create({
      data: {
        invoiceId: invoice.id,
        billingEventId: event.id,
        description: event.eventType,
        quantity: event.quantity,
        unitPrice: event.unitPrice,
        totalAmount: event.totalAmount
      }
    });

    await tx.invoice.update({
      where: { id: invoice.id },
      data: {
        totalAmount: {
          increment: event.totalAmount
        }
      }
    });

  });

};