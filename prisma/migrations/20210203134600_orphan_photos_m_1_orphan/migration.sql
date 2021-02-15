/*
  Warnings:

  - You are about to drop the column `region` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `peasantAssociation` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `healthId` on the `healthrecord` table. All the data in the column will be lost.
  - You are about to drop the column `photosId` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the `health` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phoneNumber` to the `guardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthDescription` to the `orphan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "health" DROP CONSTRAINT "health_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "healthrecord" DROP CONSTRAINT "healthrecord_healthId_fkey";

-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_photosId_fkey";

-- AlterTable
ALTER TABLE "guardian" DROP COLUMN "region",
DROP COLUMN "zone",
DROP COLUMN "district",
DROP COLUMN "peasantAssociation",
DROP COLUMN "mobile",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "healthrecord" DROP COLUMN "healthId",
ADD COLUMN     "orphanId" INTEGER;

-- AlterTable
ALTER TABLE "orphan" DROP COLUMN "photosId",
ADD COLUMN     "healthDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orphanphotos" ADD COLUMN     "orphanId" INTEGER,
ALTER COLUMN "photoLongUrl" DROP NOT NULL;

-- DropTable
DROP TABLE "health";

-- AddForeignKey
ALTER TABLE "healthrecord" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphanphotos" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
