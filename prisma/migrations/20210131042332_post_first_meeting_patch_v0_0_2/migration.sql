/*
  Warnings:

  - You are about to drop the column `supportplanId` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `socialworkerId` on the `orphan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_socialworkerId_fkey";

-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_supportplanId_fkey";

-- AlterTable
ALTER TABLE "orphan" DROP COLUMN "supportplanId",
DROP COLUMN "socialworkerId",
ADD COLUMN     "supportPlanId" INTEGER,
ADD COLUMN     "socialWorkerId" INTEGER;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("socialWorkerId") REFERENCES "socialworker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("supportPlanId") REFERENCES "supportplan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
