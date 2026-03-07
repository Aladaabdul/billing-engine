import { prisma } from "../config/prisma.js";
import { sendBillingEventToQueue } from "../utils/sendToQueue.js"


export async function publishOutboxEvents() {

  const events = await prisma.$transaction(async (tx) => {
    const pending = await tx.outboxEvent.findMany({
      where: {
        OR: [
        { status: "PENDING" },
        {
          status: "FAILED",
          retryCount: { lt: 5 },
          nextRetryAt: { lte: new Date() }
        }
      ],
    },
    take: 100
  });

    const ids = pending.map(e => e.id);

    if (ids.length === 0) return [];

    await tx.outboxEvent.updateMany({
      where: { id: { in: ids } },
      data: { 
        status: "PROCESSING",
        processedAt: new Date()
      }
    });

    return pending;
  });

  for (const event of events) {

    try {
        if (!event.billingEventId) {
            throw new Error("Outbox event missing billingEventId");
        }
        
        await sendBillingEventToQueue(event.billingEventId);

        await prisma.outboxEvent.update({
            where: { id: event.id },
            data: { status: "SENT" }
        });

    } catch (error) {

      const retryCount = event.retryCount + 1;

      if (retryCount >= 5) {

        await prisma.outboxEvent.update({
          where: { id: event.id },
          data: {
            status: "FAILED",
            retryCount
          }
        });

        console.error("Outbox event permanently failed", event.id);

      } else {
        const retryDelayMinutes = Math.pow(2, retryCount);

        await prisma.outboxEvent.update({
          where: { id: event.id },
          data: {
            status: "FAILED",
            retryCount,
            nextRetryAt: new Date(Date.now() + retryDelayMinutes * 60000)
          }
        });

        console.warn("Retry scheduled", {
          eventId: event.id,
          retryCount
        });
      }
    }
  }
}
