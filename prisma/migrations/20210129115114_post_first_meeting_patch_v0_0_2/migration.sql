/*
  Warnings:

  - You are about to drop the column `docsId` on the `orphan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_docsId_fkey";

-- AlterTable
ALTER TABLE "orphan" DROP COLUMN "docsId",
ADD COLUMN     "photosId" INTEGER;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("photosId") REFERENCES "orphanphotos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
