/*
  Warnings:

  - You are about to drop the column `amount` on the `InvoiceItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId,billingPeriodStart,billingPeriodEnd]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalAmount` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "amount",
ADD COLUMN     "billingEventId" TEXT,
ADD COLUMN     "totalAmount" DECIMAL(10,2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_customerId_billingPeriodStart_billingPeriodEnd_key" ON "Invoice"("customerId", "billingPeriodStart", "billingPeriodEnd");

-- CreateIndex
CREATE INDEX "InvoiceItem_invoiceId_idx" ON "InvoiceItem"("invoiceId");
