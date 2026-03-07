import {
  ReceiveMessageCommand,
  DeleteMessageCommand
} from "@aws-sdk/client-sqs";

import { sqsClient } from "../config/sqs.js";
import { processBillingEvent } from "../services/invoice.service.js";

export const pullBillingEvent = async () => {
  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL!,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 10,
    });

    const response = await sqsClient.send(command);

    if (!response.Messages || response.Messages.length === 0) {
      return;
    }

    for (const message of response.Messages) {
      try {

        const { eventId } = JSON.parse(message.Body!);

        await processBillingEvent(eventId);

        await sqsClient.send(
          new DeleteMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL!,
            ReceiptHandle: message.ReceiptHandle!,
          })
        );

      } catch (error) {
        console.error("Failed to process message", error);
      }
    }

  } catch (error) {
    console.error("Failed to pull billing events", error);
  }
};