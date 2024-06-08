/*
  Warnings:

  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "OrderId" TEXT NOT NULL,
    "ProductId" TEXT NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
