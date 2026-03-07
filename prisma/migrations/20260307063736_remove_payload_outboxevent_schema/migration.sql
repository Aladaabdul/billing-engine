/*
  Warnings:

  - You are about to drop the column `billingEventIdId` on the `OutboxEvent` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `OutboxEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OutboxEvent" DROP COLUMN "billingEventIdId",
DROP COLUMN "payload",
ADD COLUMN     "billingEventId" TEXT;
