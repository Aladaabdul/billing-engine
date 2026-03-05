import { z } from "zod";
import { EventType as PrismaEventType } from "@prisma/client";


export const createEventSchema = z.object({
  externalId: z.string().optional(),
  customerId: z.string(),
  eventType: z.nativeEnum(PrismaEventType),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  metadata: z.record(z.string(), z.any()).optional()
});