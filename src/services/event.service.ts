import { prisma } from "../config/prisma.js";
import { EventType as PrismaEventType, Prisma } from "@prisma/client";
import { generateUUID } from "../utils/uuid.js"



interface CreateEventInput {
  externalId?: string;
  customerId: string;
  eventType: PrismaEventType;
  quantity: number;
  unitPrice: number;
  metadata?: Prisma.InputJsonValue;
}



export const createBillingEvent = async (data: CreateEventInput) => {

  const externalId = data.externalId ?? generateUUID();

  const totalAmount = data.quantity * data.unitPrice;

  try {

    const event = await prisma.$transaction(async (tx) => {

      const createdEvent = await tx.billingEvent.create({
        data: {
          externalId,
          customerId: data.customerId,
          eventType: data.eventType,
          quantity: data.quantity,
          unitPrice: new Prisma.Decimal(data.unitPrice),
          totalAmount: new Prisma.Decimal(totalAmount),
          metadata: data.metadata,
        }
      });

      await tx.outboxEvent.create({
        data: {
          eventType: "BILLING_EVENT_CREATED",
          billingEventId: createdEvent.id,
          status: "PENDING"
        }
      })

      return createdEvent
    })
  
    return event;

  } catch (error: any) {
    if (error.code === "P2002") {
      const existingEvent = await prisma.billingEvent.findUnique({
        where: { externalId }
      });

      if (existingEvent) {
        return existingEvent
      }
    }
    throw error;
  }
};