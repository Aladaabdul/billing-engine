import { pullBillingEvent } from "../utils/pullQueue.js"


async function startWorker() {

  console.log("Billing worker started");

  while (true) {
    await pullBillingEvent();
  }

}

startWorker();