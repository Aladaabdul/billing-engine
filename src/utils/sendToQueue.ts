import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/sqs.js";
import { env } from "../config/env.js"



export const sendBillingEventToQueue = async (eventId: string) => {
  try {
    const command = new SendMessageCommand({
      QueueUrl: env.SQS_QUEUE_URL!,
      MessageBody: JSON.stringify({ eventId }),
      
      MessageAttributes: {
        eventType: {
          DataType: "String",
          StringValue: "BILLING_EVENT"
        }
      }
    });

    console.log("Publishing to queue", env.SQS_QUEUE_URL);

    const response = await sqsClient.send(command);

    console.log("Billing event published", {
      eventId,
      messageId: response.MessageId
    });

  } catch (error) {
    console.error("Failed to publish billing event", { eventId, error });
    throw error;
  }
};