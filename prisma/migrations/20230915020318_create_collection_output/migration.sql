-- CreateEnum
CREATE TYPE "Status" AS ENUM ('STOCK', 'SELL', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "numberOfOutput" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Output" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'STOCK',

    CONSTRAINT "Output_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Collection_name_idx" ON "Collection"("name");

-- AddForeignKey
ALTER TABLE "Output" ADD CONSTRAINT "Output_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
