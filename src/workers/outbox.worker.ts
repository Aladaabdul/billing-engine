import { publishOutboxEvents } from "../services/outbox.service.js";

async function startOutboxWorker() {
  while (true) {
    try {
      await publishOutboxEvents();
    } catch (err) {
      console.error(err);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}


startOutboxWorker();