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

  let existingEvent = null

  if (data.externalId) {
    existingEvent = await prisma.billingEvent.findUnique({
    where: { externalId: data.externalId }
  });
}

  if (existingEvent) {
    throw new Error("Event already processed");
  }

  const totalAmount = data.quantity * data.unitPrice;

  const event = await prisma.billingEvent.create({
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

  return event;
};