import type { Request, Response } from "express";
import { createBillingEvent } from "../services/event.service.js";
import { createEventSchema } from "../validators/event.validator.js";


export const createEvent = async (req: Request, res: Response) => {
  try {
    
    const payload = createEventSchema.parse(req.body);

    const event = await createBillingEvent(payload);

    return res.status(201).json({
      message: "Billing event created",
      data: event
    });
    
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    });
  }
};